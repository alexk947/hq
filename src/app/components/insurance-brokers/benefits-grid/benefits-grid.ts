import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits-grid',
  imports: [CommonModule],
  templateUrl: './benefits-grid.html',
  styleUrl: './benefits-grid.scss',
})
export class BenefitsGridComponent {
  benefits = [
    {
      title: 'Identify Coverage Gaps',
      description: 'Find potential coverage gaps before they turn into significant financial losses.'
    },
    {
      title: 'Ensure Accurate Values',
      description: 'Make sure replacement values and liability limits accurately reflect your property\'s worth and risks.'
    },
    {
      title: 'Structure Landlord Insurance',
      description: 'Properly configure landlord insurance including loss of rent, liability, and vacancy coverage.'
    },
    {
      title: 'Explain Exclusions',
      description: 'Clearly explain policy exclusions related to water damage, tenants, secondary suites, or short-term rentals.'
    },
    {
      title: 'Claims Support',
      description: 'Support you during claims rather than disappearing when you need help most.'
    },
    {
      title: 'Risk Management',
      description: 'Provide proactive risk management advice tailored to your specific property and situation.'
    }
  ];
}