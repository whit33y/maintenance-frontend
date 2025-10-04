import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from './interfaces/auth.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private PATH = `${environment.PATHB}/api/auth`;

  login(email: string, password: string) {
    return this.http
      .post<{ token: string; user: User }>(`${this.PATH}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        }),
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.PATH}/register`, { name, email, password });
  }

  deleteAccount(password: string) {
    const options = {
      body: { password: password },
    };
    return this.http.delete<{ message: string }>(`${this.PATH}`, options);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.http.patch(`${this.PATH}/change-password`, { oldPassword, newPassword });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
