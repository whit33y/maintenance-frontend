import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  http = inject(HttpClient);
  maintenance = signal<Maintenance[]>([]);

  constructor() {
    this.loadMaintenance();
  }

  private loadMaintenance() {
    this.http.get<Maintenance[]>('http://localhost:8000/api/maintenance').subscribe({
      next: data => this.maintenance.set(data),
      error: err => console.error('Failed to load maintenance', err),
    });
  }
}

type Maintenance = {
  id: string;
  title: string;
  category_id: string;
  start_date: string;
  repeat_interval: string;
  reminder_days_before: string;
  completed: boolean;
};
