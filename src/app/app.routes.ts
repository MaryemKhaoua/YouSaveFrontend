import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { BloodListComponent } from './components/blood/blood-list/blood-list.component';
import { BloodFormComponent } from './components/blood/blood-form/blood-form.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'blood', component: BloodListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'blood/new', component: BloodFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'blood/edit/:id', component: BloodFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];