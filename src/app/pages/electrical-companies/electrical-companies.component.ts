import { Component } from '@angular/core';
import { ToolsSectionComponent } from "../share/tools-section/tools-section.component";
import { CommonModule } from '@angular/common';

interface ElectricalCompany {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  address: string;
  recommendation: string;
  services: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-electrical-companies.component',
  imports: [ToolsSectionComponent, CommonModule],
  templateUrl: './electrical-companies.component.html',
  styleUrl: './electrical-companies.component.scss',
})
export class ElectricalCompaniesComponent {
 companies: ElectricalCompany[] = [
    {
      id: 1,
      name: '4-Star Electric Ltd.',
      title: 'Licensed Electrical Contractor',
      website: 'https://4starelectric.com',
      phone: '403-453-0527',
      address: '130-32 Westwinds Cres NE, Calgary, AB T3J 5L3',
      recommendation: '4-Star Electric is a well-established Calgary electrical contractor with a strong focus on residential service, safety upgrades, and compliance work. They are known for professional technicians, dependable scheduling, and clear explanations of required repairs.',
      services: ['Panel Upgrades', 'Aluminum Wiring Correction', 'Safety Inspections', 'Surge Protection', 'Code Corrections'],
      bestFor: [
        'Homeowners needing safe, code-compliant electrical work',
        'Landlords dealing with older or non-compliant systems',
        'Panel upgrades, troubleshooting, and safety inspections'
      ]
    },
    {
      id: 2,
      name: 'Gravity Electrical Solutions',
      title: 'Modern Electrical Solutions',
      website: 'https://www.gravityelectrical.ca',
      phone: '403-879-2345',
      address: '81 Rockyspring Point NW, Calgary, AB T3G 6A1',
      recommendation: 'Gravity Electrical Solutions is a Calgary-based electrical company recognized for modern solutions, thorough workmanship, and strong communication. They provide licensed residential and light commercial electrical services across the city.',
      services: ['Repairs & Renovations', 'Panel Upgrades', 'EV Charger Installations', 'Smart-Home Systems'],
      bestFor: [
        'Home renovations and electrical upgrades',
        'EV chargers and modern electrical improvements',
        'Owners and investors wanting reliable, well-documented work'
      ]
    },
    {
      id: 3,
      name: 'Crew Electrical Services Ltd.',
      title: 'Reliable Electrical Services',
      website: 'https://crewelectricalservices.com',
      phone: '403-909-0888',
      address: 'Unit 210, 5126 126 Ave SE, Calgary, AB T2Z 0H2',
      recommendation: 'Crew Electrical Services Ltd. is a Calgary-based electrical contractor trusted by homeowners, landlords, and property managers for reliable service and strong technical expertise. They handle both residential and light commercial electrical work with a focus on safety and compliance.',
      services: ['Panel Upgrades', 'Troubleshooting', 'EV Charger Installations', 'Lighting Solutions'],
      bestFor: [
        'Landlords and property managers needing dependable service',
        'Troubleshooting and electrical repairs',
        'Rental-property turnovers and compliance upgrades'
      ]
    }
  ];

  benefits = [
    'Ensure Code Compliance',
    'Identify Safety Hazards', 
    'Support Insurance Compliance',
    'Prevent Failed Inspections',
    'Reduce Long-Term Costs',
    'Protect Property Value'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Ensure Code Compliance': 'Guarantee all work meets Alberta Electrical Code requirements for safety and legality.',
      'Identify Safety Hazards': 'Detect outdated wiring, overloaded panels, and other electrical safety risks.',
      'Support Insurance Compliance': 'Provide work that meets insurance requirements and reduces claim risk.',
      'Prevent Failed Inspections': 'Avoid costly inspection failures and forced rework by doing it right the first time.',
      'Reduce Long-Term Costs': 'Minimize future maintenance expenses and emergency repair costs.',
      'Protect Property Value': 'Maintain and enhance property value through safe, up-to-code electrical systems.'
    };
    return descriptions[benefit] || '';
  }
}
