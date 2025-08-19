import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaintenanceService } from './services/maintenance';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
  maintenanceService = inject(MaintenanceService);

  constructor() {
    effect(() => {
      console.log(this.maintenanceService.maintenance());
    });
  }
}
