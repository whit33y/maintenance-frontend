import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input() description = 'Select option';
  @Input() options: { name: string; value: string | number }[] = [];
  @Output() optionChange = new EventEmitter<string | number>();

  selectOption(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.optionChange.emit(value);
  }
}
