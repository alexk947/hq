import { Component, computed, signal } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CmhcCalculatorLogic } from './cmhc.constants';
import { CmhcCalculationResult, CmhcInput } from './cmhc.models';

@Component({
  selector: 'app-cmhc-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, CurrencyPipe],
  templateUrl: './cmhc-calculator.component.html',
  styleUrl: './cmhc-calculator.component.scss'
})
export class CmhcCalculatorComponent {
  // User input signals
  askingPrice = signal<number>(400000);
  downPaymentPercent = signal<number>(5);
  downPaymentAmount = signal<number>(20000);

  // Fixed percentages for comparison
  comparisonPercentages = [5, 18, 19, 20];

  // Results for comparison table
  comparisonResults = computed(() => {
    const price = this.askingPrice();
    
    return this.comparisonPercentages.map(percent => {
      const downPaymentAmount = (price * percent) / 100;
      
      const input: CmhcInput = {
        askingPrice: price,
        downPaymentPercent: percent,
        downPaymentAmount: downPaymentAmount
      };
      
      return CmhcCalculatorLogic.calculate(input);
    });
  });

  // Result for user's specific input
  userResult = computed(() => {
    const input: CmhcInput = {
      askingPrice: this.askingPrice(),
      downPaymentPercent: this.downPaymentPercent(),
      downPaymentAmount: this.downPaymentAmount()
    };
    
    return CmhcCalculatorLogic.calculate(input);
  });

  // Event handlers
  onAskingPriceChange(value: string): void {
    const numValue = this.parseNumber(value);
    if (numValue >= 0) {
      this.askingPrice.set(numValue);
      this.updateDownPaymentFromPercent();
    }
  }

  onDownPaymentPercentChange(value: string): void {
    const numValue = this.parseNumber(value);
    if (numValue >= 0 && numValue <= 100) {
      this.downPaymentPercent.set(numValue);
      this.updateDownPaymentFromPercent();
    }
  }

  onDownPaymentAmountChange(value: string): void {
    const numValue = this.parseNumber(value);
    if (numValue >= 0 && this.askingPrice() > 0) {
      this.downPaymentAmount.set(numValue);
      const percent = (numValue / this.askingPrice()) * 100;
      this.downPaymentPercent.set(percent);
    }
  }

  private updateDownPaymentFromPercent(): void {
    const amount = (this.askingPrice() * this.downPaymentPercent()) / 100;
    this.downPaymentAmount.set(amount);
  }

  private parseNumber(value: string): number {
    const numericString = value.replace(/[^\d.]/g, '');
    const parsed = parseFloat(numericString);
    return isNaN(parsed) ? 0 : parsed;
  }
}