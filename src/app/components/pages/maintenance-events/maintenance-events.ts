import { Component, inject, OnInit } from '@angular/core';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../../layout/header/header';
import { MaintenanceService } from '../../../services/maintenance-service';
import { Select } from '../../elements/select/select';
import { Table } from '../../elements/table/table';
import { AddForm, maintenanceEventFormData } from '../../elements/add-form/add-form';
import { maintenanceForm } from './maintenance-events-form.config';
import { ConfirmDialog } from '../../elements/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-maintenance-events',
  imports: [Header, Select, Table, AddForm, ConfirmDialog],
  templateUrl: './maintenance-events.html',
  styleUrl: './maintenance-events.css',
})
export class MaintenanceEvents implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  maintenanceEventsService = inject(MaintenanceEventsService);
  maintenanceService = inject(MaintenanceService);

  showEditForm = false;
  showDeleteDialog = false;
  maintenanceFormData: maintenanceEventFormData = { title: '' };
  maintenanceFormConfig = maintenanceForm;
  id!: string;
  selectedOption: string | number | undefined;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.maintenanceEventsService.loadMaintenanceEvents(this.id);
    this.maintenanceService.loadMaintenance(this.id);
  }

  onOptionChange(value: string | number | undefined) {
    this.selectedOption = value;
    if (this.selectedOption === 'All events') {
      this.maintenanceEventsService.loadMaintenanceEvents(this.id);
    } else {
      this.maintenanceEventsService.loadMaintenanceEvents(this.id, value);
    }
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

  deleteMaintenance(id: string) {
    this.maintenanceService.deleteMaintenance(id);
    this.back();
  }

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

  back() {
    this.router.navigate(['/maintenance']);
  }

  toggleDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }
}
