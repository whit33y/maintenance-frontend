import { Injectable, signal } from '@angular/core';
import { PopupType } from './interfaces/popup.interface';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  visible = signal(false);
  type = signal<PopupType>('Success');
  description = signal('');

  showPopup(type: PopupType, description: string) {
    this.description.set(description);
    this.type.set(type);
    this.visible.set(true);
    setTimeout(() => {
      this.description.set('');
      this.type.set('Success');
      this.visible.set(false);
    }, 5000);
  }

  closePopup() {
    this.visible.set(false);
  }
}
