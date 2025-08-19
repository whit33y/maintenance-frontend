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
  constructor() {
    this.loadMaintenance();
  }

  loadMaintenance() {
    this.http.get<Maintenance[]>('http://localhost:8000/api/maintenance').subscribe({
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
    this.http.get<Maintenance>(`http://localhost:8000/api/maintenance/${id}`).subscribe({
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
    category: string,
    startDate: string,
    repeatInterval: string,
    reminderDaysBefore: number,
  ) {
    this.http
      .post<any>('http://localhost:8000/api/maintenance', {
        title,
        category,
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
}

type Maintenance = {
  id: string;
  title: string;
  category_id: string;
  start_date: string;
  repeat_interval: string;
  reminder_days_before: number;
  completed: boolean;
};
