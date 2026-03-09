import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface HomeInspector {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  location: string;
  recommendation: string;
  technologies: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-home-inspectors.component',
  imports: [CommonModule, RouterModule, ToolsSectionComponent],
  templateUrl: './home-inspectors.component.html',
  styleUrl: './home-inspectors.component.scss',
})
export class HomeInspectorsComponent {
inspectors: HomeInspector[] = [
    {
      id: 1,
      name: 'Twenty20 Master Home Inspections',
      title: 'Professional Home Inspection Services',
      website: 'https://twenty20mhi.com',
      phone: '403-389-4731',
      location: 'Calgary, AB',
      recommendation: 'Twenty20 is known for exceptionally thorough inspections, clear digital reports, and strong communication throughout the process. Their inspectors take the time to explain issues in detail, making them an excellent fit for first-time buyers and investors who want full clarity before finalizing a purchase. They use high-end tools and provide same-day reporting—highly valuable in Calgary\'s fast-paced real estate market.',
      technologies: ['Thermal Imaging', 'Moisture Detection', 'Drone Inspections', 'Same-Day Reporting'],
      bestFor: [
        'First-time buyers wanting detailed explanations',
        'Investors evaluating older properties for hidden risks',
        'Buyers needing fast turnaround & high-quality reporting'
      ]
    },
    {
      id: 2,
      name: 'JCH Inspections (James Campbell Home Inspections)',
      title: 'Residential Construction & Inspection Expert',
      website: 'https://www.jchi.ca',
      phone: '403-993-0629',
      location: 'Calgary, AB',
      recommendation: 'JCH Inspections is led by James Campbell, one of Calgary\'s most trusted home inspectors with years of experience in residential construction and inspection. He is known for his down-to-earth communication style, sharp eye for detail, and ability to identify issues that affect long-term maintenance costs. James excels at educating clients, making the inspection feel less intimidating—especially for first-time buyers.',
      technologies: ['Structural Analysis', 'HVAC Lifespan Assessment', 'Comprehensive Roofing Inspection', 'Electrical Systems Check'],
      bestFor: [
        'Buyers wanting a highly experienced, trusted inspector',
        'Clients who appreciate honest, straightforward explanations',
        'Investors looking for long-term maintenance insights'
      ]
    },
    {
      id: 3,
      name: 'Motorious Solutions – Home Inspections (Moe Khalil)',
      title: 'Customer-Focused Home Inspection Services',
      website: 'https://www.motorioussolutions.com/contact',
      phone: '587-576-9663',
      location: 'Calgary, AB',
      recommendation: 'Motorious Solutions, led by Moe Khalil, stands out for exceptional customer service, flexible scheduling, and investor-friendly inspections. Moe is known for being highly attentive, patient, and extremely thorough—often spending extra time to ensure clients fully understand the condition of the property. His reports are clear, professional, and easy to navigate.',
      technologies: ['Comprehensive Safety Checks', 'Risk Area Analysis', 'Repair Cost Estimation', 'Maintenance Planning'],
      bestFor: [
        'Investors needing an inspection focused on risk & ROI',
        'Homebuyers who want an inspector with strong communication skills',
        'Clients who value a patient, attentive approach'
      ]
    }
  ];

  inspectorBenefits = [
    'Structural & Foundation Issues',
    'Moisture & Mold Detection',
    'System Lifespan Estimation',
    'Negotiation Support',
    'Cost Prevention',
    'Maintenance Guidance'
  ];

  getInspectorShortName(fullName: string): string {
    if (fullName.includes('Twenty20')) return 'Twenty20';
    if (fullName.includes('JCH')) return 'JCH Inspections';
    if (fullName.includes('Motorious')) return 'Motorious Solutions';
    
    // Извлекаем первое слово для других названий
    return fullName.split(' ')[0];
  }

  getBenefitDescription(benefit: string): string {
    const descriptions: {[key: string]: string} = {
      'Structural & Foundation Issues': 'Identify hidden structural, electrical, roofing, and foundation issues',
      'Moisture & Mold Detection': 'Detect moisture problems, leaks, and early signs of mold',
      'System Lifespan Estimation': 'Estimate the remaining life of major systems (furnace, roof, water heater, windows)',
      'Negotiation Support': 'Help you negotiate repairs, credits, or price reductions',
      'Cost Prevention': 'Prevent costly surprises after possession',
      'Maintenance Guidance': 'Provide long-term maintenance guidance for homeowners and investors'
    };
    return descriptions[benefit] || '';
  }
}
