import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolsSectionComponent } from "../share/tools-section/tools-section.component";



interface AppraisalFirm {
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
  selector: 'app-appraisal-firms',
  imports: [CommonModule,
    RouterModule, ToolsSectionComponent],
  templateUrl: './appraisal-firms.html',
  styleUrl: './appraisal-firms.scss',
})
export class AppraisalFirms {
 firms: AppraisalFirm[] = [
    {
      id: 1,
      name: 'Sage Appraisals',
      title: 'Residential & Commercial Specialists',
      website: 'https://www.sageappraisals.com',
      phone: '403-282-3322',
      location: 'North Hill RPO, PO Box 65117, Calgary AB T2N 4T6',
      recommendation: 'Sage Appraisals is one of Calgary\'s most established appraisal firms, with a team of experienced appraisers working across residential and commercial properties. Their reports are widely relied upon for mortgage financing, tax assessment appeals, estate planning, relocations, and legal matters.',
      services: ['Mortgage Financing', 'Tax Assessment Appeals', 'Estate Planning', 'Relocations', 'Legal Matters'],
      bestFor: [
        'Homeowners needing appraisals for purchase, refinance, or estate/settlement',
        'Investors assessing rental properties or land value',
        'Brokers and lenders requiring lender-ready, defensible reports'
      ]
    },
    {
      id: 2,
      name: 'Atkinson & Associates',
      title: 'Residential & Commercial Appraisers',
      website: 'https://www.atkinsonappraisals.com',
      phone: '403-212-1103',
      location: '5920 Macleod Trail S, Suite 204, Calgary AB T2H 0K2',
      recommendation: 'Atkinson & Associates provides detailed residential and commercial appraisals for financing, estate matters, divorce, corporate decisions, tax issues, and litigation. Their work is known for clear methodology, thorough documentation, and consistency with lender standards.',
      services: ['Residential Appraisals', 'Commercial Appraisals', 'Legal Appraisals', 'Tax Assessment'],
      bestFor: [
        'Residential and commercial appraisals in one firm',
        'Financing, estate, divorce, and tax-related valuations',
        'Investors with mixed property portfolios'
      ]
    },
    {
      id: 3,
      name: 'Wernick Omura Singh',
      title: 'Real Estate Appraisal & Consulting Firm',
      website: 'https://www.wernickomura.com',
      phone: '403-291-4115',
      location: '101–1901 Centre Street NW, Calgary AB T2E 2S7',
      recommendation: 'Wernick Omura Singh is a long-established appraisal and consulting firm with over 30 years of experience in Calgary and Western Canada. Their services extend beyond standard appraisals to include consulting, feasibility studies, and advisory work.',
      services: ['Commercial Appraisals', 'Consulting Services', 'Feasibility Studies', 'Investment Advisory'],
      bestFor: [
        'Commercial and income-property appraisals',
        'Institutional, lender, and investor-grade valuation work',
        'Feasibility studies and advanced valuation consulting'
      ]
    }
  ];

  benefits = [
    'Accurate Financing',
    'Informed Negotiations', 
    'Tax Optimization',
    'Investment Analysis',
    'Legal Protection',
    'Lender Confidence'
  ];

  getBenefitDescription(benefit: string): string {
    const descriptions: { [key: string]: string } = {
      'Accurate Financing': 'Ensure proper loan amounts and avoid under- or over-valuation for mortgage approvals.',
      'Informed Negotiations': 'Use accurate appraisals to negotiate better purchase prices or refinancing terms.',
      'Tax Optimization': 'Get proper valuations for estate planning, property division, and tax assessments.',
      'Investment Analysis': 'Accurate valuations for ROI calculations, cap rates, and investment decisions.',
      'Legal Protection': 'Defensible appraisals that stand up in court for disputes, divorces, or settlements.',
      'Lender Confidence': 'Appraisals that meet strict bank and institutional lender requirements.'
    };
    return descriptions[benefit] || '';
  }

}
