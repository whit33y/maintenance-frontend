import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm {
  isLoginForm = true;
  private authService = inject(AuthService);

  authForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  toggleFormMode() {
    this.isLoginForm = !this.isLoginForm;

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
          console.log('✅ Zalogowano!');
        },
        error: err => {
          console.error('❌ Błąd logowania', err);
        },
      });
    } else {
      this.authService.register(username!, email!, password!).subscribe({
        next: () => {
          console.log('✅ Konto utworzone!');
        },
        error: err => {
          console.error('❌ Błąd rejestracji', err);
        },
      });
    }
  }
}
