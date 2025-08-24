import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(AuthService);
  private router = inject(Router);

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
