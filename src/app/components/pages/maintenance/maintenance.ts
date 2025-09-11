import { Component, inject } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { RemindersService } from '../../../services/reminders-service';
import { Header } from '../../layout/header/header';
import { Table } from '../../elements/table/table';

@Component({
  selector: 'app-maintenance',
  imports: [Header, Table],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  maintenanceService = inject(MaintenanceService);
  maintenanceEventsService = inject(MaintenanceEventsService);
  remindersService = inject(RemindersService);
}
