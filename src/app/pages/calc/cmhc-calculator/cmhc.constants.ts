// src/app/cmhc-calculator/cmhc.constants.ts
import { CmhcCalculationResult, CmhcInput } from './cmhc.models';

// 4) Premium rate table structure (From the page's table)
export interface PremiumRateBand {
  ltvMax: number; // Loan-to-Value (as decimal, e.g., 0.95 for 95%)
  rate: number;   // Premium rate (as decimal, e.g., 0.04 for 4.00%)
}

// TO CONFIRM: The exact values are from Ratehub's table. Ensure they match the latest official CMHC table.
export const PREMIUM_RATE_BANDS: PremiumRateBand[] = [
  { ltvMax: 0.65, rate: 0.0060 },
  { ltvMax: 0.75, rate: 0.0170 },
  { ltvMax: 0.80, rate: 0.0240 },
  { ltvMax: 0.85, rate: 0.0280 },
  { ltvMax: 0.90, rate: 0.0310 },
  { ltvMax: 0.95, rate: 0.0400 }
];

// 5) Step-by-step formulas / Helper Functions
export class CmhcCalculatorLogic {

  // Step 1: Validate and calculate minimum down payment (from the guide's tier rules)
  static calculateMinimumDownPayment(askingPrice: number): number {
    if (askingPrice <= 500_000) {
      return askingPrice * 0.05;
    } else if (askingPrice < 1_500_000) {
      return (500_000 * 0.05) + ((askingPrice - 500_000) * 0.10);
    } else {
      // Homes priced at or over $1.5M cannot be insured.
      return askingPrice * 0.20;
    }
  }

  // Step 2/3/4: Select the correct premium rate based on LTV
  static getPremiumRateForLtv(ltv: number): number {
    const band = PREMIUM_RATE_BANDS.find(b => ltv <= b.ltvMax);
    // If LTV is above 95% (invalid for insurance) or band not found, return 0.
    return band ? band.rate : 0;
  }

  // Main calculation pipeline (Steps 5-9 from the logic spec)
  static calculate(input: CmhcInput): CmhcCalculationResult {
    const warnings: string[] = [];

    // --- Row 1 & 2: Asking Price & Down Payment ---
    const minDownPayment = this.calculateMinimumDownPayment(input.askingPrice);
    const downPaymentAmount = (input.askingPrice * input.downPaymentPercent) / 100;

    // Eligibility check (from the guide)
    let eligibility: CmhcCalculationResult['eligibility'] = 'insured';
    if (input.askingPrice >= 1_500_000) {
      eligibility = 'not_eligible';
      warnings.push('Homes priced at $1.5M or more cannot be insured.');
    } else if (input.downPaymentPercent >= 20) {
      eligibility = 'conventional';
      warnings.push('With 20%+ down, this is a conventional mortgage. Borrower typically does not pay the premium.');
    } else if (downPaymentAmount < minDownPayment) {
      warnings.push(`Down payment is below the minimum required for this price tier. Minimum required: $${minDownPayment.toLocaleString('en-CA')}`);
    }

    // --- Row 3: CMHC Insurance ---
    const mortgageBeforeInsurance = input.askingPrice - downPaymentAmount;
    const ltv = mortgageBeforeInsurance / input.askingPrice;
    // Apply premium only if mortgage is eligible for insurance (high-ratio)
    const baseInsuranceRate = (eligibility === 'insured') ? this.getPremiumRateForLtv(ltv) : 0;
    const insurancePremium = mortgageBeforeInsurance * baseInsuranceRate;

    // TO CONFIRM: Provincial tax logic and rates. Page lists MB, QC, ON, SK.
    const provincialTax = 0; // Placeholder: Would require province input and tax rate map.
    const totalInsuranceCost = insurancePremium + provincialTax;

    // --- Row 4: Total Mortgage ---
    const totalMortgageAmount = mortgageBeforeInsurance + insurancePremium;

    return {
      askingPrice: input.askingPrice,
      downPaymentPercent: input.downPaymentPercent,
      downPaymentAmount,
      minimumDownPayment: minDownPayment,
      loanToValueRatio: ltv,
      insuranceRate: baseInsuranceRate * 100, // Convert to percentage for display
      insurancePremium,
      provincialTax,
      totalInsuranceCost,
      mortgageBeforeInsurance,
      totalMortgageAmount,
      eligibility,
      warnings
    };
  }
}