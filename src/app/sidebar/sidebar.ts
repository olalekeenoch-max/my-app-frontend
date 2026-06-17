import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
