import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Rates } from '../../components/rates/rates';
import { Categories } from '../../components/categories/categories';
import { BlogComponent } from '../../components/blog/blog.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Hero, Rates, Categories, BlogComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
}
