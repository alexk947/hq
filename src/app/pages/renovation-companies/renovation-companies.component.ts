import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from '../share/tools-section/tools-section.component';

interface RenovationCompany {
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
  selector: 'app-renovation-companies.component',
  imports: [CommonModule, RouterModule, ToolsSectionComponent],
  templateUrl: './renovation-companies.component.html',
  styleUrl: './renovation-companies.component.scss',
})
export class RenovationCompaniesComponent {
companies: RenovationCompany[] = [
    {
      id: 1,
      name: 'Kay2 Contracting & Home Renovations',
      title: 'Professional Home Renovation Services',
      website: 'https://kay2.ca',
      phone: '403-708-3308',
      location: 'Calgary, AB',
      recommendation: 'Kay2 is widely recognized for delivering high-quality craftsmanship with a professional, detail-focused approach. They specialize in kitchens, bathrooms, basements, home additions, exterior upgrades, and complete home renovations. Their clients frequently mention strong communication, tidy job sites, and results that match or exceed expectations.',
      specialties: ['Kitchen Renovations', 'Bathroom Remodels', 'Basement Development', 'Home Additions', 'Complete Home Updates'],
      bestFor: [
        'Full home updates and major renovations',
        'High-end kitchen or bathroom transformations',
        'Investors upgrading aging properties for long-term appreciation'
      ]
    },
    {
      id: 2,
      name: 'Reborn Renovations',
      title: 'Award-Winning Design & Renovation',
      website: 'https://www.rebornrenovations.com',
      phone: '403-907-1078',
      location: 'Calgary, AB',
      recommendation: 'Reborn Renovations is known for award-winning designs, modern finishes, and professional project management. They excel in whole-home renovations, basement developments, and contemporary kitchen/bath remodels. Their transparent process, strong design team, and reliable communication make them a favourite among Calgary homeowners.',
      specialties: ['Whole-Home Renovations', 'Basement Development', 'Modern Kitchen Design', 'Bathroom Remodels', 'Contemporary Finishes'],
      bestFor: [
        'Homeowners wanting design-driven renovations',
        'Full basement developments',
        'Sellers modernizing a property to maximize resale value'
      ]
    },
    {
      id: 3,
      name: 'Renovate For Good Ltd.',
      title: 'Quality Renovations with Integrity',
      website: 'https://www.renovateforgood.com',
      phone: '403-630-8371',
      location: 'Calgary, AB',
      recommendation: 'Renovate For Good blends excellent workmanship with a reputation for honesty, clear pricing, and high client satisfaction. They specialize in kitchens, bathrooms, basements, flooring, carpentry, and medium-sized full-home projects, with strong attention to detail and communication throughout each job.',
      specialties: ['Kitchen Remodels', 'Bathroom Updates', 'Flooring Installation', 'Carpentry Work', 'Interior Improvements'],
      bestFor: [
        'Kitchen and bathroom remodels',
        'Flooring, carpentry & interior improvements',
        'Reliable renovations for rental properties'
      ]
    },
    {
      id: 4,
      name: 'Chinook Renos',
      title: 'Reliable Home Renovation Services',
      website: 'https://www.chinookrenos.com',
      phone: '403-888-6272',
      location: 'Calgary, AB',
      recommendation: 'Chinook Renos is a strong Calgary renovation company known for transparent estimates, dependable timelines, and clean, professional workmanship. They handle kitchens, bathrooms, basements, flooring, tiling, exteriors, and general home improvements. Clients consistently praise their responsiveness and the way they walk homeowners through every step of the process.',
      specialties: ['Bathroom Renovations', 'Basement Updates', 'Flooring & Tiling', 'Exterior Improvements', 'General Home Updates'],
      bestFor: [
        'Mid-size renovations with quick turnaround',
        'Bathrooms, basements & interior updates',
        'Landlords refreshing rental units efficiently'
      ]
    },
    {
      id: 5,
      name: 'Dependable Renovations Ltd.',
      title: 'Quality Project Management & Structural Work',
      website: 'https://dependablerenovations.com',
      phone: '403-828-0915',
      location: 'Calgary, AB',
      recommendation: 'Dependable Renovations brings a strong reputation for integrity, clear communication, and high-quality project management. They specialize in kitchens, bathrooms, additions, basement developments, structural changes, and whole-home renovations. Homeowners value their precision and professionalism, while investors appreciate their ability to complete larger, more complex scopes.',
      specialties: ['Whole-Home Renovations', 'Structural Changes', 'Home Additions', 'Basement Development', 'Complex Projects'],
      bestFor: [
        'Whole-home renovations and additions',
        'Structural redesigns',
        'Major improvements aimed at resale or long-term investment value'
      ]
    }
  ];

  renovationBenefits = [
    'Issue Identification',
    'Transparent Budgeting',
    'ROI-Focused Solutions',
    'Professional Finish',
    'Clear Communication'
  ];

  getCompanyShortName(fullName: string): string {
    // Обработка сложных названий компаний
    if (fullName.includes('Kay2')) return 'Kay2';
    if (fullName.includes('Reborn')) return 'Reborn Renovations';
    if (fullName.includes('Renovate For Good')) return 'Renovate For Good';
    if (fullName.includes('Chinook')) return 'Chinook Renos';
    if (fullName.includes('Dependable')) return 'Dependable Renovations';
    
    // Извлекаем первое слово для других названий
    return fullName.split(' ')[0];
  }

  getBenefitDescription(benefit: string): string {
    const descriptions: {[key: string]: string} = {
      'Issue Identification': 'Identify potential issues before work begins',
      'Transparent Budgeting': 'Provide accurate, transparent estimates',
      'ROI-Focused Solutions': 'Offer solutions that maximize both comfort and ROI',
      'Professional Finish': 'Deliver a clean, professional finish that increases value',
      'Clear Communication': 'Maintain clear communication throughout the project'
    };
    return descriptions[benefit] || '';
  }
}
