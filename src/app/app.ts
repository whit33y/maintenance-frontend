import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaintenanceService } from './services/maintenance-service';

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
    this.maintenanceService.loadSingleMaintenance('bda2c6e6-79b8-43d8-8a82-22b3ec88d947');
  }

  ngOnInit() {
    // this.maintenanceService.addMaintenance(
    //   'Wymienić filtr wody',
    //   'bf3529fe-a521-4543-bf99-dc2eed50602f',
    //   '2025-08-24',
    //   '1 month',
    //   7,
    // );
  }
}
