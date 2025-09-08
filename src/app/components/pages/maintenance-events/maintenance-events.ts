import { Component, inject, OnInit } from '@angular/core';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../layout/header/header';
import { MaintenanceService } from '../../../services/maintenance-service';
import { Select } from '../../elements/select/select';
import { Table } from '../../elements/table/table';

@Component({
  selector: 'app-maintenance-events',
  imports: [Header, Select, Table],
  templateUrl: './maintenance-events.html',
  styleUrl: './maintenance-events.css',
})
export class MaintenanceEvents implements OnInit {
  maintenanceEventsService = inject(MaintenanceEventsService);
  maintenanceService = inject(MaintenanceService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.maintenanceEventsService.loadMaintenanceEvents(this.id);
    this.maintenanceService.loadMaintenance(this.id);
  }

  selectedOption: string | number | undefined;
  onOptionChange(value: string | number | undefined) {
    this.selectedOption = value;
    if (this.selectedOption === 'All events') {
      this.maintenanceEventsService.loadMaintenanceEvents(this.id);
    } else {
      this.maintenanceEventsService.loadMaintenanceEvents(this.id, value);
    }
  }

  back() {
    this.router.navigate(['/maintenance']);
  }

  changeStatus(id: string) {
    const event_id = id;
    const nowIso = new Date().toISOString();

    this.maintenanceEventsService.loadMaintenanceEvent(event_id, event => {
      if (event?.completion_date) {
        this.maintenanceEventsService.updateMaintenanceEvent(event_id, null, undefined);
      } else {
        this.maintenanceEventsService.updateMaintenanceEvent(event_id, nowIso, undefined);
      }
    });
  }

  deleteEvent(id: string) {
    this.maintenanceService.deleteMaintenance(id);
    this.back();
  }

  editEvent(id: string) {
    console.log(id);
  }
}
