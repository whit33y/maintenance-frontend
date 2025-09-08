import { Component } from '@angular/core';
import { AuthForm } from '../../elements/auth-form/auth-form';

@Component({
  selector: 'app-authentication',
  imports: [AuthForm],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {}
