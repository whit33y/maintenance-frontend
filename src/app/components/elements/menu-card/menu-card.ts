import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-card',
  imports: [],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css',
})
export class MenuCard {
  @Input() title = 'All';
  @Input() quantity = 0;
}
