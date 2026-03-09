import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';


interface FurnaceRepairCompany {
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
  selector: 'app-emergency-furnace-repair.component',
  imports: [CommonModule, ToolsSectionComponent],
  templateUrl: './emergency-furnace-repair.component.html',
  styleUrl: './emergency-furnace-repair.component.scss',
})
export class EmergencyFurnaceRepairComponent {
companies: FurnaceRepairCompany[] = [
    {
      id: 1,
      name: 'Action Furnace, Inc.',
      title: 'Emergency Heating Repair',
      website: 'https://actionfurnace.ca/locations/calgary/',
      phone: '587-797-3064',
      location: '925 26 St NE, Calgary AB T2A 6K8',
      recommendation: 'Action Furnace is a long-established Calgary HVAC provider with strong capacity for urgent repairs and fast diagnostics. They service and repair major furnace brands and are known for structured processes—helpful when you need quick, decisive action in a no-heat situation.',
      services: ['Emergency Furnace Repair', 'Furnace Maintenance', 'Heating System Diagnostics'],
      bestFor: [
        'Homeowners needing rapid response for no-heat issues',
        'Investors/landlords needing dependable emergency support',
        'Furnace repair + maintenance planning to reduce future breakdowns'
      ]
    },
    {
      id: 2,
      name: 'A1 Chesney Service Experts',
      title: '24/7 Heating & Furnace Repair',
      website: 'https://www.a1chesney.com/about-us/contact/',
      phone: '403-277-1346',
      location: '7317 12 St SE, Unit 2, Calgary AB T2H 2S6',
      recommendation: 'A1 Chesney is a well-known Calgary service provider with the systems, staffing, and experience to handle urgent heating breakdowns. They\'re a strong option when you want a company that can dispatch quickly, communicate clearly, and support both immediate repairs and longer-term HVAC planning.',
      services: ['24/7 Emergency Service', 'Furnace Repair', 'Heating System Installation'],
      bestFor: [
        'Emergency no-heat calls requiring quick dispatch',
        'Homeowners wanting strong service processes and support',
        'Landlords who want consistent response and documented work'
      ]
    },
    {
      id: 3,
      name: 'JPS Furnace & Air Conditioning',
      title: 'Furnace Repair & Emergency Service',
      website: 'https://jpsfurnace.ca/',
      phone: '403-510-1204',
      location: '903 42 Avenue SE, Calgary AB T2G 1Z1',
      recommendation: 'JPS is a Calgary HVAC company known for furnace repair, replacement, and strong customer communication. Their local presence and straightforward approach make them a reliable choice when you need urgent help and want a company that is easy to reach and clear about next steps.',
      services: ['Emergency Furnace Service', 'Furnace Replacement', 'HVAC System Planning'],
      bestFor: [
        'Homeowners needing furnace repair with clear communication',
        'Investors coordinating repairs between tenants or during cold snaps',
        'Owners who want repair options plus longer-term upgrade planning'
      ]
    }
  ];

  benefits = [
    'Quick Diagnosis',
    'Safety Prioritization',
    'Clear Pricing & Timelines',
    'Proper Documentation'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Quick Diagnosis': 'Diagnose the real cause quickly (not guess-and-swap parts)',
      'Safety Prioritization': 'Prioritize safety (CO risk, venting, cracked heat exchangers)',
      'Clear Pricing & Timelines': 'Provide clear pricing and realistic timelines',
      'Proper Documentation': 'Document work properly (useful for landlords, insurers, and future resale)'
    };
    return descriptions[benefit] || '';
  }
}
