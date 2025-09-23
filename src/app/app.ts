import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { Footer } from './components/layout/footer/footer';
import { Popup } from './components/elements/popup/popup';
import { PopupService } from './services/popup-service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Footer, Popup],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Maintenance App';
  router = inject(Router);
  popupService = inject(PopupService);
  get isAuthPage(): boolean {
    return this.router.url.startsWith('/authentication');
  }

  closePopup() {
    this.popupService.closePopup();
  }
}
