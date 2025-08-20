import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaintenanceService } from './services/maintenance-service';
import { CategoriesService } from './services/categories-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'frontend';
  maintenanceService = inject(MaintenanceService);
  categoriesService = inject(CategoriesService);

  constructor() {
    this.maintenanceService.loadSingleMaintenance('bda2c6e6-79b8-43d8-8a82-22b3ec88d947');
    this.categoriesService.loadCategory('22a739fb-92c0-484f-87d1-b5a5e255188e');
  }

  ngOnInit() {
    // this.maintenanceService.deleteMaintenance('b89be399-bb08-476e-81b4-3619364865ad');
  }
}
