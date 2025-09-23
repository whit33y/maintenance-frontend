import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Reminder } from './interfaces/reminders.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemindersService {
  http = inject(HttpClient);
  reminders = signal<Reminder[]>([]);
  selectedReminder = signal<Reminder | null>(null);
  error = signal<string>('');

  private PATH = `${environment.PATH}/api/reminders`;

  loadReminders(maintenance_id: string) {
    this.http.get<Reminder[]>(`${this.PATH}/maintenance/${maintenance_id}`).subscribe({
      next: response => {
        this.reminders.set(response);
      },
      error: err => {
        console.error('Failed to load reminders', err);
        this.error.set(err.message);
      },
    });
  }

  loadReminder(id: string) {
    this.http.get<Reminder>(`${this.PATH}/${id}`).subscribe({
      next: response => {
        this.selectedReminder.set(response);
      },
      error: err => {
        console.error('Failed to load reminder', err);
        this.error.set(err.message);
      },
    });
  }

  addReminder(maintenance_id: string, due_date: string) {
    this.http
      .post<Reminder>(this.PATH, {
        maintenance_id,
        due_date,
        is_sent: false,
      })
      .subscribe({
        next: response => {
          this.reminders.update(current => [...current, response]);
        },
        error: err => {
          console.error('Failed to add reminder', err);
          this.error.set(err.message);
        },
      });
  }

  updateReminder(id: string, maintenance_id: string, due_date: string, is_sent?: boolean) {
    this.http
      .post<Reminder>(`${this.PATH}/${id}`, {
        maintenance_id,
        due_date,
        is_sent,
      })
      .subscribe({
        next: response => {
          this.reminders.update(current => [...current, response]);
        },
        error: err => {
          console.error('Failed to update reminder', err);
          this.error.set(err.message);
        },
      });
  }

  deleteReminder(id: string) {
    this.http.delete<{ message: string; data: Reminder }>(`${this.PATH}/${id}`).subscribe({
      next: () => {
        this.reminders.update(current => current.filter(item => item.id !== id));
      },
      error: err => {
        console.error('Fail while deleting reminder', err);
        this.error.set(err.message);
      },
    });
  }
}
