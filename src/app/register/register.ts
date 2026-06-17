import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const body = { email: this.email, password: this.password };

    this.http.post('https://localhost:44349/api/auth/register', body, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage = err.error || 'Registration failed';
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
