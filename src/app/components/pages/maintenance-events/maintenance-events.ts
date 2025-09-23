import { Component, inject, OnInit } from '@angular/core';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../layout/header/header';
import { MaintenanceService } from '../../../services/maintenance-service';
import { Select } from '../../elements/select/select';
import { Table } from '../../elements/table/table';
import { AddForm } from '../../elements/add-form/add-form';
import { FormConfig } from '../../elements/add-form/config/form.types';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-maintenance-events',
  imports: [Header, Select, Table, AddForm],
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

  maintenanceFormConfig: FormConfig[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      validators: [Validators.required, Validators.maxLength(255)],
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
    },
  ];
  showEditForm = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maintenanceFormData: any;
  toggleEditEvent() {
    this.showEditForm = !this.showEditForm;
    this.maintenanceFormData = {
      title: this.maintenanceService.selectedMaintenance()?.title,
      notes: this.maintenanceService.selectedMaintenance()?.notes,
    };
  }

  updateMaintenance(event: { title: string; notes?: string }) {
    this.maintenanceService.updateMaintenance(
      this.maintenanceService.selectedMaintenance()!.id,
      event.title,
      this.maintenanceService.selectedMaintenance()!.start_date,
      this.maintenanceService.selectedMaintenance()!.repetition_unit,
      this.maintenanceService.selectedMaintenance()!.repetition_value,
      this.maintenanceService.selectedMaintenance()!.is_completed,
      this.maintenanceService.selectedMaintenance()!.category_id,
      event.notes,
    );
    this.back();
  }
}
