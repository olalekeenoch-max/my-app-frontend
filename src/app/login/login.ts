import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

 onLogin() {
    const body = { email: this.email, password: this.password };

    this.http.post<{ token: string }>('https://my-app-backend-kesa.onrender.com/api/auth/login', body)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);

          // Decode the token to get userId
          const payload = JSON.parse(atob(response.token.split('.')[1]));
          const userId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          localStorage.setItem('userId', userId);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Invalid email or password');
        }
      });
  }
  goToRegister() {
  this.router.navigate(['/register']);
}
}