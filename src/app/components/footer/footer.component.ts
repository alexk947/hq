import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class Footer {
  isMenuOpen = false;
  isMobileMenuOpen = false;
  
  constructor(private router: Router) {}

  // Закрытие меню при клике вне его области
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInsideNav = target.closest('.nav');
    const isClickInsideMenuBtn = target.closest('.mobile-menu-btn');
    
    if (!isClickInsideNav && !isClickInsideMenuBtn && this.isMenuOpen) {
      this.closeMenu();
    }
  }
  
  currentYear = new Date().getFullYear();
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  
  scrollToRates(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        this.scrollToSection('mortgage-rates');
      });
    } else {
      this.scrollToSection('mortgage-rates');
    }
  }

  scrollToFindTrusted(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        this.scrollToSection('find-trusted');
      });
    } else {
      this.scrollToSection('find-trusted');
    }
  }

  scrollToSmartGuides(event: Event) {
    event.preventDefault();
    this.closeMenu();
    
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        this.scrollToSection('smart-guides');
      });
    } else {
      this.scrollToSection('smart-guides');
    }
  }

  private scrollToSection(sectionId: string) {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = 96; // Высота хедера
        const sectionPosition = section.getBoundingClientRect().top;
        const offsetPosition = sectionPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}