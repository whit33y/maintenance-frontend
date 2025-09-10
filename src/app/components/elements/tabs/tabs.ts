import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './tabs.html',
  styleUrls: ['./tabs.css'],
})
export class Tabs {
  @Input() tabs: string[] = [];
  @Input() activeIndex = 0;
  @Output() tabChange = new EventEmitter<number>();

  selectTab(index: number) {
    this.activeIndex = index;
    this.tabChange.emit(index);
  }
}
