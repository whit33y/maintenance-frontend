import { Component, inject } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { RemindersService } from '../../../services/reminders-service';

@Component({
  selector: 'app-maintenance',
  imports: [],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  maintenanceService = inject(MaintenanceService);
  maintenanceEventsService = inject(MaintenanceEventsService);
  remindersService = inject(RemindersService);
}
