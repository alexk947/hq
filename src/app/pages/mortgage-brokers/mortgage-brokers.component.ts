import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface MortgageBroker {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  location: string;
  recommendation: string;
  strengths: string[];
  bestFor: string[];
}
interface SelectionCriterion {
  title: string;
  description: string;
}


@Component({
  selector: 'app-mortgage-brokers.component',
  imports: [CommonModule, RouterModule, ToolsSectionComponent],
  templateUrl: './mortgage-brokers.component.html',
  styleUrl: './mortgage-brokers.component.scss',
})
export class MortgageBrokersComponent {
 brokers: MortgageBroker[] = [
    {
      id: 1,
      name: 'Mark Herman',
      title: 'Mortgages Are Marvellous',
      website: 'https://markherman.ca',
      phone: '403-681-4376',
      location: '103E-1144 29 Ave NE, Calgary',
      recommendation: 'Mark is one of Calgary\'s most trusted boutique mortgage brokers with a strong reputation among homeowners and investors. His service is personal and consistent—you speak directly with Mark or a small expert team that knows your file intimately. He is known for clear explanations, strategic mortgage structuring, and solutions for complex borrower profiles including self-employed clients, first-time buyers, and long-term investors.',
      strengths: ['Direct client communication', 'Strategic mortgage structuring', 'Complex profile expertise'],
      bestFor: [
        'First-time buyers wanting patient guidance',
        'Investors purchasing or refinancing rental properties',
        'Clients who want direct communication and meaningful advice'
      ]
    },
    {
      id: 2,
      name: 'Croft Axsen',
      title: 'Senior Mortgage Expert (Mortgage Connection)',
      website: 'https://mortgageconnection.ca/staff/croft-axsen',
      phone: '403-830-6972',
      location: 'Calgary-based (serves all Alberta clients)',
      recommendation: 'Croft is a highly respected individual specialist with over 30 years of experience in Calgary. Clients highlight his deep knowledge of lending rules, ability to handle complex files, and straightforward explanations of rates, penalties, and lender differences. He is particularly strong with multi-property investors, renovation financing, and clients who want someone who can strategically plan 5–10 years ahead, not just secure a rate.',
      strengths: ['30+ years experience', 'Multi-property investment expertise', 'Long-term strategic planning'],
      bestFor: [
        'Multi-property investors',
        'Complex mortgage structures',
        'Clients who value expertise and long-term strategic planning'
      ]
    },
    {
      id: 3,
      name: 'Shawn-Marc Melo',
      title: 'Mortgage Broker (LendWire)',
      website: 'https://lendwire.com',
      phone: '1-866-297-4364',
      location: 'Calgary & Canada-wide',
      recommendation: 'Shawn-Marc Melo is a standout independent mortgage professional recognized for delivering some of the most competitive mortgage rates in Canada in 2024, working with numerous lenders across the country. His approach is highly personalized—clients praise his responsiveness, transparency, and ability to compare multiple lenders quickly. Investors appreciate his market knowledge and ability to secure deals other brokers may miss.',
      strengths: ['Competitive rate specialist', 'Multi-lender comparison', 'Fast, attentive communication'],
      bestFor: [
        'Clients seeking the most competitive rates available',
        'Investors needing flexible multi-lender options',
        'Borrowers wanting fast, attentive communication'
      ]
    }
  ];

  selectionCriteria: SelectionCriterion[] = [
    {
      title: '✔ Boutique, individual-level service',
      description: 'Small practitioners or small teams only — never large brokerages or call centres.'
    },
    {
      title: '✔ Strong online reputation',
      description: 'Consistent high ratings on Google, Rate-My-Agent, WOWA, and verified testimonials.'
    },
    {
      title: '✔ Calgary-based expertise',
      description: 'Understanding of local lenders, neighbourhood trends, penalties, and investor financing.'
    },
    {
      title: '✔ Investor-friendly',
      description: 'Experience with cash-flow analysis, rental financing, renewals, refinances, and purchase-plus-improvements financing.'
    },
    {
      title: '✔ Transparent communication',
      description: 'No hidden conditions, no confusing terms, and clear expectations from day one.'
    }
  ];

  boutiqueAdvantages: string[] = [
    'Fast Communication',
    'Personal Attention',
    'Strong Lender Relationships',
    'Honest Explanations',
    'Investor-Oriented Thinking'
  ];

  getBrokerFirstName(fullName: string): string {
    return fullName.split(' ')[0];
  }

  getAdvantageDescription(advantage: string): string {
    const descriptions: {[key: string]: string} = {
      'Fast Communication': 'Without layers of staff',
      'Personal Attention': 'To your financial goals',
      'Strong Lender Relationships': 'Access to better rates and terms',
      'Honest Explanations': 'Of penalties, features, and traps',
      'Investor-Oriented Thinking': 'Focus on cashflow and long-term strategy'
    };
    return descriptions[advantage] || '';
  }
}
