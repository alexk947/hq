import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Category {
  title: string;
  description: string;
  image: string;
  linkText: string;
  route?: string;
}

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements AfterViewInit {

  @ViewChild('findTrustedSection') ratesSection!: ElementRef;

  currentIndex = 0;
  chunkedCategories: Category[][] = [];

  categories: Category[] = [
    { title: 'Mortgage Brokers', description: 'Compare rates and find the best financing options for your home purchase.', image: '1766491444_694a853435756.png', linkText: 'View Brokers' , route: '/mortgage-brokers'},
    { title: 'Lawyers', description: 'Legal experts for contracts, titles, and smooth real estate transactions.', image: '1766491793_694a86913a220.png', linkText: 'View Lawyers' , route: '/real-estate-lawyers'},
    { title: 'Home Inspectors', description: 'Thorough home inspections to identify issues before you buy.', image: 'home_inspectors_bg02.png', linkText: 'View Inspectors' , route: '/home-inspectors'},
    { title: 'Renovation Companies', description: 'Transform your property with trusted renovation and remodeling experts.', image: 'renovation_companies.png', linkText: 'View Companies', route: '/renovation-companies' },
    { title: 'Property Managers', description: 'Professional management for rental properties and investment units.', image: '1766492237_694a884d8f520.png', linkText: 'View Managers' , route: '/property-managers'},
    { title: 'Insurance Brokers', description: 'Protect your home with tailored insurance coverage and expert, investment-focused guidance.', image: 'insurance_brokers.png', linkText: 'View Brokers' , route: '/insurance-brokers'},

    /* NEW */
    { title: 'Electrical Companies', description: 'Safe, reliable electrical services for repairs, upgrades, inspections, and long-term property protection.', image: 'electrical_companies.png', linkText: 'View' , route:'electrical-companies'},
    { title: 'Pest Control', description: 'Fast, professional pest removal to protect your home’s safety, comfort, and long-term value.', image: 'pest_control.png', linkText: 'View' , route:'pest-control'},
    { title: 'Real Estate Appraisal Firms', description: 'Accurate property valuations for refinancing, buying, selling, and confident investment decisions.', image: 'real_estate_appraisal_firms.png', linkText: 'View' , route:'appraisal-firms'},

    { title: 'Emergency Furnace Repair', description: 'Fast, 24/7 furnace repair to restore heat, safety, and comfort in your home.', image: 'emergency_furnace_repair.png', linkText: 'View' , route:'emergency-furnace'},
    { title: 'Roofers', description: 'Trusted roofing experts for inspections, repairs, and replacements that protect your property.', image: 'roofers.png', linkText: 'View' , route:'roofers'},
    { title: 'Plumbing Companies', description: 'Reliable plumbing services for repairs, maintenance, and upgrades to keep your home running smoothly.', image: 'plumbing_companies.png', linkText: 'View' , route:'plumbing-companies'},
  ];

  constructor() {
    this.chunkCategories();
  }

  chunkCategories() {
    const size = 6;
    this.chunkedCategories = [];

    for (let i = 0; i < this.categories.length; i += size) {
      this.chunkedCategories.push(this.categories.slice(i, i + size));
    }
  }

  nextSlide() {
    if (this.currentIndex < this.chunkedCategories.length - 1) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  // anchor handling
  @HostListener('window:hashchange')
  onHashChange() {
    this.scrollToHash();
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollToHash(), 100);
  }

  private scrollToHash() {
    if (window.location.hash === '#find-trusted') {
      this.scrollToSection();
    }
  }

  scrollToSection() {
    this.ratesSection?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
