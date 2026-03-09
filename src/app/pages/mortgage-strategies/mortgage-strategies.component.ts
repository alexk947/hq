import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mortgage-strategies',
  imports: [CommonModule,
    RouterModule,],
  templateUrl: './mortgage-strategies.html',
  styleUrl: './mortgage-strategies.scss',
})
export class MortgageStrategies {
 strategies = [
    {
      number: 1,
      title: 'Optimize for flexibility, not just the lowest rate',
      content: {
        comparison: {
          wrong: '❌ "What\'s the lowest rate I can get?"',
          right: '✅ "What happens if I need to break or change this mortgage?"'
        },
        factors: [
          'Mortgage break penalties',
          'Prepayment privileges',
          'Porting rules',
          'Ability to refinance or switch lenders',
          'Restrictions hidden in the fine print'
        ],
        warning: 'A lower rate with a severe penalty can cost more than a slightly higher rate with flexibility.'
      }
    },
    {
      number: 2,
      title: 'Understand break penalties before you sign',
      content: {
        description: 'One of the most expensive homeowner mistakes is not understanding mortgage penalties.',
        highlights: [
          'Breaking early can mean tens of thousands of dollars',
          'Penalties are often calculated using posted rates, not your actual rate',
          'Waiting longer does not always reduce the penalty — it can increase it'
        ],
        strategy: [
          'Knowing your estimated penalty today',
          'Understanding how fast it could grow',
          'Choosing a structure aligned with your likelihood of moving, refinancing, or selling'
        ]
      }
    },
    {
      number: 3,
      title: 'Match the mortgage to your life horizon',
      content: {
        description: 'The right mortgage depends on how long you realistically expect to keep it.',
        guidance: [
          { title: 'Short or uncertain horizon', tip: '→ Prioritize flexibility' },
          { title: 'Stable, long-term ownership', tip: '→ Fixed rate may make sense' },
          { title: 'Investors or mobile professionals', tip: '→ Flexibility often beats rate' }
        ],
        changes: [
          'Job relocation',
          'Family expansion',
          'Divorce or separation',
          'Investment property purchases',
          'Market-driven refinancing'
        ],
        insight: 'A good strategy assumes change is possible, not that plans are permanent.'
      }
    },
    {
      number: 4,
      title: 'Rate type is about risk tolerance, not prediction',
      content: {
        description: 'Fixed vs. variable is not about guessing future rates — it\'s about how much uncertainty you can tolerate.',
        comparison: {
          fixed: {
            pros: ['Payment stability', 'Predictable costs'],
            cons: ['Higher break costs', 'Less flexibility']
          },
          variable: {
            pros: ['Usually lower penalties', 'More flexibility'],
            cons: ['Payment uncertainty', 'Rate fluctuation risk']
          }
        },
        reminder: 'There is no universally "better" option — only better alignment with your situation. Hybrid and shorter-term options can reduce long-term risk.'
      }
    },
    {
      number: 5,
      title: 'Think in total cost, not just monthly payment',
      content: {
        description: 'Many homeowners underestimate how much a mortgage costs over time.',
        considerations: [
          'Interest paid over the full life of the mortgage',
          'Fees and penalties when switching',
          'Opportunity costs of being locked in',
          'Cash-flow flexibility vs. forced payments'
        ],
        insight: 'A mortgage with a slightly higher payment but lower risk can be cheaper overall.'
      }
    }
  ];

  finalStrategy = {
    title: 'Education beats prediction',
    content: {
      heading: 'Markets change. Rates change. Life changes.',
      constants: [
        'Contract math',
        'Penalty rules',
        'Risk exposure',
        'Decision quality'
      ],
      ultimate: 'The strongest mortgage strategy is understanding how the system works, not reacting to headlines.'
    }
  };

  checklist = [
    'How long am I likely to keep this mortgage?',
    'What happens if my plans change?',
    'What does it cost to exit?',
    'Which risks am I comfortable carrying?',
    'Am I optimizing for rate — or protection?'
  ];
}
