import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface RooferCompany {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  location: string;
  recommendation: string;
  services: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-roofers.component',
  imports: [CommonModule, ToolsSectionComponent],
  templateUrl: './roofers.component.html',
  styleUrl: './roofers.component.scss',
})
export class RoofersComponent {
  companies: RooferCompany[] = [
    {
      id: 1,
      name: 'Roof By Roof Exteriors Ltd.',
      title: 'Roofing & Exteriors (Family-Run Since 1997)',
      website: 'https://www.roofbyroofexteriors.ca',
      phone: '403-273-0303',
      location: '7015 Macleod Trail SW, Calgary AB T2H 2K6',
      recommendation: 'Roof By Roof Exteriors is a long-established Calgary company known for solid workmanship across roofing and exterior services. Homeowners value their experience and consistency, while investors appreciate the reduced risk of repeat repairs and storm-related failures.',
      services: ['Roof Repair', 'Roof Replacement', 'Exterior Services'],
      bestFor: [
        'Homeowners needing dependable repair or replacement after hail or wind events',
        'Investors protecting rental properties and minimizing long-term roofing risk',
        'Clients who want an established Calgary firm with a long operating history'
      ]
    },
    {
      id: 2,
      name: 'Whalley\'s Four Seasons Roofing',
      title: 'Calgary Roofing Contractor',
      website: 'https://whalleysfourseasonsroofing.ca',
      phone: '403-288-8819',
      location: '4502 22 Ave NW, Calgary AB T3B 0X7',
      recommendation: 'Whalley\'s Four Seasons Roofing is well known for work tailored to Calgary\'s climate—hail, wind, attic rain, and harsh winter conditions. They are a strong choice for homeowners who want a clear, step-by-step process and for investors planning proactive maintenance.',
      services: ['Roof Inspection', 'Seasonal Maintenance', 'Weather Damage Repair'],
      bestFor: [
        'Homeowners seeking a structured inspection-to-completion process',
        'Investors planning seasonal roofing maintenance',
        'Roof repairs and replacements tied to Calgary weather patterns'
      ]
    },
    {
      id: 3,
      name: 'City Boss Residential Roofing',
      title: 'Residential Roofing Specialists',
      website: 'https://citybossroofingcalgary.com',
      phone: '587-284-1544',
      location: 'Box 89027, 70 High St SE, Calgary AB T2Z 3W3',
      recommendation: 'City Boss focuses on residential roofing with an emphasis on asphalt shingles and straightforward quoting. They are a practical choice when timelines matter—especially after storm damage—thanks to clear communication and efficient execution.',
      services: ['Asphalt Shingle Roofing', 'Storm Damage Repair', 'Residential Roof Replacement'],
      bestFor: [
        'Homeowners needing residential shingle roofing services',
        'Investors needing efficient roof work to protect tenants and prevent damage',
        'Time-sensitive repairs or replacements after hail or wind events'
      ]
    }
  ];

  benefits = [
    'Early Storm Damage Detection',
    'Proper Installation',
    'Complete Documentation',
    'Reduced Repeat Repairs'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Early Storm Damage Detection': 'Identify storm damage early before leaks spread',
      'Proper Installation': 'Install correctly to prevent premature failure (ventilation, flashing, underlayment)',
      'Complete Documentation': 'Provide documentation that supports insurance and resale',
      'Reduced Repeat Repairs': 'Reduce repeat callouts and hidden repair costs'
    };
    return descriptions[benefit] || '';
  }
}
