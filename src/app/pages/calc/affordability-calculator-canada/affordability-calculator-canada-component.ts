import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';

// ---------- Types ----------
export type ProvinceCode =
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export interface AffordabilityInputs {
  incomeAnnual: number;                // Total gross annual household income
  downPayment: number;                  // Down payment
  province: ProvinceCode;                // Province or territory

  monthlyLoansAndDebts: number;          // Loans and other debts (per month)
  totalCreditCardsAndLOC: number;        // Credit cards and lines of credit (total owing)
  monthlyCondoFees: number;              // Monthly condo fees (if applicable)

  // Fixed assumptions (not shown in form)
  contractRateAnnualPct: number;         // e.g., 4.93%
  amortizationYears: number;              // e.g., 25
}

export interface RatioCaps {
  gdsMax: number;  // 0.39
  tdsMax: number;  // 0.44
}

export interface StressTestRule {
  floorAnnualPct: number;   // 5.25
  bufferAnnualPct: number;   // 2.0
}

export interface DownPaymentRule {
  tier1Max: number;    // 500000
  tier2Max: number;    // 1500000
  tier1Rate: number;   // 0.05
  tier2Rate: number;   // 0.10
  tier3Rate: number;   // 0.20
}

export interface DefaultInsuranceConfig {
  enabled: boolean;
  insuredPriceCap: number;               // 1_500_000
  premiumRateForLtv: (ltv: number) => number;
  premiumTaxRateByProvince: Partial<Record<ProvinceCode, number>>;
}

export interface AffordabilityConfig {
  ratioCaps: RatioCaps;
  stressTest: StressTestRule;
  downPayment: DownPaymentRule;
  defaultInsurance: DefaultInsuranceConfig;
}

export type LimitingFactorKey =
  | 'MIN_DOWN_PAYMENT'
  | 'TDS'
  | 'STRESS_TDS'
  | 'GDS'
  | 'STRESS_GDS'
  | 'TOTAL_EXPENSES';

export interface LimitResult {
  factor: LimitingFactorKey;
  purchasePriceLimit: number;
  mortgagePrincipalLimit: number;
}

export interface AffordabilityResult {
  limits: LimitResult[];
  maxAffordablePurchasePrice: number;
  limitingFactor: LimitingFactorKey;
  stressTestRateAnnualPct: number;
  monthlyPayment: number;                // based on contract rate, including insurance
  totalMonthlyIncome: number;
  totalMonthlyDebt: number;               // calculated from inputs
  gdsRatio: number;
  tdsRatio: number;
  requiredDownPayment: number;
  effectiveDownPayment: number;
  insuredMortgageAmount: number;          // mortgage amount including CMHC premium
  nextLimitPrice?: number;                // for tip (next limit excluding down payment)
  recommendedDownPayment?: number;        // min down payment for nextLimitPrice
}

// ---------- Default Configuration ----------
const DEFAULT_AFFORDABILITY_CONFIG: AffordabilityConfig = {
  ratioCaps: { gdsMax: 0.39, tdsMax: 0.44 },
  stressTest: { floorAnnualPct: 5.25, bufferAnnualPct: 2.0 },
  downPayment: {
    tier1Max: 500_000,
    tier2Max: 1_500_000,
    tier1Rate: 0.05,
    tier2Rate: 0.10,
    tier3Rate: 0.20,
  },
  defaultInsurance: {
    enabled: true,
    insuredPriceCap: 1_500_000,
    premiumRateForLtv: (ltv: number) => {
      if (ltv <= 0.80) return 0.00;
      if (ltv <= 0.85) return 0.0180;
      if (ltv <= 0.90) return 0.0240;
      if (ltv <= 0.95) return 0.0310;
      return 0.0400;
    },
    premiumTaxRateByProvince: { QC: 0.09975, ON: 0.08, SK: 0.06, MB: 0.07 },
  },
};

// Fixed contract rate (chosen to match example: 4.93% with CMHC gives ~4045 payment)
const CONTRACT_RATE_PCT = 4.93;
const AMORTIZATION_YEARS = 25;

// ---------- Helper functions (unchanged) ----------
function clampMin0(x: number): number {
  return Number.isFinite(x) ? Math.max(0, x) : 0;
}

function round2(x: number): number {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

function canadianMonthlyRateFromAnnualNominalPct(annualPct: number): number {
  const r = annualPct / 100;
  if (r === 0) return 0;
  return Math.pow(1 + r / 2, 2 / 12) - 1;
}

function pvFromPayment(M: number, i: number, n: number): number {
  if (n <= 0) return 0;
  if (i === 0) return M * n;
  return M * (1 - Math.pow(1 + i, -n)) / i;
}

function minDownPaymentRequired(purchasePrice: number, cfg: AffordabilityConfig): number {
  const { tier1Max, tier2Max, tier1Rate, tier2Rate, tier3Rate } = cfg.downPayment;
  if (purchasePrice <= 0) return 0;
  if (purchasePrice <= tier1Max) return tier1Rate * purchasePrice;
  if (purchasePrice < tier2Max) return tier1Rate * tier1Max + tier2Rate * (purchasePrice - tier1Max);
  return tier3Rate * purchasePrice;
}

function maxPurchasePriceFromDownPayment(downPayment: number, cfg: AffordabilityConfig): number {
  if (!(downPayment > 0)) return 0;
  let lo = 0;
  let hi = downPayment / Math.min(cfg.downPayment.tier1Rate, cfg.downPayment.tier3Rate);
  hi = Math.max(hi, downPayment / cfg.downPayment.tier3Rate);
  hi = Math.max(hi, cfg.downPayment.tier2Max * 2);
  for (let iter = 0; iter < 80; iter++) {
    const mid = (lo + hi) / 2;
    const required = minDownPaymentRequired(mid, cfg);
    if (downPayment >= required) lo = mid;
    else hi = mid;
  }
  return lo;
}

function totalMortgageAdvanced(pp: number, dp: number, cfg: AffordabilityConfig, province: ProvinceCode): number {
  const B = Math.max(0, pp - dp);
  if (!cfg.defaultInsurance.enabled) return B;
  if (pp <= 0) return 0;
  const ltv = B / pp;
  if (ltv <= 0.80) return B;
  if (pp > cfg.defaultInsurance.insuredPriceCap) return Number.POSITIVE_INFINITY;
  const premRate = cfg.defaultInsurance.premiumRateForLtv(ltv);
  const premium = B * premRate;
  const taxRate = cfg.defaultInsurance.premiumTaxRateByProvince[province] ?? 0;
  const premiumTax = premium * taxRate;
  return B + premium + premiumTax;
}

function maxPurchasePriceFromPrincipalLimit(
  principalLimit: number,
  dp: number,
  province: ProvinceCode,
  cfg: AffordabilityConfig
): number {
  if (!(principalLimit > 0) || !(dp >= 0)) return 0;
  let lo = 0;
  let hi = Math.max(dp + principalLimit, 0) * 2;
  hi = Math.max(hi, cfg.downPayment.tier2Max * 2);
  const feasible = (pp: number) => {
    if (dp < minDownPaymentRequired(pp, cfg)) return false;
    const mort = totalMortgageAdvanced(pp, dp, cfg, province);
    return mort <= principalLimit;
  };
  for (let expand = 0; expand < 6 && feasible(hi); expand++) hi *= 2;
  for (let iter = 0; iter < 90; iter++) {
    const mid = (lo + hi) / 2;
    if (feasible(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

// ---------- Main calculation function ----------
function computeAffordability(
  inputs: AffordabilityInputs,
  cfg: AffordabilityConfig
): AffordabilityResult {
  const { incomeAnnual, downPayment, province, monthlyLoansAndDebts, totalCreditCardsAndLOC, monthlyCondoFees } = inputs;

  // Effective down payment (no RRSP in basic version)
  const effectiveDownPayment = downPayment;

  const grossMonthlyIncome = incomeAnnual / 12;

  // Monthly debt from loans and credit cards (3% of outstanding balance)
  const creditCardPaymentRate = 0.03;
  const monthlyCreditPayment = totalCreditCardsAndLOC * creditCardPaymentRate;
  const totalMonthlyDebt = monthlyLoansAndDebts + monthlyCreditPayment;

  // Housing expenses (only condo fees are provided; property tax and heating are assumed zero for basic version)
  const monthlyPropertyTax = 0;
  const monthlyHeating = 0;
  const H_ratio = monthlyPropertyTax + monthlyHeating + 0.5 * monthlyCondoFees;
  const H_cash = monthlyPropertyTax + monthlyHeating + monthlyCondoFees;

  // No other monthly expenses in basic version
  const nonHousing = 0;
  const monthlyTaxes = 0;
  const netMonthlyIncome = grossMonthlyIncome - monthlyTaxes;

  const contractRate = inputs.contractRateAnnualPct;
  const amortizationYears = inputs.amortizationYears;
  const n = Math.round(amortizationYears * 12);
  const contractMonthlyRate = canadianMonthlyRateFromAnnualNominalPct(contractRate);

  // Stress test rate
  const stressAnnual = Math.max(cfg.stressTest.floorAnnualPct, contractRate + cfg.stressTest.bufferAnnualPct);
  const stressMonthlyRate = canadianMonthlyRateFromAnnualNominalPct(stressAnnual);

  // Maximum payments allowed by ratios
  const M_gds = clampMin0(cfg.ratioCaps.gdsMax * grossMonthlyIncome - H_ratio);
  const M_tds = clampMin0(cfg.ratioCaps.tdsMax * grossMonthlyIncome - H_ratio - totalMonthlyDebt);

  // Principal limits at stress rate (for qualification)
  const P_gds_stress = pvFromPayment(M_gds, stressMonthlyRate, n);
  const P_tds_stress = pvFromPayment(M_tds, stressMonthlyRate, n);

  // Cashflow limit (using net income, but taxes are zero here)
  const baseExpenses = nonHousing + totalMonthlyDebt + H_cash;
  const M_cash = clampMin0(netMonthlyIncome - baseExpenses);
  const P_cash_stress = pvFromPayment(M_cash, stressMonthlyRate, n);

  // Down payment limit
  const PP_dp = maxPurchasePriceFromDownPayment(effectiveDownPayment, cfg);

  // Convert principal limits to purchase price limits using stress rate
  const PP_gds_stress = maxPurchasePriceFromPrincipalLimit(P_gds_stress, effectiveDownPayment, province, cfg);
  const PP_tds_stress = maxPurchasePriceFromPrincipalLimit(P_tds_stress, effectiveDownPayment, province, cfg);
  const PP_cash_stress = maxPurchasePriceFromPrincipalLimit(P_cash_stress, effectiveDownPayment, province, cfg);

  // Max affordable price is the minimum of all limits
  const limits: LimitResult[] = [
    { factor: 'MIN_DOWN_PAYMENT', purchasePriceLimit: PP_dp, mortgagePrincipalLimit: Number.NaN },
    { factor: 'GDS', purchasePriceLimit: PP_gds_stress, mortgagePrincipalLimit: P_gds_stress },
    { factor: 'TDS', purchasePriceLimit: PP_tds_stress, mortgagePrincipalLimit: P_tds_stress },
    { factor: 'TOTAL_EXPENSES', purchasePriceLimit: PP_cash_stress, mortgagePrincipalLimit: P_cash_stress },
  ];

  // Find the smallest limit
  let min = Number.POSITIVE_INFINITY;
  let minKey: LimitingFactorKey = 'MIN_DOWN_PAYMENT';
  for (const l of limits) {
    if (l.purchasePriceLimit < min) {
      min = l.purchasePriceLimit;
      minKey = l.factor;
    }
  }
  const maxPP = min;

  // Calculate insured mortgage amount for the max purchase price
  let insuredAmount = 0;
  if (maxPP > effectiveDownPayment) {
  insuredAmount = totalMortgageAdvanced(maxPP, effectiveDownPayment, cfg, province as ProvinceCode);
}

  // Monthly payment based on contract rate (for display) using insured amount
  let monthlyPayment = 0;
  if (insuredAmount > 0) {
    monthlyPayment = insuredAmount * contractMonthlyRate * Math.pow(1 + contractMonthlyRate, n) /
                     (Math.pow(1 + contractMonthlyRate, n) - 1);
  }

  // Required down payment for max price
  const requiredDownPayment = minDownPaymentRequired(maxPP, cfg);

  // Ratios for max price (using stress payment based on insured amount)
  const mortgagePaymentStress = insuredAmount > 0 ?
    insuredAmount * stressMonthlyRate * Math.pow(1 + stressMonthlyRate, n) /
    (Math.pow(1 + stressMonthlyRate, n) - 1) : 0;
  const gdsRatio = grossMonthlyIncome > 0 ? (mortgagePaymentStress + H_ratio) / grossMonthlyIncome : 0;
  const tdsRatio = grossMonthlyIncome > 0 ? (mortgagePaymentStress + H_ratio + totalMonthlyDebt) / grossMonthlyIncome : 0;

  // Determine next limit for tip (only if limiting factor is down payment)
  let nextLimitPrice: number | undefined;
  let recommendedDownPayment: number | undefined;
  if (minKey === 'MIN_DOWN_PAYMENT') {
    // Find the smallest limit among others that is greater than maxPP
    const otherLimits = limits.filter(l => l.factor !== 'MIN_DOWN_PAYMENT' && l.purchasePriceLimit > maxPP);
    if (otherLimits.length > 0) {
      nextLimitPrice = Math.min(...otherLimits.map(l => l.purchasePriceLimit));
      recommendedDownPayment = minDownPaymentRequired(nextLimitPrice, cfg);
    }
  }

  return {
    limits,
    maxAffordablePurchasePrice: round2(maxPP),
    limitingFactor: minKey,
    stressTestRateAnnualPct: round2(stressAnnual),
    monthlyPayment: round2(monthlyPayment),
    totalMonthlyIncome: round2(grossMonthlyIncome),
    totalMonthlyDebt: round2(totalMonthlyDebt),
    gdsRatio: round2(gdsRatio * 100),
    tdsRatio: round2(tdsRatio * 100),
    requiredDownPayment: round2(requiredDownPayment),
    effectiveDownPayment: round2(effectiveDownPayment),
    insuredMortgageAmount: round2(insuredAmount),
    nextLimitPrice: nextLimitPrice ? round2(nextLimitPrice) : undefined,
    recommendedDownPayment: recommendedDownPayment ? round2(recommendedDownPayment) : undefined,
  };
}

// ---------- Component ----------
@Component({
  selector: 'app-affordability-calculator-canada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './affordability-calculator-canada-component.html',
  styleUrls: ['./affordability-calculator-canada-component.scss']
})
export class AffordabilityCalculatorCanadaComponent implements OnInit, OnDestroy {
  provinces = [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'YT', label: 'Yukon' }
  ];

  affordabilityForm: FormGroup;
  private cfg = DEFAULT_AFFORDABILITY_CONFIG;
  private formSubscription?: Subscription;
  private readonly formValueSig = signal<any>(null);

  readonly result = computed(() => {
    const v = this.formValueSig();
    if (!v || this.affordabilityForm.invalid) return null;

    const inputs: AffordabilityInputs = {
      incomeAnnual: this.parseNumber(v.incomeAnnual || 0),
      downPayment: this.parseNumber(v.downPayment || 0),
      province: v.province,
      monthlyLoansAndDebts: this.parseNumber(v.monthlyLoansAndDebts || 0),
      totalCreditCardsAndLOC: this.parseNumber(v.totalCreditCardsAndLOC || 0),
      monthlyCondoFees: this.parseNumber(v.monthlyCondoFees || 0),
      contractRateAnnualPct: CONTRACT_RATE_PCT,
      amortizationYears: AMORTIZATION_YEARS,
    };
    return computeAffordability(inputs, this.cfg);
  });

  constructor(private fb: FormBuilder) {
    this.affordabilityForm = this.createForm();
  }

  ngOnInit(): void {
    this.formSubscription = this.affordabilityForm.valueChanges.subscribe(() => {
      if (this.affordabilityForm.valid) {
        this.formValueSig.set(this.affordabilityForm.getRawValue());
      }
    });
    if (this.affordabilityForm.valid) {
      this.formValueSig.set(this.affordabilityForm.getRawValue());
    }
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      // First row
      incomeAnnual: [200000, [Validators.required, Validators.min(0)]],
      downPayment: [50000, [Validators.required, Validators.min(0)]],
      province: ['ON', Validators.required],
      // Second row
      monthlyLoansAndDebts: [0, [Validators.min(0)]],
      totalCreditCardsAndLOC: [0, [Validators.min(0)]],
      monthlyCondoFees: [0, [Validators.min(0)]],
    });
  }

  onInput(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    const num = this.parseNumber(value);
    this.affordabilityForm.patchValue({ [fieldName]: num }, { emitEvent: false });
    if (num > 0 || value === '') {
      input.value = this.formatNumber(num, false);
    }
  }

  onBlur(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    const value = this.affordabilityForm.get(fieldName)?.value || 0;
    input.value = this.formatNumber(value);
  }

  formatNumber(value: number, addSymbol: boolean = true): string {
    if (value == null || isNaN(value)) return addSymbol ? '$0' : '0';
    if (value === 0) return addSymbol ? '$0' : '0';
    const formatted = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 0 }).format(value);
    return addSymbol ? `$${formatted}` : formatted;
  }

  formatCurrency(value: number): string {
    return this.formatNumber(value);
  }

  parseNumber(value: any): number {
    if (typeof value === 'string') {
      const cleaned = value.replace(/[^0-9.]/g, '');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }

  calculate(): void {
    if (this.affordabilityForm.valid) {
      this.formValueSig.set(this.affordabilityForm.getRawValue());
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.querySelector('.results-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      Object.keys(this.affordabilityForm.controls).forEach(key => this.affordabilityForm.get(key)?.markAsTouched());
    }
  }

  resetForm(): void {
    this.affordabilityForm.reset({
      incomeAnnual: 200000,
      downPayment: 50000,
      province: 'ON',
      monthlyLoansAndDebts: 0,
      totalCreditCardsAndLOC: 0,
      monthlyCondoFees: 0,
    });
    this.formValueSig.set(this.affordabilityForm.getRawValue());
  }

  factorLabel(key: LimitingFactorKey): string {
    const labels: Record<LimitingFactorKey, string> = {
      'MIN_DOWN_PAYMENT': 'Down Payment',
      'TDS': 'Total Debt Service Ratio (TDS)',
      'STRESS_TDS': 'Stress Tested TDS',
      'GDS': 'Gross Debt Service Ratio (GDS)',
      'STRESS_GDS': 'Stress Tested GDS',
      'TOTAL_EXPENSES': 'Monthly Cash Flow'
    };
    return labels[key] || key;
  }
}