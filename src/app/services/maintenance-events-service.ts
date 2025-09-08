import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MaintenanceEvent } from './interfaces/maintenance-events.interface';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceEventsService {
  http = inject(HttpClient);
  maintenanceEvents = signal<MaintenanceEvent[]>([]);
  selectedMaintenanceEvent = signal<MaintenanceEvent | null>(null);
  error = signal<string>('');

  private PATH = 'http://localhost:8000/api/maintenance-events';

  loadMaintenanceEvents(maintenance_id: string, is_done?: string | number | undefined) {
    let params = new HttpParams();

    if (is_done !== undefined) {
      params = params.set('is_done', is_done);
    }

    this.http.get<MaintenanceEvent[]>(`${this.PATH}/${maintenance_id}`, { params }).subscribe({
      next: response => {
        this.maintenanceEvents.set(response);
      },
      error: err => {
        console.error('Failed to load maintenance events', err);
        this.error.set(err.message);
      },
    });
  }

  loadMaintenanceEvent(id: string, callback: (event: MaintenanceEvent) => void) {
    this.http.get<MaintenanceEvent>(`${this.PATH}/single/${id}`).subscribe({
      next: response => {
        this.selectedMaintenanceEvent.set(response);
        callback(response);
      },
      error: err => {
        console.error('Failed to load maintenance event', err);
        this.error.set(err.message);
      },
    });
  }

  addMaintenanceEvent(maintenance_id: string, completition_date?: string, notes?: string) {
    this.http
      .post<MaintenanceEvent>(this.PATH, {
        maintenance_id,
        completition_date,
        notes,
      })
      .subscribe({
        next: response => {
          this.maintenanceEvents.update(current => [...current, response]);
        },
        error: err => {
          console.error('Failed to add maintenance-event', err);
          this.error.set(err.message);
        },
      });
  }

  updateMaintenanceEvent(id: string, completition_date?: string | null, notes?: string) {
    this.http
      .put<MaintenanceEvent>(`${this.PATH}/${id}`, {
        completion_date: completition_date,
        notes: notes,
      })
      .subscribe({
        next: response => {
          this.maintenanceEvents.update(current =>
            current.map(event => (event.id === response.id ? response : event)),
          );
        },
        error: err => {
          console.error('Failed to update maintenance-event', err);
          this.error.set(err.message);
        },
      });
  }

  deleteMaintenanceEvent(id: string) {
    this.http.delete<{ message: string; data: MaintenanceEvent }>(`${this.PATH}/${id}`).subscribe({
      next: () => {
        this.maintenanceEvents.update(current => current.filter(item => item.id !== id));
      },
      error: err => {
        console.error('Failed while deleting maintenance event', err);
        this.error.set(err.message);
      },
    });
  }
}
