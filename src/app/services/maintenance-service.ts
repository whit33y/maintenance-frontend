import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  http = inject(HttpClient);
  maintenance = signal<Maintenance[]>([]);
  selectedMaintenance = signal<Maintenance | null>(null);
  error = signal<string>('');

  private PATH = 'http://localhost:8000/api/maintenance';

  constructor() {
    this.loadMaintenance();
  }

  loadMaintenance() {
    this.http.get<Maintenance[]>(this.PATH).subscribe({
      next: data => {
        this.maintenance.set(data);
      },
      error: err => {
        console.error('Failed to load maintenances', err);
        this.error.set(err.message);
      },
      complete: () => {
        console.log('Maintances loaded', this.maintenance());
      },
    });
  }

  loadSingleMaintenance(id: string) {
    this.http.get<Maintenance>(`${this.PATH}/${id}`).subscribe({
      next: data => {
        this.selectedMaintenance.set(data);
      },
      error: err => {
        console.error('Failed to load single maintenance', err);
        this.error.set(err.message);
      },
      complete: () => {
        console.log('Single maintenance loaded', this.selectedMaintenance());
      },
    });
  }

  addMaintenance(
    title: string,
    categoryId: string,
    startDate: string,
    repeatInterval: string,
    reminderDaysBefore: number,
  ) {
    this.http
      .post<Maintenance>(this.PATH, {
        title,
        categoryId,
        startDate,
        repeatInterval,
        reminderDaysBefore,
      })
      .subscribe({
        next: data => {
          console.log('Maintenance added:', data);
          this.maintenance.update(current => [...current, data]);
        },
        error: err => {
          console.error('Failed to add maintenance', err);
          this.error.set(err.message);
        },
      });
  }

  updateMaintenance(
    id: string,
    title: string,
    categoryId: string,
    startDate: string,
    repeatInterval: string,
    reminderDaysBefore: number,
    completed: boolean,
  ) {
    this.http
      .put<Maintenance>(`${this.PATH}/${id}`, {
        title,
        categoryId,
        startDate,
        repeatInterval,
        reminderDaysBefore,
        completed,
      })
      .subscribe({
        next: data => {
          console.log('Maintenance updated:', data);
          let maintenanceArray = this.maintenance();
          let updatedArray = maintenanceArray.map(item =>
            item.id === id ? { ...item, ...data } : item,
          );
          this.maintenance.set(updatedArray);
        },
        error: err => {
          console.error('Failed to update maintenance', err);
          this.error.set(err.message);
        },
      });
  }

  deleteMaintenance(id: string) {
    this.http
      .delete<{ message: string; maintenance: Maintenance }>(`${this.PATH}/${id}`)
      .subscribe({
        next: data => {
          console.log(data);
          this.maintenance.update(current => current.filter(item => item.id !== id));
        },
        error: err => {
          console.error('Failed while deleting maintenance', err);
          this.error.set(err.message);
        },
      });
  }
}

type Maintenance = {
  id: string;
  title: string;
  category_id: string;
  start_date: string;
  repeat_interval: string;
  reminder_days_before: number;
  completed: boolean;
  user_id: string;
};
