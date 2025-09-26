import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupType } from '../../../services/interfaces/popup.interface';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.html',
  styleUrls: ['./popup.css'],
})
export class Popup {
  @Input() type: PopupType = 'Success';
  @Input() description = '';
  @Input() visible = false;
  @Output() closePopup = new EventEmitter<boolean>();

  get popupClasses(): string {
    switch (this.type) {
      case 'Success':
        return 'bg-green-100/80 border-green-500 text-green-800';
      case 'Warning':
        return 'bg-yellow-100/80 border-yellow-500 text-yellow-800';
      case 'Error':
        return 'bg-red-100/80 border-red-500 text-red-800';
      default:
        return 'bg-gray-100/80 border-gray-400 text-gray-700';
    }
  }
}
