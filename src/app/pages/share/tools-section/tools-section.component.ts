// tools-section.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


interface Tool {
  name: string;
  description: string;
  isSpecial: boolean;
  actionText?: string;
  route?: string;
}

@Component({
  selector: 'app-tools-section',
  imports: [CommonModule, RouterModule],
  templateUrl: './tools-section.component.html',
  styleUrl: './tools-section.component.scss',
})
export class ToolsSectionComponent implements OnInit {
  @Input() variant: 'insurance' | 'electrical' | 'pestcontrol' = 'insurance';
  @Input() title: string = 'Popular Tools for Homeowners & Investors';
  @Input() description: string = 'Use our tools to make smarter real-estate decisions';

  tools: Tool[] = [];

  // Available tool variants
  private toolVariants = {
    insurance: [
      {
        name: 'Investment Property Calculator',
        description: 'See how insurance impacts cashflow and ROI for investment properties',
        isSpecial: false,
        actionText: 'Calculate Now',
        route: '/tools/investment-calculator'
      },
      {
      name: 'Pest Control Cost Analyzer',
      description: 'Compare different pest control approaches and their impact on property returns',
      isSpecial: true,
      actionText: 'Analyze Now',
      route: '/tools/pest-cost-analyzer'
    },
      {
        name: 'Insurance Impact Analyzer',
        description: 'Compare different insurance scenarios and their effect on your bottom line',
        isSpecial: true,
        actionText: 'Analyze Now',
        route: '/tools/insurance-analyzer'
      },
      {
        name: 'Mortgage Penalty Estimator',
        description: 'Understand refinancing timing risks and insurance implications',
        isSpecial: false,
        actionText: 'Estimate Now',
        route: '/tools/mortgage-estimator'
      },
      {
        name: 'Renovation ROI Estimator',
        description: 'Confirm if upgrades justify insurance increases and potential savings',
        isSpecial: false,
        actionText: 'Calculate ROI',
        route: '/tools/renovation-roi'
      },
      {
        name: 'Purchase-vs-Rent Analyzer',
        description: 'Evaluate long-term ownership costs including insurance premiums',
        isSpecial: false,
        actionText: 'Compare Now',
        route: '/tools/purchase-vs-rent'
      }
    ],

    electrical: [
      {
        name: 'Renovation ROI Estimator',
        description: 'Confirm electrical upgrades add real value to your property',
        isSpecial: false,
        actionText: 'Calculate Now',
        route: '/tools/renovation-roi'
      },
      {
        name: 'Electrical Upgrade Calculator',
        description: 'Estimate costs and returns for electrical system improvements',
        isSpecial: true,
        actionText: 'Estimate Now',
        route: '/tools/electrical-upgrade'
      },
      {
        name: 'Investment Property Calculator',
        description: 'See how electrical upgrades affect cashflow and ROI',
        isSpecial: false,
        actionText: 'Analyze Now',
        route: '/tools/investment-calculator'
      },
      {
        name: 'Cap-Rate Map (Calgary)',
        description: 'Compare neighbourhood investment performance',
        isSpecial: false,
        actionText: 'Explore Map',
        route: '/tools/cap-rate-map'
      },
      {
        name: 'Purchase-vs-Renovate Analyzer',
        description: 'Decide if upgrading electrical makes financial sense',
        isSpecial: false,
        actionText: 'Compare Now',
        route: '/tools/purchase-vs-renovate'
      }
    ],
    'pestcontrol': [
      {
        name: 'Investment Property Calculator',
        description: 'Cashflow, ROI, and long-term equity growth—after factoring in realistic pest-control costs.',
        isSpecial: false,
        actionText: 'Calculate Now',
        route: '/tools/investment-calculator'
      },
      {
        name: 'Pest Control Cost Analyzer',
        description: 'Compare different pest control approaches and their impact on property returns.',
        isSpecial: true,
        actionText: 'Calculate Now',
        route: '/tools/pest-control-calculator'
      },
      {
        name: 'Mortgage Penalty Estimator',
        description: 'Understand refinancing timing risks and insurance implications',
        isSpecial: false,
        actionText: 'Estimate Now',
        route: '/tools/mortgage-estimator'
      },
      {
        name: 'Renovation ROI Estimator',
        description: 'Confirm electrical upgrades add real value to your property',
        isSpecial: false,
        actionText: 'Calculate Now',
        route: '/tools/renovation-roi'
      },
      
      {
        name: 'Purchase-vs-Renovate Analyzer',
        description: 'Decide if upgrading electrical makes financial sense',
        isSpecial: false,
        actionText: 'Compare Now',
        route: '/tools/purchase-vs-renovate'
      }
    ]
  };

  // Default descriptions for each variant
  private variantDescriptions = {
    insurance: 'Use our tools to make smarter, more confident real-estate decisions—including how insurance impacts your investments.',
    electrical: 'Use our tools to make smarter, more confident real-estate decisions—including how electrical upgrades impact your investments.',
    pestcontrol: 'Investor-focused & homeowner-friendly tools to make smarter property decisions.' 
  };

  // Default titles for each variant
  private variantTitles = {
    insurance: '🔧 Popular Tools for Homeowners & Investors',
    electrical: '🔧 Popular Tools for Homeowners & Real Estate Investors',
    pestcontrol: '🔧 Our Most Popular Free Tools'
  };

  ngOnInit() {
    this.loadToolsForVariant();
  }

  ngOnChanges() {
    this.loadToolsForVariant();
  }

  private loadToolsForVariant() {
    // Set tools based on variant
    this.tools = this.toolVariants[this.variant] || this.toolVariants.insurance;

    // Set default title if not provided
    if (!this.title || this.title === 'Popular Tools for Homeowners & Investors') {
      this.title = this.variantTitles[this.variant];
    }

    // Set default description if not provided
    if (!this.description || this.description === 'Use our tools to make smarter real-estate decisions') {
      this.description = this.variantDescriptions[this.variant];
    }
  }

  // Helper method to get action button text
  getActionText(tool: Tool): string {
    return tool.actionText || 'Calculate Now';
  }

  // Helper method to get route for tool
  getToolRoute(tool: Tool): string {
    return tool.route || '/tools';
  }
}
