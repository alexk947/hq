import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface RealEstateLawyer {
  id: number;
  name: string;
  title: string;
  website: string;
  phone: string;
  location: string;
  recommendation: string;
  specialties: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-real-estate-lawyers.component',
  imports: [CommonModule, RouterModule, ToolsSectionComponent],
  templateUrl: './real-estate-lawyers.component.html',
  styleUrl: './real-estate-lawyers.component.scss',
})
export class RealEstateLawyersComponent {
lawyers: RealEstateLawyer[] = [
    {
      id: 1,
      name: 'Brandon Tagg',
      title: 'Real Estate Lawyer (Tagg Olsen Law)',
      website: 'https://taggolsenlaw.ca',
      phone: '403-444-4411',
      location: '#523, 10333 Southport Rd SW, Calgary AB T2W 3X6',
      recommendation: 'Brandon offers clear, efficient, and detail-oriented real estate legal services. Clients consistently highlight his strong communication, reasonable fees, and ability to simplify complex legal details for both homeowners and investors. His practice handles purchases, sales, refinances, title matters, and investment transactions with the kind of personal attention clients rarely experience at larger firms.',
      specialties: ['Purchase/Sale Transactions', 'Refinancing', 'Title Matters', 'Investment Property'],
      bestFor: [
        'Homebuyers seeking fast and reliable closings',
        'Investors purchasing multiple properties or complex structures',
        'Clients who value direct access to their lawyer'
      ]
    },
    {
      id: 2,
      name: 'Urban Law Group',
      title: 'Real Estate Lawyers',
      website: 'https://ulaw.ca',
      phone: '403-215-3440',
      location: '#100, 7710 5 St SE, Calgary AB T2H 2L9',
      recommendation: 'Urban Law Group offers structured, professional real-estate legal services across Calgary, specializing in residential purchases, sales, refinances, and condo transactions. Their team is known for responsiveness, strong communication, and a smooth, efficient process that makes clients feel supported from document review to final signing.',
      specialties: ['Residential Transactions', 'Condo Purchases', 'Refinancing', 'Document Review'],
      bestFor: [
        'First-time buyers needing clear guidance',
        'Condo transactions requiring careful document review',
        'Investors seeking a reliable, organized legal team'
      ]
    },
    {
      id: 3,
      name: 'Kurtis J. MacDonald, BBA, JD',
      title: 'MacDonald Law North',
      website: 'https://macdonaldlawnorth.ca',
      phone: '587-387-8008',
      location: '300, 4503 Brisebois Dr NW, Calgary AB T2L 2G3',
      recommendation: 'Kurtis provides highly approachable and client-focused real estate legal services, with additional expertise in estate-related property matters. Clients appreciate his honesty, transparency in pricing, and his ability to explain legal issues in simple, understandable terms.',
      specialties: ['Real Estate Transactions', 'Estate-Related Transfers', 'Family Sales', 'Refinancing'],
      bestFor: [
        'Homeowners seeking a friendly, easy-to-talk-to lawyer',
        'Estate-related transfers, family sales, and refinances',
        'Investors wanting a detail-oriented legal partner'
      ]
    }
  ];

  lawyerBenefits = [
    'Contract & Document Review',
    'Title & Lien Verification',
    'Refinancing Structure',
    'Risk Identification',
    'Transaction Management'
  ];

  getLawyerFirstName(fullName: string): string {
    // Извлекаем первое слово из имени (для Urban Law Group возвращаем полное название)
    if (fullName.includes('Law Group')) {
      return 'Urban Law Group';
    }
    return fullName.split(' ')[0];
  }

  getBenefitDescription(benefit: string): string {
    const descriptions: {[key: string]: string} = {
      'Contract & Document Review': 'Review contracts and mortgage documents for hidden clauses',
      'Title & Lien Verification': 'Catch issues with title, easements, liens, or outstanding permits',
      'Refinancing Structure': 'Ensure your refinancing or HELOC is structured correctly',
      'Risk Identification': 'Identify legal risks with secondary suites or rental usage',
      'Transaction Management': 'Prevent delays that could trigger penalties from banks or sellers'
    };
    return descriptions[benefit] || '';
  }
}
