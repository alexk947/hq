import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

export enum PaymentFrequency {
  MONTHLY = 'monthly',
  SEMI_MONTHLY = 'semi-monthly',
  BI_WEEKLY = 'bi-weekly',
  WEEKLY = 'weekly',
  ACCELERATED_BI_WEEKLY = 'accelerated-bi-weekly',
  ACCELERATED_WEEKLY = 'accelerated-weekly'
}

export enum InterestType {
  FIXED = 'fixed',
  VARIABLE = 'variable'
}

@Component({
  selector: 'app-mortgage-calculator-rbc',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mortgage-payment-calculator-canada.component.html',
  styleUrls: ['./mortgage-payment-calculator-canada.component.scss']
})
export class MortgagePaymentCalculatorCanadaComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  // Form Fields
  mortgageAmount: number = 300000;
  displayMortgageAmount: string = '300 000';

  private formatNumberWithSpaces(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  amortizationYears: number = 25;
  amortizationMonths: number = 0;
  
  paymentFrequency: PaymentFrequency = PaymentFrequency.MONTHLY;
  interestRate: number = 4.59;
  interestRateFormatted: string = '4.590';
  
  interestType: InterestType = InterestType.FIXED;
  interestTermYears: number = 5;
  interestTermMonths: number = 0;
  
  // Calculation Results
  paymentResult: number = 0;
  totalInterestPaid: number = 0;
  totalMortgageCost: number = 0;
  termBalance: number = 0;
  termInterestPaid: number = 0;
  
  // Amortization Schedule
  amortizationSchedule: any[] = [];
  termSchedule: any[] = [];
  showSchedule: boolean = false;
  
  // Pagination
  schedulePage: number = 0;
  pageSize: number = 12;

  get totalPages(): number {
    return Math.ceil(this.amortizationSchedule.length / this.pageSize);
  }

  get paginatedSchedule(): any[] {
    const start = this.schedulePage * this.pageSize;
    return this.amortizationSchedule.slice(start, start + this.pageSize);
  }

  Math = Math;
  
  // Dropdown Options
  paymentFrequencyOptions = [
    { value: PaymentFrequency.MONTHLY, label: 'Monthly' },
    { value: PaymentFrequency.SEMI_MONTHLY, label: 'Semi-Monthly' },
    { value: PaymentFrequency.BI_WEEKLY, label: 'Bi-Weekly' },
    { value: PaymentFrequency.WEEKLY, label: 'Weekly' },
    { value: PaymentFrequency.ACCELERATED_BI_WEEKLY, label: 'Accelerated Bi-Weekly' },
    { value: PaymentFrequency.ACCELERATED_WEEKLY, label: 'Accelerated Weekly' }
  ];
  
  amortizationYearOptions = Array.from({ length: 40 }, (_, i) => i + 1);
  amortizationMonthOptions = Array.from({ length: 12 }, (_, i) => i);
  interestTermYearOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  interestTermMonthOptions = Array.from({ length: 12 }, (_, i) => i);

  interestTypeOptions = [
    { value: InterestType.FIXED, label: 'Fixed' },
    { value: InterestType.VARIABLE, label: 'Variable' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.calculate();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Formatting input values
  formatInterestRateInput(value: string): void {
    let clean = value.replace(/,/g, '.');
    clean = clean.replace(/[^\d.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) {
      clean = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1]?.length > 3) {
      clean = parts[0] + '.' + parts[1].slice(0, 3);
    }
    if (clean.indexOf('.') === -1 && clean.length > 1 && clean[0] === '0') {
      clean = clean.slice(1);
    }
    this.interestRateFormatted = clean;
    this.interestRate = clean === '' || clean === '.' ? 0 : parseFloat(clean);
    this.calculate();
  }

  onMortgageAmountInput(event: string): void {
    const raw = event.replace(/\D/g, '');
    this.mortgageAmount = raw === '' ? 0 : parseInt(raw, 10);
    this.displayMortgageAmount = raw;
    this.calculate();
  }

  onMortgageAmountBlur(): void {
    this.displayMortgageAmount = this.formatNumberWithSpaces(this.mortgageAmount);
  }

  onInterestRateBlur(): void {
    if (this.interestRate != null) {
      this.interestRateFormatted = this.interestRate.toFixed(3);
    } else {
      this.interestRateFormatted = '';
    }
  }

  // Core Calculation Methods
  public calculate(): void {
    const principal = this.mortgageAmount;
    const totalAmortizationMonths = (this.amortizationYears * 12) + this.amortizationMonths;
    const totalTermMonths = (this.interestTermYears * 12) + this.interestTermMonths;
    
    if (principal <= 0 || this.interestRate < 0 || totalAmortizationMonths <= 0) {
      this.resetResults();
      return;
    }

    const freqDetails = this.getPaymentFrequencyDetails(this.paymentFrequency);
    
    const periodicRate = this.calculatePeriodicInterestRate(
      this.interestRate / 100,
      freqDetails.paymentsPerYear,
      this.interestType
    );

    if (freqDetails.isAccelerated) {
      this.paymentResult = this.calculateAcceleratedPayment(
        principal,
        this.interestRate / 100,
        totalAmortizationMonths / 12,
        freqDetails
      );
    } else {
      this.paymentResult = this.calculateStandardPayment(
        principal,
        periodicRate,
        totalAmortizationMonths * freqDetails.paymentsPerYear / 12
      );
    }

    this.generateAmortizationSchedule(
      principal,
      periodicRate,
      this.paymentResult,
      totalAmortizationMonths * freqDetails.paymentsPerYear / 12,
      freqDetails.paymentsPerYear
    );

    this.calculateSummary(totalTermMonths * freqDetails.paymentsPerYear / 12);
    
    this.schedulePage = 0;
  }

  private calculatePeriodicInterestRate(
    annualRate: number,
    paymentsPerYear: number,
    interestType: InterestType
  ): number {
    if (interestType === InterestType.FIXED) {
      const semiAnnualRate = annualRate / 2;
      const effectiveAnnualRate = Math.pow(1 + semiAnnualRate, 2) - 1;
      return Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;
    } else {
      const monthlyRate = annualRate / 12;
      const effectiveAnnualRate = Math.pow(1 + monthlyRate, 12) - 1;
      return Math.pow(1 + effectiveAnnualRate, 1 / paymentsPerYear) - 1;
    }
  }

  private calculateStandardPayment(
    principal: number,
    periodicRate: number,
    totalPayments: number
  ): number {
    if (periodicRate === 0) {
      return principal / totalPayments;
    }
    return principal * 
           (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
           (Math.pow(1 + periodicRate, totalPayments) - 1);
  }

  private calculateAcceleratedPayment(
    principal: number,
    annualRate: number,
    amortizationYears: number,
    freqDetails: any
  ): number {
    const monthlyPeriodicRate = this.calculatePeriodicInterestRate(
      annualRate,
      12,
      this.interestType
    );
    
    const totalMonthlyPayments = amortizationYears * 12;
    const monthlyPayment = this.calculateStandardPayment(
      principal,
      monthlyPeriodicRate,
      totalMonthlyPayments
    );

    if (freqDetails.type === PaymentFrequency.ACCELERATED_BI_WEEKLY) {
      return monthlyPayment / 2;
    } else {
      return monthlyPayment / 4;
    }
  }

  private generateAmortizationSchedule(
    principal: number,
    periodicRate: number,
    payment: number,
    totalPayments: number,
    paymentsPerYear: number
  ): void {
    this.amortizationSchedule = [];
    let balance = principal;
    let runningInterest = 0;

    for (let i = 1; i <= totalPayments; i++) {
      const interest = balance * periodicRate;
      let principalPaid = payment - interest;
      
      if (principalPaid > balance) {
        principalPaid = balance;
        payment = principalPaid + interest;
      }

      balance -= principalPaid;
      runningInterest += interest;

      if (balance < 0.01) balance = 0;

      this.amortizationSchedule.push({
        paymentNumber: i,
        payment: payment,
        principal: principalPaid,
        interest: interest,
        balance: balance,
        cumulativeInterest: runningInterest
      });

      if (balance <= 0) break;
    }

    this.termSchedule = this.amortizationSchedule.slice(
      0,
      this.calculateTermPayments(paymentsPerYear)
    );
  }

  private calculateTermPayments(paymentsPerYear: number): number {
    const totalTermMonths = (this.interestTermYears * 12) + this.interestTermMonths;
    return Math.ceil(totalTermMonths * paymentsPerYear / 12);
  }

  private calculateSummary(termPayments: number): void {
    if (this.amortizationSchedule.length === 0) {
      this.resetResults();
      return;
    }

    this.totalInterestPaid = this.amortizationSchedule.reduce(
      (sum, payment) => sum + payment.interest, 0
    );
    this.totalMortgageCost = this.mortgageAmount + this.totalInterestPaid;

    const termIndex = Math.min(termPayments, this.amortizationSchedule.length);
    if (termIndex > 0) {
      this.termBalance = this.amortizationSchedule[termIndex - 1].balance;
      this.termInterestPaid = this.amortizationSchedule
        .slice(0, termIndex)
        .reduce((sum, payment) => sum + payment.interest, 0);
    }
  }

  private resetResults(): void {
    this.paymentResult = 0;
    this.totalInterestPaid = 0;
    this.totalMortgageCost = 0;
    this.termBalance = 0;
    this.termInterestPaid = 0;
    this.amortizationSchedule = [];
    this.termSchedule = [];
    this.schedulePage = 0;
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

  // Helper Methods
  private getPaymentFrequencyDetails(frequency: PaymentFrequency): any {
    switch (frequency) {
      case PaymentFrequency.MONTHLY:
        return { paymentsPerYear: 12, isAccelerated: false };
      case PaymentFrequency.SEMI_MONTHLY:
        return { paymentsPerYear: 24, isAccelerated: false };
      case PaymentFrequency.BI_WEEKLY:
        return { paymentsPerYear: 26, isAccelerated: false };
      case PaymentFrequency.WEEKLY:
        return { paymentsPerYear: 52, isAccelerated: false };
      case PaymentFrequency.ACCELERATED_BI_WEEKLY:
        return { paymentsPerYear: 26, isAccelerated: true, type: PaymentFrequency.ACCELERATED_BI_WEEKLY };
      case PaymentFrequency.ACCELERATED_WEEKLY:
        return { paymentsPerYear: 52, isAccelerated: true, type: PaymentFrequency.ACCELERATED_WEEKLY };
      default:
        return { paymentsPerYear: 12, isAccelerated: false };
    }
  }

  // Formatting Methods
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  formatNumber(value: number): string {
    return new Intl.NumberFormat('en-CA').format(value);
  }

  formatPercent(value: number): string {
    return value.toFixed(3) + '%';
  }

  // UI Methods
  toggleSchedule(): void {
    this.showSchedule = !this.showSchedule;
    if (this.showSchedule) {
      this.schedulePage = 0;
    }
  }

  // Validation Methods
  validateInputs(): boolean {
    const totalAmortizationMonths = (this.amortizationYears * 12) + this.amortizationMonths;
    return this.mortgageAmount > 0 && 
           this.interestRate >= 0 && 
           totalAmortizationMonths > 0;
  }

  // Get display payment frequency
  getPaymentFrequencyLabel(): string {
    const freq = this.paymentFrequencyOptions.find(f => f.value === this.paymentFrequency);
    return freq ? freq.label : 'Monthly';
  }

  // Get term end date
  getTermEndDate(): string {
    const today = new Date();
    const endDate = new Date(
      today.getFullYear() + this.interestTermYears,
      today.getMonth() + this.interestTermMonths,
      today.getDate()
    );
    return endDate.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get payment per period
  getPaymentPerPeriod(): string {
    return this.formatCurrency(this.paymentResult);
  }
}