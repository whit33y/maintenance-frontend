import { Component, inject } from '@angular/core';
import { Header } from '../../layout/header/header';
import { AuthService } from '../../../services/auth-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [Header, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  authService = inject(AuthService);

  deletePopupActive = false;
  deleteError = '';
  errorChangePassword = '';
  deleteForm = new FormGroup({
    password: new FormControl('', Validators.required),
  });
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    retypePassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  deleteUser(password: string) {
    this.authService.deleteAccount(password).subscribe({
      error: error => {
        this.deleteError = error.error.message;
      },
      complete: () => {
        this.deletePopupActive = false;
        this.authService.logout();
      },
    });
  }

  changeActive() {
    this.deleteError = '';
    this.deletePopupActive = !this.deletePopupActive;
    this.deleteForm.setValue({ password: '' });
  }

  submitChangePassword(oldPassword: string, newPassword: string, retypePassword: string) {
    if (newPassword === retypePassword) {
      this.authService.changePassword(oldPassword, newPassword).subscribe({
        error: error => {
          this.errorChangePassword = error.error.message;
        },
        complete: () => {
          this.authService.logout();
        },
      });
    } else {
      this.errorChangePassword = 'New password and retyped password are not the same.';
    }
  }
}
