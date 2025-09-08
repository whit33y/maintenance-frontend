import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupType } from '../../../services/popup-service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  @Input() type: PopupType = 'Success';
  @Input() description = '';
  @Input() visible = false;
  @Output() closePopup = new EventEmitter<boolean>();
}
