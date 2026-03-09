import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, computed, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

// Types (остаются без изменений)
export type PaymentFrequency = 
  | 'MONTHLY'
  | 'BIWEEKLY'
  | 'WEEKLY'
  | 'ACCEL_BIWEEKLY'
  | 'ACCEL_WEEKLY';

export interface StressTestInputs {
  purchasePrice: number;
  downPaymentPercent: number;
  amortizationYears: number;
  contractRateAnnualPct: number;
  frequency: PaymentFrequency;
}

export interface StressTestConfig {
  stressFloorAnnualPct: number;
  stressBufferAnnualPct: number;
  useCanadianSemiAnnualCompounding: boolean;
}

export interface StressTestResult {
  principal: number;
  downPaymentAmount: number;
  stressTestRateAnnualPct: number;
  paymentContract: number;
  paymentQualifying: number;
  monthlyPaymentContract: number;
  monthlyPaymentQualifying: number;
  annualPaymentContract: number;
  annualPaymentQualifying: number;
}

// Math helpers (остаются без изменений)
function round2(x: number): number {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

function clamp(x: number, min: number, max: number): number {
  if (!Number.isFinite(x)) return min;
  return Math.min(max, Math.max(min, x));
}

function paymentsPerYear(freq: PaymentFrequency): number {
  switch (freq) {
    case 'MONTHLY': return 12;
    case 'BIWEEKLY': return 26;
    case 'WEEKLY': return 52;
    case 'ACCEL_BIWEEKLY': return 26;
    case 'ACCEL_WEEKLY': return 52;
    default: return 12;
  }
}

function periodicRate(annualPct: number, m: number, useCanadian: boolean): number {
  const r = annualPct / 100;
  if (r === 0) return 0;

  if (useCanadian) {
    return Math.pow(1 + r / 2, 2 / m) - 1;
  }

  return r / m;
}

function payment(P: number, i: number, n: number): number {
  if (n <= 0) return NaN;
  if (i === 0) return P / n;
  const pow = Math.pow(1 + i, n);
  return P * (i * pow) / (pow - 1);
}

// Default configuration
const DEFAULT_STRESS_TEST_CONFIG: StressTestConfig = {
  stressFloorAnnualPct: 5.25,
  stressBufferAnnualPct: 2.0,
  useCanadianSemiAnnualCompounding: true,
};

// Main engine function (остается без изменений)
function computeStressTest(
  inputs: StressTestInputs,
  cfg: StressTestConfig = DEFAULT_STRESS_TEST_CONFIG
): StressTestResult {
  // Sanitize inputs
  const PP = Math.max(0, inputs.purchasePrice);
  const dpPct = clamp(inputs.downPaymentPercent, 0, 100);
  const A = Math.max(1, inputs.amortizationYears);
  const r = Math.max(0, inputs.contractRateAnnualPct);

  const DP = PP * (dpPct / 100);
  const P = Math.max(0, PP - DP);

  // Stress test rate: max(5.25%, contract + 2%)
  const r_st = Math.max(cfg.stressFloorAnnualPct, r + cfg.stressBufferAnnualPct);

  const freq = inputs.frequency;
  const m = paymentsPerYear(freq);

  // Accelerated frequencies are defined off the monthly payment
  const isAccel = (freq === 'ACCEL_BIWEEKLY' || freq === 'ACCEL_WEEKLY');

  let payContract = 0;
  let payQual = 0;
  let monthlyContract = 0;
  let monthlyQual = 0;

  if (isAccel) {
    const nMonthly = Math.round(A * 12);
    const iMonthlyContract = periodicRate(r, 12, cfg.useCanadianSemiAnnualCompounding);
    const iMonthlyQual = periodicRate(r_st, 12, cfg.useCanadianSemiAnnualCompounding);

    monthlyContract = payment(P, iMonthlyContract, nMonthly);
    monthlyQual = payment(P, iMonthlyQual, nMonthly);

    const divisor = (freq === 'ACCEL_BIWEEKLY') ? 2 : 4;
    payContract = monthlyContract / divisor;
    payQual = monthlyQual / divisor;
  } else {
    const n = Math.round(A * m);
    const iContract = periodicRate(r, m, cfg.useCanadianSemiAnnualCompounding);
    const iQual = periodicRate(r_st, m, cfg.useCanadianSemiAnnualCompounding);

    payContract = payment(P, iContract, n);
    payQual = payment(P, iQual, n);
    
    // Calculate monthly equivalent for display
    const nMonthly = Math.round(A * 12);
    const iMonthlyContract = periodicRate(r, 12, cfg.useCanadianSemiAnnualCompounding);
    const iMonthlyQual = periodicRate(r_st, 12, cfg.useCanadianSemiAnnualCompounding);
    monthlyContract = payment(P, iMonthlyContract, nMonthly);
    monthlyQual = payment(P, iMonthlyQual, nMonthly);
  }

  // Calculate annual payments
  const annualContract = payContract * m;
  const annualQual = payQual * m;

  return {
    principal: round2(P),
    downPaymentAmount: round2(DP),
    stressTestRateAnnualPct: round2(r_st),
    paymentContract: Math.round(payContract), // Округляем до целого
    paymentQualifying: Math.round(payQual), // Округляем до целого
    monthlyPaymentContract: Math.round(monthlyContract), // Округляем до целого
    monthlyPaymentQualifying: Math.round(monthlyQual), // Округляем до целого
    annualPaymentContract: Math.round(annualContract), // Округляем до целого
    annualPaymentQualifying: Math.round(annualQual) // Округляем до целого
  };
}

@Component({
  selector: 'app-stress-test-calculator-canada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalPipe],
  templateUrl: './stress-test-calculator-canada-component.html',
  styleUrls: ['./stress-test-calculator-canada-component.scss']
})
export class StressTestCalculatorCanadaComponent implements OnInit {
  isMobile = false;
  
  frequencies = [
    { value: 'MONTHLY', label: 'Monthly' },
    { value: 'BIWEEKLY', label: 'Bi-weekly' },
    { value: 'WEEKLY', label: 'Weekly' },
    { value: 'ACCEL_BIWEEKLY', label: 'Accelerated bi-weekly' },
    { value: 'ACCEL_WEEKLY', label: 'Accelerated weekly' }
  ];

  amortizationOptions = [5, 10, 15, 20, 25, 30];

  stressTestForm: FormGroup;

  private cfg = DEFAULT_STRESS_TEST_CONFIG;

  private readonly formValueSig = signal<any>(null);
  readonly result = computed(() => {
    const v = this.formValueSig();
    if (!v || this.stressTestForm.invalid) {
      return null;
    }

    const inputs: StressTestInputs = {
      purchasePrice: this.parseNumber(v.purchasePrice),
      downPaymentPercent: this.parseNumber(v.downPaymentPercent),
      amortizationYears: this.parseNumber(v.amortizationYears),
      contractRateAnnualPct: this.parseNumber(v.contractRateAnnualPct),
      frequency: v.frequency
    };

    return computeStressTest(inputs, this.cfg);
  });

  // Tooltip states
  showPurchaseTooltip = false;
  showDownPaymentTooltip = false;
  showAmortizationTooltip = false;
  showRateTooltip = false;
  showFrequencyTooltip = false;

  constructor(private fb: FormBuilder) {
    this.stressTestForm = this.createForm();
    this.checkMobile();
  }

  ngOnInit(): void {
    this.stressTestForm.valueChanges.subscribe(() => {
      if (this.stressTestForm.valid) {
        this.formValueSig.set(this.stressTestForm.getRawValue());
      }
    });
    
    setTimeout(() => {
      this.formValueSig.set(this.stressTestForm.getRawValue());
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  private createForm(): FormGroup {
  return this.fb.group({
    purchasePrice: [500000, [Validators.required, Validators.min(1)]],
    downPaymentPercent: [10, [
      Validators.required, 
      Validators.min(5),  // Измените с 0 на 5
      Validators.max(100)
    ]],
    amortizationYears: [25, [Validators.required, Validators.min(1), Validators.max(30)]],
    contractRateAnnualPct: [5.0, [Validators.required, Validators.min(0.01), Validators.max(30)]],
    frequency: ['MONTHLY', Validators.required]
  });
}

validateDownPayment(): void {
  const dpControl = this.stressTestForm.get('downPaymentPercent');
  if (dpControl) {
    const value = dpControl.value;
    if (value < 5) {
      dpControl.setValue(5);
    } else if (value > 100) {
      dpControl.setValue(100);
    }
  }
}


  // Formatting functions
  formatNumber(value: number): string {
    if (value === null || value === undefined) return '0';
    return new Intl.NumberFormat('en-CA').format(value);
  }

  formatCurrency(value: number): string {
    if (value === null || value === undefined) return '$0';
    return `$${this.formatNumber(Math.round(value))}`;
  }


  formatCurrencyRounded(value: number): string {
  if (value === null || value === undefined) return '$0';
  
  const rounded = Math.round(value);
  return `$${rounded.toLocaleString('en-CA')}`;
}

 formatCurrencyDecimal(value: number): string {
  if (value === null || value === undefined) return '$0';
  
  // Округляем до целого для payment значений
  const roundedValue = Math.round(value);
  
  // Форматируем с разделителями тысяч
  return `$${roundedValue.toLocaleString('en-CA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}

  parseNumber(value: any): number {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^\d.]/g, '')) || 0;
    }
    return Number(value) || 0;
  }

  onCurrencyInput(event: Event, fieldName: string): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    value = value.replace(/[^\d]/g, '');
    const num = this.parseNumber(value);

    this.stressTestForm.patchValue({ [fieldName]: num });

    setTimeout(() => {
      inputElement.value = this.formatNumber(num);
    });
  }

  onPercentInput(event: Event, fieldName: string): void {
  const inputElement = event.target as HTMLInputElement;
  let value = inputElement.value;
  
  // Удаляем все символы кроме цифр и точки
  value = value.replace(/[^\d.]/g, '');
  
  // Проверяем, чтобы точка была только одна
  const parts = value.split('.');
  if (parts.length > 2) {
    // Если больше одной точки, оставляем только первую
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Ограничиваем количество знаков после точки
  if (parts.length === 2) {
    // Разрешаем до 2 знаков после точки
    value = parts[0] + '.' + parts[1].slice(0, 2);
  }
  
  // Проверяем, что значение начинается не с точки
  if (value.startsWith('.')) {
    value = '0' + value;
  }
  
  // Проверяем, что значение не превышает 100 для процентов
  const numericValue = this.parseNumber(value);
  let finalValue = numericValue;
  
  if (fieldName === 'downPaymentPercent') {
    finalValue = Math.max(5, Math.min(100, numericValue));
  } else if (fieldName === 'contractRateAnnualPct') {
    finalValue = Math.min(30, numericValue);
  }
  
  this.stressTestForm.patchValue({ [fieldName]: finalValue });
  
  // Обновляем значение в поле ввода
  setTimeout(() => {
    // Не форматируем до 2 знаков, пока пользователь вводит
    inputElement.value = value;
  });
}

onPercentBlur(event: Event, fieldName: string): void {
  const inputElement = event.target as HTMLInputElement;
  const control = this.stressTestForm.get(fieldName);
  
  if (control && control.value !== null) {
    // Форматируем до 2 знаков после точки
    inputElement.value = parseFloat(control.value).toFixed(2);
  }
}

  onSliderChange(event: Event, fieldName: string): void {
  const value = parseFloat((event.target as HTMLInputElement).value);
  
  if (fieldName === 'downPaymentPercent') {
    const validatedValue = Math.max(5, value);
    this.stressTestForm.patchValue({ [fieldName]: validatedValue });
  } else {
    this.stressTestForm.patchValue({ [fieldName]: value });
  }
}

  toggleTooltip(tooltipName: string): void {
    switch (tooltipName) {
      case 'purchase':
        this.showPurchaseTooltip = !this.showPurchaseTooltip;
        break;
      case 'downPayment':
        this.showDownPaymentTooltip = !this.showDownPaymentTooltip;
        break;
      case 'amortization':
        this.showAmortizationTooltip = !this.showAmortizationTooltip;
        break;
      case 'rate':
        this.showRateTooltip = !this.showRateTooltip;
        break;
      case 'frequency':
        this.showFrequencyTooltip = !this.showFrequencyTooltip;
        break;
    }
  }

  closeAllTooltips(): void {
    this.showPurchaseTooltip = false;
    this.showDownPaymentTooltip = false;
    this.showAmortizationTooltip = false;
    this.showRateTooltip = false;
    this.showFrequencyTooltip = false;
  }
}