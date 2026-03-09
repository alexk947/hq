import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  route?: string;
}

@Component({
  selector: 'app-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, AfterViewInit {
  
  @ViewChild('smartGuides') ratesSection!: ElementRef;

  currentIndex = 0;
  chunkedPosts: BlogPost[][] = [];

  blogPosts: BlogPost[] = [
    {
      title: 'How to Choose a Realtor in Calgary',
      excerpt: 'Learn what to look for when selecting the right real estate professional...',
      image: '1766492905_694a8ae9f031b.png',
      category: 'Buying Guide',
      route: '/choose-realtor-guide'
    },
    {
      title: 'Best Mortgage Strategies in 2025',
      excerpt: 'Current market trends and smart financing approaches for home buyers...',
      image: '1766493030_694a8b660598d.png',
      category: 'Financing',
      route: '/mortgage-strategies'
    },
    {
      title: 'Legal Fees Explained',
      excerpt: 'Clear guidance on typical lawyer fees, closing costs, and what you’ll actually pay…',
      image: '1766493469_694a8d1d67a3a.png',
      category: 'Legal',
      route: '/legal-fees'
    },
    // Добавьте больше постов для слайдера 3x1 + 3x1
    {
      title: 'Mortgage Penalties Explained',
      excerpt: 'See how banks calculate penalties and what factors determine your final cost...',
      // image: 'photo-1560518883-ce09059eeffa.avif',
      image: '21rf Mortgage Penalties.png',
      category: 'Selling Guide',
      route: '/mortgage-penalties'
    },
    {
      title: 'Home Insurance Explained',
      excerpt: 'Learn how home insurance works, what it covers, and how to avoid costly gaps...',
      image: '22 rf Home Insurance.png',
      category: 'Investing',
      route: '/home-insurance'
    },
    {
      title: 'Rental Property Insurance Explained',
      excerpt: 'Understand landlord insurance, key protections, and what investors must include...',
      image: '1768221299_6964ea73030db.png',
      category: 'Buying Guide',
      route: '/landlord-insurance'
    },
    // Еще 3 поста для второго слайда
    // {
    //   title: 'Understanding Property Taxes',
    //   excerpt: 'Complete guide to property tax calculations and payment schedules...',
    //   image: 'photo-1554224155-6726b3ff858f.avif',
    //   category: 'Financing',
    //   route: '/property-taxes-guide'
    // },
    // {
    //   title: 'Negotiation Strategies for Buyers',
    //   excerpt: 'Expert tips on negotiating the best price for your dream home...',
    //   image: 'photo-1560518883-ce09059eeffa.avif',
    //   category: 'Buying Guide',
    //   route: '/negotiation-strategies'
    // },
    // {
    //   title: 'Real Estate Market Trends 2025',
    //   excerpt: 'Analysis of current market conditions and future predictions...',
    //   image: 'photo-1560520031-3a4dc4e9de0c.avif',
    //   category: 'Market',
    //   route: '/market-trends-2025'
    // }
  ];

  constructor() {}

  ngOnInit() {
    this.chunkBlogPosts();
  }

  chunkBlogPosts() {
    const size = 3; // 3 карточки на слайд
    this.chunkedPosts = [];

    for (let i = 0; i < this.blogPosts.length; i += size) {
      this.chunkedPosts.push(this.blogPosts.slice(i, i + size));
    }
  }

  nextSlide() {
    if (this.currentIndex < this.chunkedPosts.length - 1) {
      this.currentIndex++;
    } else {
      // Loop back to start
      this.currentIndex = 0;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      // Loop to end
      this.currentIndex = this.chunkedPosts.length - 1;
    }
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

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
    if (window.location.hash === '#smart-guides') {
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