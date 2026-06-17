import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { DashboardComponent } from './dashboard/dashboard';
import { RegisterComponent  } from './register/register';
import { ProfileComponent } from './profile/profile';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent }
];
