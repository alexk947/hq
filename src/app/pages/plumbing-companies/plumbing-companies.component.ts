import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';
interface PlumbingCompany {
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
  selector: 'app-plumbing-companies.component',
  imports: [CommonModule, ToolsSectionComponent],
  templateUrl: './plumbing-companies.component.html',
  styleUrl: './plumbing-companies.component.scss',
})
export class PlumbingCompaniesComponent {
  companies: PlumbingCompany[] = [
    {
      id: 1,
      name: 'ERM Plumbing & Heating Calgary',
      title: 'Emergency Plumbing & Heating Services',
      website: 'https://www.ermcalgary.com/',
      phone: '(403) 978-7385',
      location: '231 Shawinigan Dr SW, Calgary AB T2Y 2Y4',
      recommendation: 'ERM is a strong choice for homeowners and landlords who want straightforward service, clear communication, and dependable workmanship. They handle common urgent issues such as leaks, clogged drains, hot water problems, and heating repairs—especially when timing matters and you need a company that takes ownership of the outcome.',
      services: ['Emergency Plumbing Repairs', 'Drain Cleaning', 'Hot Water Systems', 'Heating Repairs'],
      bestFor: [
        'Emergency plumbing repairs (leaks, backups, no hot water)',
        'Heating support for rental properties during cold snaps',
        'Owners who want clear explanations and clean work'
      ]
    },
    {
      id: 2,
      name: 'My Calgary Plumber',
      title: 'Reliable Plumbing Services',
      website: 'https://mycalgaryplumber.ca/',
      phone: '(587) 707-0606',
      location: '10325 Bonaventure Dr SE, Suite 403, Calgary AB T2J 7E4',
      recommendation: 'My Calgary Plumber is a reliable option when you need responsive service and a company that keeps things simple—diagnose the issue, explain the fix, and get it done. They are well-suited for both homeowners and investors who want consistent communication and fast action for urgent plumbing problems.',
      services: ['Drain Cleaning', 'Pipe Repair', 'Fixture Installation', 'Emergency Service'],
      bestFor: [
        'Drain issues and urgent plumbing service calls',
        'Landlords needing quick turnaround between tenants',
        'Homeowners who want upfront, clear communication'
      ]
    },
    {
      id: 3,
      name: 'The Gentlemen Pros Plumbing, Heating & Electrical',
      title: 'Multi-Service Plumbing, Heating & Electrical',
      website: 'https://thegentlemenpros.com/',
      phone: '(403) 770-9075',
      location: '5355 8th Street NE, Calgary AB T2K 5R9',
      recommendation: 'The Gentlemen Pros is a strong "one-call" option when you need help with plumbing, heating, or electrical—especially useful for homeowners and landlords managing older homes where issues overlap (e.g., furnace + thermostat wiring, water heater + electrical, sump pumps, etc.). Their broad service coverage can reduce coordination headaches when a property issue touches multiple trades.',
      services: ['Plumbing Services', 'Heating Systems', 'Electrical Work', 'Multi-Trade Solutions'],
      bestFor: [
        'Properties needing plumbing + heating + electrical support',
        'Investors who want one contractor to reduce coordination delays',
        'Owners who prioritize fast dispatch and clear service process'
      ]
    }
  ];

  benefits = [
    'Root Cause Diagnosis',
    'Safety Prioritization',
    'Clear Pricing & Timelines',
    'Proper Documentation'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Root Cause Diagnosis': 'Diagnose the root cause quickly (not guess-and-swap)',
      'Safety Prioritization': 'Prioritize safety (gas, CO risk, water damage prevention)',
      'Clear Pricing & Timelines': 'Provide clear pricing and realistic timelines',
      'Proper Documentation': 'Document work properly (useful for landlords, insurers, and resale)'
    };
    return descriptions[benefit] || '';
  }

  getCompanyShortName(fullName: string): string {
    // Извлекаем первое слово из названия компании
    return fullName.split(' ')[0];
  }
}
