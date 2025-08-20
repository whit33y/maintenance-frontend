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
    this.categoriesService.loadCategory('bf3529fe-a521-4543-bf99-dc2eed50602f');
  }

  ngOnInit() {
    // this.categoriesService.updateCategory(
    //   'eded2b99-add1-4f1d-bb49-7c1368568fc3',
    //   'Rachunki',
    //   false,
    //   '13bd193e-7ce9-11f0-8098-cdbd4d4884be',
    // );
  }
}
