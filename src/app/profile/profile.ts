import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  email = '';
  role = '';
  newEmail = '';
  successMessage = '';
  errorMessage = '';
  userId = parseInt(localStorage.getItem('userId') || '1');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get<any>(`https://localhost:44349/api/profile/${this.userId}`)
      .subscribe({
        next: (profile) => {
          this.email = profile.email;
          this.role = profile.role;
          this.newEmail = profile.email;
        },
        error: (err) => console.log('Error loading profile', err)
      });
  }

  updateProfile() {
    const body = { email: this.newEmail };

    this.http.put(`https://localhost:44349/api/profile/${this.userId}`, body, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.email = this.newEmail;
          this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = 'Failed to update profile';
          this.successMessage = '';
        }
      });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}