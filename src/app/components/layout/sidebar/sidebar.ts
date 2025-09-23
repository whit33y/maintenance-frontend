import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { RouterModule } from '@angular/router';
import { MaintenanceService } from '../../../services/maintenance-service';
import { CategoriesService } from '../../../services/categories-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authService = inject(AuthService);
  private maintenanceService = inject(MaintenanceService);
  private categoriesService = inject(CategoriesService);
  private maintenanceEventsService = inject(MaintenanceEventsService);

  logout() {
    this.categoriesService.clear();
    this.maintenanceEventsService.clear();
    this.maintenanceService.clear();
    this.authService.logout();
  }
}
