import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoginForm = true;
  errorMessage = ' ';

  authForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  toggleFormMode() {
    this.isLoginForm = !this.isLoginForm;
    this.errorMessage = '';
    this.authForm.reset({
      username: '',
      email: '',
      password: '',
    });

    if (this.isLoginForm) {
      this.authForm.get('username')?.disable();
      this.authForm.get('username')?.clearValidators();
    } else {
      this.authForm.get('username')?.enable();
      this.authForm.get('username')?.setValidators([Validators.required, Validators.minLength(3)]);
    }
    this.authForm.get('username')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { username, email, password } = this.authForm.value;

    if (this.isLoginForm) {
      this.authService.login(email!, password!).subscribe({
        next: () => {
          console.log('User logged in');
          this.router.navigate(['/maintenance']);
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.error('Failed to log in!', err);
        },
      });
    } else {
      this.authService.register(username!, email!, password!).subscribe({
        next: () => {
          console.log('Account created!');
          this.toggleFormMode();
        },
        error: err => {
          this.errorMessage = err.error.message;
          console.error('Failed to register!', err);
        },
      });
    }
  }
}
