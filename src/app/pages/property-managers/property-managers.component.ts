import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface PropertyManagementCompany {
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
  selector: 'app-property-managers.component',
  imports: [CommonModule, ToolsSectionComponent],
  templateUrl: './property-managers.component.html',
  styleUrl: './property-managers.component.scss',
})
export class PropertyManagersComponent {
companies: PropertyManagementCompany[] = [
    {
      id: 1,
      name: 'Briere Property Management',
      title: 'Professional Property Management Services',
      website: 'https://brierepm.com',
      phone: '403-465-0404',
      location: '#8, 4550 112 Ave SE, Calgary AB T2C 2K2',
      recommendation: 'Briere has built a strong reputation for hands-on, attentive management and excellent communication with both landlords and tenants. Their services include full tenant placement, rent collection, maintenance coordination, move-in/move-out inspections, and detailed owner reporting. Clients praise Briere for fast response times, low vacancy rates, and a professional approach that protects landlord interests.',
      services: ['Tenant Placement', 'Rent Collection', 'Maintenance Coordination', 'Move-in/Move-out Inspections', 'Owner Reporting'],
      bestFor: [
        'Owners wanting reliable, responsive management',
        'Investors needing low-vacancy tenant placement',
        'Landlords who value clear monthly reporting & transparency'
      ]
    },
    {
      id: 2,
      name: 'Citysearch Rental Network Inc.',
      title: 'Executive & Premium Rental Specialists',
      website: 'https://www.citysearchcalgary.com',
      phone: '403-777-1770',
      location: 'Calgary, AB',
      recommendation: 'Citysearch specializes in executive rentals, furnished properties, and higher-end investment homes, making them an excellent fit for investors targeting premium rental markets. Their tenant-screening processes are among the best in Calgary, and their marketing reach ensures strong demand for listings. They offer full-service property management with professionalism and systems-driven approach.',
      services: ['Executive Rentals', 'Furnished Property Management', 'Premium Tenant Screening', '24/7 Maintenance Coordination', 'Financial Reporting'],
      bestFor: [
        'Executive-level or furnished rental properties',
        'Investors wanting premium tenant selection',
        'Homeowners renting their personal residence or high-end units'
      ]
    },
    {
      id: 3,
      name: 'Unison Property Management & Real Estate Services',
      title: 'Comprehensive Property Management Solutions',
      website: 'https://www.unisonpropertymanagement.ca',
      phone: '403-219-3000',
      location: '205 – 1040 7 Ave SW, Calgary AB T2P 3G9',
      recommendation: 'Unison is one of Calgary\'s most recognized property management companies, with strong systems and a wide service offering that benefits both single-property owners and portfolio investors. They manage apartments, condos, townhomes, houses, and furnished rentals. Unison is known for organized operations, excellent marketing exposure, and professional tenant management.',
      services: ['Multi-Unit Management', 'Condo/Townhome Management', 'Furnished Rentals', 'Short-Term Rentals', 'Portfolio Management'],
      bestFor: [
        'Owners wanting a large, established management team',
        'Investors with multi-unit or mixed property portfolios',
        'Furnished and short-term rental management'
      ]
    }
  ];

  managerBenefits = [
    'Tenant Stability',
    'Maintenance Prevention',
    'Lease Enforcement',
    'Consistent Communication',
    'Seasonal Timing'
  ];

  getCompanyShortName(fullName: string): string {
    if (fullName.includes('Briere')) return 'Briere';
    if (fullName.includes('Citysearch')) return 'Citysearch';
    if (fullName.includes('Unison')) return 'Unison';
    
    return fullName.split(' ')[0];
  }

  getBenefitDescription(benefit: string): string {
    const descriptions: {[key: string]: string} = {
      'Tenant Stability': 'Better tenant stability and reduced turnover',
      'Maintenance Prevention': 'Fewer maintenance surprises through proactive management',
      'Lease Enforcement': 'Stronger lease enforcement and compliance with tenancy laws',
      'Consistent Communication': 'Regular updates and transparent communication',
      'Seasonal Timing': 'Well-timed renewals that avoid Calgary\'s slow winter months'
    };
    return descriptions[benefit] || '';
  }
}
