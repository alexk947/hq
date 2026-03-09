import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

export interface Rate {
  type: string;
  value: string;
}

@Component({
  selector: 'app-rates',
  imports: [CommonModule],
  templateUrl: './rates.html',
  styleUrl: './rates.scss',
})
export class Rates implements AfterViewInit{

  @ViewChild('ratesSection') ratesSection!: ElementRef;

rates: Rate[] = [
    { type: '5yr Fixed', value: '3.99%' },
    { type: '3yr Fixed', value: '3.75%' },
    { type: '5-Year Variable', value: '3.65%' }
  ];


  // Обработчик якорных ссылок
  @HostListener('window:hashchange', ['$event'])
  onHashChange(event: HashChangeEvent) {
    this.scrollToHash();
  }

  ngAfterViewInit() {
    // Проверяем хэш при загрузке компонента
    setTimeout(() => {
      this.scrollToHash();
    }, 100);
  }

  private scrollToHash() {
    if (window.location.hash === '#mortgage-rates') {
      this.scrollToSection();
    }
  }

  scrollToSection() {
    if (this.ratesSection) {
      this.ratesSection.nativeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

}
