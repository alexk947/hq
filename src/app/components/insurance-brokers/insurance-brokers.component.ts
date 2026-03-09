import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsuranceBrokersHeroComponent } from './insurance-brokers-hero/insurance-brokers-hero';
import { Broker, BrokerCardComponent } from './broker-card/broker-card';
import { BenefitsGridComponent } from './benefits-grid/benefits-grid';
import { ToolsSectionComponent } from "../../pages/share/tools-section/tools-section.component";

@Component({
  selector: 'app-insurance-brokers.component',
  imports: [
    CommonModule,
    RouterModule,
    InsuranceBrokersHeroComponent,
    BrokerCardComponent,
    BenefitsGridComponent,
    ToolsSectionComponent
],
  templateUrl: './insurance-brokers.component.html',
  styleUrl: './insurance-brokers.component.scss',
})
export class InsuranceBrokersComponent {
brokers: Broker[] = [
    {
      name: 'Leibel Insurance Group',
      title: 'Customized Insurance Solutions',
      website: 'https://ligroup.ca',
      phone: '403-910-1848',
      address: 'Unit 101, 2816 11 St NE, Calgary, AB T2E 7S7',
      recommendation: 'Leibel Insurance Group stands out for its risk-first, customized insurance approach. Rather than selling generic policies, they focus on understanding how a home or rental property is actually used—and where coverage gaps commonly occur.',
      coverageAreas: ['Landlord Insurance', 'Secondary Suites', 'Accurate Replacement Cost', 'Liability Exposure'],
      bestFor: [
        'Homeowners seeking strong, properly structured coverage',
        'Rental property owners and small portfolio investors',
        'Clients who want clear explanations and proactive risk management'
      ]
    },
    {
      name: 'Sharp Insurance',
      title: 'Balanced Coverage & Pricing',
      website: 'https://sharpinsurance.ca',
      phone: '403-590-2008',
      address: 'Suite 300, 1331 Macleod Trail SE, Calgary, AB T2G 0K3',
      recommendation: 'Sharp Insurance is well known in Calgary for balancing competitive pricing with solid policy structure. Their team works extensively with homeowners, landlords, condo owners, and higher-value properties across Alberta.',
      bestFor: [
        'Cost-conscious homeowners who still want proper coverage',
        'Landlords and condo owners',
        'Clients looking for competitive pricing without sacrificing protection'
      ]
    },
    {
      name: 'BrokerLink',
      title: 'Large-Scale Insurance Solutions',
      website: 'https://brokerlink.ca',
      phone: '403-259-0244',
      address: '1201 Glenmore Trail SW #400, Calgary, AB',
      recommendation: 'BrokerLink is one of Canada\'s largest insurance brokerages, and its Glenmore Trail Calgary office provides structured, professional service with access to a wide range of insurers.',
      bestFor: [
        'Investors with multiple properties or complex portfolios',
        'Homeowners who prefer a well-established brokerage',
        'Clients needing broad insurer access and coordinated coverage'
      ]
    }
  ];

  
}
