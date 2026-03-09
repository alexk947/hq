import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from "../share/tools-section/tools-section.component";

interface PestControlCompany {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  location: string;
  recommendation: string;
  pests: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-pest-control',
  imports: [CommonModule,
    RouterModule, ToolsSectionComponent],
  templateUrl: './pest-control.html',
  styleUrl: './pest-control.scss',
})
export class PestControl {
  companies: PestControlCompany[] = [
    {
      id: 1,
      name: 'Major Pest Control Calgary Inc.',
      title: '24/7 Exterminators',
      website: 'https://majorpestcontrolcalgary.ca',
      phone: '403-899-9013',
      location: 'Calgary AB',
      recommendation: 'Major Pest Control Calgary is a top-rated exterminator offering 24/7 service for both residential and commercial clients. They handle bed bugs, cockroaches, mice, ants, wasps, voles, birds, and other common Calgary pests, with a strong emphasis on guaranteed results—if the problem isn\'t resolved, they come back and make it right.',
      pests: ['Bed Bugs', 'Cockroaches', 'Mice & Rodents', 'Ants & Wasps', 'Voles & Birds'],
      bestFor: [
        'Homeowners needing fast, guaranteed pest removal',
        'Landlords with recurring issues in rental units or multi-family buildings',
        'Investors wanting 24/7 support and strong follow-up on difficult infestations'
      ]
    },
    {
      id: 2,
      name: 'Pest Detective Calgary',
      title: 'Prevention-Focused Pest Control',
      website: 'https://pestdetective.com',
      phone: '403-546-5082',
      location: 'Calgary AB',
      recommendation: 'Pest Detective Calgary combines extensive experience with a local focus on residential and commercial pest control. They offer structured programs for rodents, ants, wasps, bed bugs, wildlife, and other pests, with a strong emphasis on inspection, exclusion (sealing entry points), and long-term prevention—not just one-time treatments.',
      pests: ['Rodents', 'Ants', 'Wasps', 'Bed Bugs', 'Wildlife'],
      bestFor: [
        'Homeowners wanting thorough inspections and prevention plans',
        'Long-term rodent and general pest programs for rentals',
        'Owners who value eco-friendly methods and detailed documentation'
      ]
    },
    {
      id: 3,
      name: 'Absolute Pest Control Services Inc.',
      title: 'Local & Experienced Exterminators',
      website: 'https://absolutepestcontrolyyc.ca',
      phone: '403-238-7400',
      location: 'Calgary AB',
      recommendation: 'Absolute Pest Control Services Inc. is a Calgary company founded in 2001, bringing over two decades of local experience. They provide residential and commercial pest control, specializing in insects, rodents, and bird issues, with a strong focus on customer service and long-term protection.',
      pests: ['Insects', 'Rodents', 'Birds', 'General Pests'],
      bestFor: [
        'Homeowners who prefer a local, owner-operated company',
        'Investors needing practical, cost-effective treatment for common pests',
        'Clients who value clear, straightforward advice and reliable follow-up'
      ]
    }
  ];

  benefits = [
    'Identify True Sources',
    'Safe Treatments',
    'Prevention Focus',
    'Proper Documentation',
    'Protect Property Value',
    'Maintain Cashflow'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Identify True Sources': 'Find entry points, harbourage areas, and conditions that cause infestations.',
      'Safe Treatments': 'Use methods suited to families, pets, and tenants\' health.',
      'Prevention Focus': 'Set up monitoring and prevention instead of only reactive visits.',
      'Proper Documentation': 'Document findings to support insurance, inspections, and maintenance.',
      'Protect Property Value': 'Prevent structural damage from pests like rodents and termites.',
      'Maintain Cashflow': 'Keep rental units occupied and avoid tenant complaints or move-outs.'
    };
    return descriptions[benefit] || '';
  }

  // Специальный набор инструментов для Pest Control
  pestControlTools = [
    {
      name: 'Investment Property Calculator',
      description: 'Cashflow, ROI, and long-term equity growth—after factoring in realistic pest-control costs.',
      isSpecial: false,
      actionText: 'Calculate Now'
    },
    {
      name: 'Pest Control Cost Analyzer',
      description: 'Compare different pest control approaches and their impact on property returns',
      isSpecial: true,
      actionText: 'Analyze Now'
    },
    {
      name: 'Mortgage Penalty Estimator',
      description: 'Avoid surprise penalties if you need to refinance after major repairs or remediation.',
      isSpecial: false,
      actionText: 'Estimate Now'
    },
    {
      name: 'Renovation ROI Estimator',
      description: 'See whether post-infestation renovations actually add value.',
      isSpecial: false,
      actionText: 'Calculate ROI'
    },
    {
      name: 'Purchase-vs-Rent Analyzer',
      description: 'Compare the long-term cost of owning vs renting with pest issues.',
      isSpecial: false,
      actionText: 'Compare Now'
    }
  ];
}
