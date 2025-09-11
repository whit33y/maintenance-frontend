import { Component, inject } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { RemindersService } from '../../../services/reminders-service';
import { Header } from '../../layout/header/header';
import { Table } from '../../elements/table/table';
import { Tabs } from '../../elements/tabs/tabs';
import { Select } from '../../elements/select/select';

@Component({
  selector: 'app-maintenance',
  imports: [Header, Table, Tabs, Select],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  maintenanceService = inject(MaintenanceService);
  maintenanceEventsService = inject(MaintenanceEventsService);
  remindersService = inject(RemindersService);
  selectedTab = 0;
  selectedOption: string | number | undefined;

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  onOptionChange(value: string | number) {
    this.selectedOption = value;
  }
}
