import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Maintenance, repetition_unit } from '../services/interfaces/maintenance.interface';
import { environment } from '../../environments/environment';
import { PopupService } from './popup-service';
@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  http = inject(HttpClient);
  popupService = inject(PopupService);
  maintenance = signal<Maintenance[]>([]);
  selectedMaintenance = signal<Maintenance | null>(null);
  error = signal<string>('');

  private PATH = `${environment.PATHB}/api/maintenance`;

  constructor() {
    this.loadMaintenances();
  }

  loadMaintenances() {
    this.http.get<Maintenance[]>(this.PATH).subscribe({
      next: data => {
        this.maintenance.set(data);
      },
      error: err => {
        console.error('Failed to load maintenances', err);
        this.error.set(err.message);
      },
    });
  }

  loadMaintenance(id: string) {
    this.http.get<Maintenance>(`${this.PATH}/${id}`).subscribe({
      next: data => {
        this.selectedMaintenance.set(data);
      },
      error: err => {
        console.error('Failed to load single maintenance', err);
        this.error.set(err.message);
      },
    });
  }

  loadMaintenancesByCategory(category_id: string) {
    this.http.get<Maintenance[]>(`${this.PATH}/category/${category_id}`).subscribe({
      next: data => {
        this.maintenance.set(data);
      },
      error: err => {
        console.error('Failed to load maintenances', err);
        this.error.set(err.message);
      },
    });
  }

  addMaintenance(
    title: string,
    start_date: string,
    repetition_unit: repetition_unit,
    repetition_value: number,
    is_completed: boolean,
    category_id: string,
    notes?: string,
  ) {
    this.http
      .post<Maintenance>(this.PATH, {
        title,
        start_date,
        repetition_unit,
        repetition_value,
        is_completed,
        category_id,
        notes,
      })
      .subscribe({
        next: data => {
          this.maintenance.update(current => [...current, data]);
        },
        error: err => {
          console.error('Failed to add maintenance', err);
          this.error.set(err.message);
        },
        complete: () => {
          this.popupService.showPopup('Success', 'Added new maintenance!');
        },
      });
  }

  updateMaintenance(
    id: string,
    title: string,
    start_date: string,
    repetition_unit: string,
    repetition_value: number,
    is_completed: boolean,
    category_id: string,
    notes?: string,
  ) {
    this.http
      .put<Maintenance>(`${this.PATH}/${id}`, {
        title,
        category_id,
        start_date,
        repetition_unit,
        repetition_value,
        is_completed,
        notes,
      })
      .subscribe({
        next: data => {
          const maintenanceArray = this.maintenance();
          const updatedArray = maintenanceArray.map(item =>
            item.id === id ? { ...item, ...data } : item,
          );
          this.maintenance.set(updatedArray);
        },
        error: err => {
          console.error('Failed to update maintenance', err);
          this.error.set(err.message);
        },
        complete: () => {
          this.popupService.showPopup('Success', 'Updated maintenance!');
        },
      });
  }

  deleteMaintenance(id: string) {
    this.http.delete<{ message: string; data: Maintenance }>(`${this.PATH}/${id}`).subscribe({
      next: () => {
        this.maintenance.update(current => current.filter(item => item.id !== id));
      },
      error: err => {
        console.error('Failed while deleting maintenance', err);
        this.error.set(err.message);
        this.popupService.showPopup('Warning', 'Deleted maintenance!');
      },
    });
  }

  clear() {
    this.maintenance.set([]);
    this.selectedMaintenance.set(null);
    this.error.set('');
  }
}
