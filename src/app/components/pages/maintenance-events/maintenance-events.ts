import { Component, inject, OnInit } from '@angular/core';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { ActivatedRoute } from '@angular/router';
import { Header } from '../../layout/header/header';

@Component({
  selector: 'app-maintenance-events',
  imports: [Header],
  templateUrl: './maintenance-events.html',
  styleUrl: './maintenance-events.css',
})
export class MaintenanceEvents implements OnInit {
  maintenanceEventsService = inject(MaintenanceEventsService);
  route = inject(ActivatedRoute);

  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.maintenanceEventsService.loadMaintenanceEvents(this.id);
    console.log(this.maintenanceEventsService.maintenanceEvents());
  }
}
