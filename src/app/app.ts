import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router) {}

  showSidebar(): boolean {
    const noSidebarRoutes = ['/', '/register'];
    return !noSidebarRoutes.includes(this.router.url);
  }
}