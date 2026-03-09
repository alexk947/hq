import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-mortgage-amortization-calculator-canada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './mortgage-amortization-calculator-canada.component.html',
  styleUrls: ['./mortgage-amortization-calculator-canada.component.scss']
})
export class MortgageAmortizationCalculatorCanadaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  amortizationForm: FormGroup;
  showResults = false;

  // Current date for footer
  currentDate = new Date();

  // Payment frequency
  paymentFrequency: 'monthly' | 'bi-weekly' | 'accelerated-bi-weekly' = 'monthly';
  paymentFrequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'bi-weekly', label: 'Bi-Weekly' },
    { value: 'accelerated-bi-weekly', label: 'Accelerated Bi-Weekly' }
  ];

  // Amortization period dropdown options
  amortizationYearOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  amortizationMonthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Results
  paymentResults = {
    regularPayment: 0,
    totalPrincipal: 0,
    totalInterest: 0,
    totalCost: 0
  };

  // Amortization schedule
  amortizationSchedule: any[] = [];
  termSchedule: any[] = [];
  showSchedule = false;

  // Pagination
  schedulePage = 0;
  pageSize = 12;

  get totalPages(): number {
    return Math.ceil(this.amortizationSchedule.length / this.pageSize);
  }

  get paginatedSchedule(): any[] {
    const start = this.schedulePage * this.pageSize;
    return this.amortizationSchedule.slice(start, start + this.pageSize);
  }

  displayMortgageAmount: string | undefined;
  displayInterestRate: string | undefined;

  constructor(private fb: FormBuilder) {
    this.amortizationForm = this.createAmortizationForm();
    this.displayMortgageAmount = this.formatNumber(this.mortgageAmount);
    this.displayInterestRate = this.interestRate.toFixed(3);
  }

  ngOnInit(): void {
    this.setupFormListeners();
    this.calculateAmortization();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createAmortizationForm(): FormGroup {
    return this.fb.group({
      mortgageAmount: [500000, [Validators.required, Validators.min(1), Validators.max(10000000)]],
      interestRate: [4.59, [Validators.required, Validators.min(0.01), Validators.max(100)]]
    });
  }

private setupFormListeners(): void {
  this.amortizationForm.valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      if (this.amortizationForm.valid) {
        this.calculateAmortization();
      }
    });
}

  // --- Mortgage Amount ---
  onMortgageAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/[^\d]/g, '');
    const num = Math.min(parseInt(raw, 10) || 0, 10000000);

    this.amortizationForm.patchValue({ mortgageAmount: num }, { emitEvent: true });
    this.displayMortgageAmount = raw;
  }

  onMortgageAmountBlur(): void {
    this.displayMortgageAmount = this.formatNumber(this.mortgageAmount);
  }

  // --- Interest Rate ---
  onInterestRateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/[^\d.]/g, '');
    const parts = raw.split('.');
    if (parts.length > 2) {
      raw = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2) {
      raw = parts[0] + '.' + parts[1].slice(0, 3);
    }

    const num = Math.min(parseFloat(raw) || 0, 100);
    this.amortizationForm.patchValue({ interestRate: num }, { emitEvent: true });
    this.displayInterestRate = raw;
  }

  onInterestRateBlur(): void {
    this.displayInterestRate = this.interestRate.toFixed(3);
  }

  // Formatting methods
  formatCurrency(value: number): string {
    if (value === null || value === undefined) return '$0.00';
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  formatNumber(value: number): string {
    if (value === null || value === undefined) return '0';
    return new Intl.NumberFormat('en-CA').format(Math.round(value));
  }

  // Getters
  get mortgageAmount(): number {
    return this.amortizationForm.get('mortgageAmount')?.value || 0;
  }

  get interestRate(): number {
    return this.amortizationForm.get('interestRate')?.value || 4.59;
  }

  // Properties for ngModel binding
  amortizationYears: number = 25;
  amortizationMonths: number = 0;

  // Toggle schedule display
  toggleSchedule(): void {
    this.showSchedule = !this.showSchedule;
    if (!this.showSchedule) {
      this.schedulePage = 0; // сброс страницы при закрытии
    }
  }

  // Validate inputs
  validateInputs(): boolean {
    return this.mortgageAmount > 0 &&
           this.interestRate >= 0 &&
           (this.amortizationYears > 0 || this.amortizationMonths > 0);
  }

  // Get payment per period
  getPaymentPerPeriod(): string {
    return this.formatCurrency(this.paymentResults.regularPayment);
  }

  getPaymentFrequencyLabel(): string {
    switch (this.paymentFrequency) {
      case 'monthly': return 'month';
      case 'bi-weekly': return 'bi-weekly period';
      case 'accelerated-bi-weekly': return 'accelerated bi-weekly period';
      default: return 'period';
    }
  }

  // Core calculation methods
  calculateAmortization(): void {
    if (this.amortizationForm.invalid) return;

    const formValue = this.amortizationForm.value;
    const principal = formValue.mortgageAmount;
    const annualRate = formValue.interestRate;
    const years = this.amortizationYears;
    const months = this.amortizationMonths;
    const totalMonths = (years * 12) + months;

    if (principal <= 0 || annualRate < 0 || totalMonths <= 0) {
      return;
    }

    // Calculate payment
    const payment = this.calculatePayment(principal, annualRate, years + (months / 12), this.paymentFrequency);

    // Generate amortization schedule
    this.generateAmortizationSchedule(principal, annualRate, years + (months / 12), this.paymentFrequency);

    // Calculate totals
    const totalInterest = this.amortizationSchedule.reduce((sum, p) => sum + p.interest, 0);
    const totalCost = principal + totalInterest;

    // Update results
    this.paymentResults = {
      regularPayment: Math.round(payment * 100) / 100,
      totalPrincipal: Math.round(principal),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost)
    };

    // Set term schedule (first 5 years for backward compatibility)
    this.termSchedule = this.amortizationSchedule.slice(0, 60);
    this.schedulePage = 0; // сброс на первую страницу при пересчёте
    this.showResults = true;
  }

  private getPaymentsPerYear(frequency: string): number {
    switch (frequency) {
      case 'monthly': return 12;
      case 'bi-weekly':
      case 'accelerated-bi-weekly': return 26;
      default: return 12;
    }
  }

  private calculatePayment(
    principal: number,
    annualRate: number,
    years: number,
    frequency: string
  ): number {
    const rate = annualRate / 100;
    const paymentsPerYear = this.getPaymentsPerYear(frequency);
    const totalPayments = years * paymentsPerYear;

    // Canadian mortgage calculation (semi-annual compounding)
    const effectiveAnnualRate = Math.pow(1 + rate / 2, 2) - 1;
    const periodicRate = Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;

    // Handle accelerated bi-weekly payments (half of monthly payment)
    if (frequency === 'accelerated-bi-weekly') {
      const monthlyPeriodicRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1;
      const monthlyPayment = principal * monthlyPeriodicRate * Math.pow(1 + monthlyPeriodicRate, years * 12) /
                            (Math.pow(1 + monthlyPeriodicRate, years * 12) - 1);
      return monthlyPayment / 2;
    }

    if (periodicRate === 0) {
      return principal / totalPayments;
    }

    const payment = principal * periodicRate * Math.pow(1 + periodicRate, totalPayments) /
                    (Math.pow(1 + periodicRate, totalPayments) - 1);

    return payment;
  }

  private generateAmortizationSchedule(
    principal: number,
    annualRate: number,
    years: number,
    frequency: string
  ): void {
    this.amortizationSchedule = [];
    let balance = principal;
    const paymentsPerYear = this.getPaymentsPerYear(frequency);
    const totalPayments = years * paymentsPerYear;

    const rate = annualRate / 100;
    const effectiveAnnualRate = Math.pow(1 + rate / 2, 2) - 1;
    const periodicRate = Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;

    const paymentAmount = this.calculatePayment(principal, annualRate, years, frequency);

    for (let i = 1; i <= totalPayments; i++) {
      const interest = balance * periodicRate;
      let principalPaid = paymentAmount - interest;

      if (principalPaid > balance) {
        principalPaid = balance;
      }

      balance -= principalPaid;

      if (balance < 0.01) balance = 0;

      this.amortizationSchedule.push({
        period: i,
        payment: paymentAmount,
        principal: principalPaid,
        interest: interest,
        balance: Math.round(balance * 100) / 100
      });

      if (balance <= 0) break;
    }
  }

  // Calculate payment breakdown percentages
  getPrincipalPercentage(): number {
    if (this.paymentResults.totalCost === 0) return 0;
    return (this.paymentResults.totalPrincipal / this.paymentResults.totalCost) * 100;
  }

  getInterestPercentage(): number {
    if (this.paymentResults.totalCost === 0) return 0;
    return (this.paymentResults.totalInterest / this.paymentResults.totalCost) * 100;
  }

  // For ngModel changes
  onAmortizationYearsChange(): void {
    this.calculateAmortization();
  }

  onAmortizationMonthsChange(): void {
    this.calculateAmortization();
  }

  onPaymentFrequencyChange(): void {
    this.calculateAmortization();
  }

  // Pagination methods
  nextPage(): void {
    if (this.schedulePage < this.totalPages - 1) {
      this.schedulePage++;
    }
  }

  prevPage(): void {
    if (this.schedulePage > 0) {
      this.schedulePage--;
    }
  }
}