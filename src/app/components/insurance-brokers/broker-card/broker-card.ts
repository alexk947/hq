import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Broker {
  name: string;
  title: string;
  website: string;
  phone: string;
  address: string;
  recommendation: string;
  coverageAreas?: string[];
  bestFor: string[];
}

@Component({
  selector: 'app-broker-card',
  imports: [CommonModule],
  templateUrl: './broker-card.html',
  styleUrl: './broker-card.scss',
})
export class BrokerCardComponent {
  @Input() broker!: Broker;
  @Input() showDivider: boolean = true;
}
