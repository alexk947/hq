// src/app/cmhc-calculator/cmhc.models.ts

// 1) Inputs (define each input, units, valid ranges, default values)
export interface CmhcInput {
  askingPrice: number;        // CAD, PP in formulas
  downPaymentPercent: number; // User input as a percentage (e.g., 5 for 5%)
  downPaymentAmount: number;  // CAD, calculated from percent
}

// 2) & 3) Derived values & Eligibility rules
export interface CmhcCalculationResult {
  // Row 1: Asking Price
  askingPrice: number; // Simply passed through

  // Row 2: Down Payment
  downPaymentPercent: number; // As entered
  downPaymentAmount: number;  // Calculated: (askingPrice * downPaymentPercent/100)
  minimumDownPayment: number; // Based on price tier rules from the guide

  // Row 3: CMHC Insurance
  loanToValueRatio: number;   // LTV = (Mortgage Before CMHC) / Asking Price
  insuranceRate: number;      // Premium rate % from the table (e.g., 4.00)
  insurancePremium: number;   // (Mortgage Before CMHC) * (insuranceRate/100)
  provincialTax: number;      // PST on premium for MB, QC, ON, SK (TO CONFIRM exact rates)
  totalInsuranceCost: number; // premium + tax

  // Row 4: Total Mortgage
  mortgageBeforeInsurance: number; // Asking Price - Down Payment Amount
  totalMortgageAmount: number;     // Mortgage Before Insurance + Insurance Premium

  // Eligibility & Messages
  eligibility: 'insured' | 'conventional' | 'not_eligible';
  warnings: string[];
}