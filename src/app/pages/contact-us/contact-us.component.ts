import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface TradeOption { value: string; label: string; category: string; }

@Component({
  selector: 'app-contact-us.component',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;
  referenceId = '';
  showTradeCategory = false;
  showSpecificTrade = false;
  filteredTrades: TradeOption[] = [];
  
  trades: TradeOption[] = [
    { value: 'appliance-repair', label: 'Appliance Repair Technician', category: 'A' },
    { value: 'asbestos-abatement', label: 'Asbestos Abatement Contractor', category: 'A' },
    { value: 'asphalt-contractor', label: 'Asphalt Contractor', category: 'A' },
    { value: 'av-installer', label: 'Audio-Visual / Home Theatre Installer', category: 'A' },
    { value: 'basement-contractor', label: 'Basement Development Contractor', category: 'B' },
    { value: 'bricklayer', label: 'Bricklayer / Mason', category: 'B' },
    { value: 'building-envelope', label: 'Building Envelope Specialist', category: 'B' },
    { value: 'cabinet-maker', label: 'Cabinet Maker', category: 'C' },
    { value: 'carpet-installer', label: 'Carpet Installer', category: 'C' },
    { value: 'caulking-contractor', label: 'Caulking & Sealing Contractor', category: 'C' },
    { value: 'chimney-sweep', label: 'Chimney Sweep / Repair', category: 'C' },
    { value: 'concrete-contractor', label: 'Concrete Contractor', category: 'C' },
    { value: 'countertop-installer', label: 'Countertop Installer', category: 'C' },
    { value: 'crawl-space-specialist', label: 'Crawl Space Specialist', category: 'C' },
    { value: 'deck-builder', label: 'Deck Builder', category: 'D' },
    { value: 'demolition-contractor', label: 'Demolition Contractor', category: 'D' },
    { value: 'drain-cleaning', label: 'Drain Cleaning / Sewer Contractor', category: 'D' },
    { value: 'drywall-installer', label: 'Drywall Installer / Taper', category: 'D' },
    { value: 'electrician', label: 'Electrician', category: 'E' },
    { value: 'energy-consultant', label: 'Energy Efficiency Consultant', category: 'E' },
    { value: 'eavestrough-installer', label: 'Eavestrough Installer', category: 'E' },
    { value: 'fence-builder', label: 'Fence Builder', category: 'F' },
    { value: 'fire-restoration', label: 'Fire & Smoke Restoration Contractor', category: 'F' },
    { value: 'flooring-installer', label: 'Flooring Installer (Hardwood, Vinyl, Laminate, Tile)', category: 'F' },
    { value: 'foundation-repair', label: 'Foundation Repair Specialist', category: 'F' },
    { value: 'furnace-technician', label: 'Furnace Technician', category: 'F' },
    { value: 'garage-builder', label: 'Garage Builder', category: 'G' },
    { value: 'garage-door-installer', label: 'Garage Door Installer / Repair', category: 'G' },
    { value: 'gas-fitter', label: 'Gas Fitter', category: 'G' },
    { value: 'general-contractor', label: 'General Contractor', category: 'G' },
    { value: 'glass-glazier', label: 'Glass / Glazier', category: 'G' },
    { value: 'handyman', label: 'Handyman', category: 'H' },
    { value: 'hvac-technician', label: 'Heating & Cooling (HVAC) Technician', category: 'H' },
    { value: 'home-automation', label: 'Home Automation Technician', category: 'H' },
    { value: 'home-inspector', label: 'Home Inspector', category: 'H' },
    { value: 'insulation-installer', label: 'Insulation Installer', category: 'I' },
    { value: 'irrigation-contractor', label: 'Irrigation / Sprinkler Contractor', category: 'I' },
    { value: 'junk-removal', label: 'Junk Removal Service', category: 'J' },
    { value: 'kitchen-renovation', label: 'Kitchen Renovation Contractor', category: 'K' },
    { value: 'landscape-designer', label: 'Landscape Designer', category: 'L' },
    { value: 'landscaper', label: 'Landscaper', category: 'L' },
    { value: 'lawn-care', label: 'Lawn Care & Snow Removal', category: 'L' },
    { value: 'locksmith', label: 'Locksmith', category: 'L' },
    { value: 'masonry-contractor', label: 'Masonry Contractor', category: 'M' },
    { value: 'millwork-installer', label: 'Millwork Installer', category: 'M' },
    { value: 'mold-remediation', label: 'Mold Remediation Specialist', category: 'M' },
    { value: 'outdoor-lighting', label: 'Outdoor Lighting Installer', category: 'O' },
    { value: 'painter', label: 'Painter', category: 'P' },
    { value: 'pest-control', label: 'Pest Control Technician', category: 'P' },
    { value: 'plasterer', label: 'Plasterer', category: 'P' },
    { value: 'plumber', label: 'Plumber', category: 'P' },
    { value: 'pool-technician', label: 'Pool & Hot Tub Technician', category: 'P' },
    { value: 'radon-mitigation', label: 'Radon Mitigation Specialist', category: 'R' },
    { value: 'appliance-installer', label: 'Refrigerator / Appliance Installer', category: 'R' },
    { value: 'restoration-contractor', label: 'Restoration Contractor (Water / Fire / Mold)', category: 'R' },
    { value: 'roof-inspector', label: 'Roof Inspector', category: 'R' },
    { value: 'roofer', label: 'Roofer', category: 'R' },
    { value: 'siding-installer', label: 'Siding Installer', category: 'S' },
    { value: 'smart-home-installer', label: 'Smart Home Installer', category: 'S' },
    { value: 'snow-removal', label: 'Snow Removal Contractor', category: 'S' },
    { value: 'solar-panel-installer', label: 'Solar Panel Installer', category: 'S' },
    { value: 'soundproofing-contractor', label: 'Soundproofing Contractor', category: 'S' },
    { value: 'stone-installer', label: 'Stone Installer', category: 'S' },
    { value: 'structural-repair', label: 'Structural Repair Contractor', category: 'S' },
    { value: 'tiler', label: 'Tiler', category: 'T' },
    { value: 'tree-service', label: 'Tree Service / Arborist', category: 'T' },
    { value: 'upholstery-cleaner', label: 'Upholstery Cleaner', category: 'U' },
    { value: 'ventilation-contractor', label: 'Ventilation Contractor', category: 'V' },
    { value: 'waste-rental', label: 'Waste & Bin Rental Service', category: 'W' },
    { value: 'water-damage', label: 'Water Damage Restoration', category: 'W' },
    { value: 'water-filtration', label: 'Water Filtration / Softener Installer', category: 'W' },
    { value: 'water-heater', label: 'Water Heater / Hot Water Tank Technician', category: 'W' },
    { value: 'window-door-installer', label: 'Window & Door Installer', category: 'W' },
    { value: 'yard-maintenance', label: 'Yard Maintenance Contractor', category: 'Y' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      inquiryType: ['', [Validators.required]],
      tradeCategory: [''],
      specificTrade: [''],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      newsletter: [true],
      agreeTerms: [false, [Validators.requiredTrue]]
    });

     // Watch for inquiry type changes
    this.contactForm.get('inquiryType')?.valueChanges.subscribe(value => {
      this.showSpecificTrade = value === 'request-trades';
      
      if (!this.showSpecificTrade) {
        this.contactForm.get('specificTrade')?.setValue('');
      }
      
      // Update validators based on inquiry type
      this.updateTradeValidators();
    });
    
    
    
    this.contactForm.get('tradeCategory')?.valueChanges.subscribe(value => {
      if (value) {
        this.filteredTrades = this.trades.filter(trade => trade.category === value);
        this.showSpecificTrade = true;
      } else {
        this.showSpecificTrade = false;
        this.contactForm.get('specificTrade')?.setValue('');
      }
    });
  }

  onInquiryTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.showSpecificTrade = select.value === 'request-trades';
    
    if (!this.showSpecificTrade) {
      this.contactForm.get('specificTrade')?.setValue('');
    }
  }

  onTradeCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.showSpecificTrade = !!select.value;
    if (select.value) {
      this.filteredTrades = this.trades.filter(trade => trade.category === select.value);
    } else {
      this.filteredTrades = [];
    }
  }

  updateTradeValidators() {
    const specificTradeControl = this.contactForm.get('specificTrade');
    
    if (this.showSpecificTrade) {
      specificTradeControl?.setValidators([Validators.required]);
    } else {
      specificTradeControl?.clearValidators();
    }
    
    specificTradeControl?.updateValueAndValidity();
  }

   showError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

 onSubmit() {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.referenceId = 'HQI-' + Date.now().toString().slice(-8);
    
    setTimeout(() => {
      console.log('Form submitted:', this.contactForm.value);
      this.handleSuccess();
    }, 1500);
  }

 private handleSuccess() {
    this.isSuccess = true;
    this.isSubmitting = false;
  }

  private handleError() {
    this.isSubmitting = false;
    alert('There was an error sending your message. Please try again.');
  }

 resetForm() {
    this.isSuccess = false;
    this.showSpecificTrade = false;
    this.contactForm.reset({
      newsletter: true,
      agreeTerms: false
    });
  }
}