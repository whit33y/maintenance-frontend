import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css',
})
export class MenuCard {
  @Input() title: string = 'All';
  @Input() quantity: number = 0;
}
