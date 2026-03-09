import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-privacy.component',
  imports: [],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
})
export class PrivacyComponent implements AfterViewInit{
ngAfterViewInit() {
    // Добавляем анимации для важных заметок
    this.animateImportantNotes();
  }
  
  private animateImportantNotes() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    
    // Наблюдаем за важными заметками
    document.querySelectorAll('.info-box, .do-not-box, .warning-box, .security-box, .rights-box, .contact-box, .callout-box').forEach(note => {
      const htmlNote = note as HTMLElement;
      htmlNote.style.opacity = '0.9';
      htmlNote.style.transform = 'translateY(10px)';
      htmlNote.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      observer.observe(note);
    });
  }
}
