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
    console.log(id);
  }

  deleteEvent(id: string) {
    console.log(id);
  }

  editEvent(id: string) {
    console.log(id);
  }
}
