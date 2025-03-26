import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { BloodListComponent } from './components/blood/blood-list/blood-list.component';
import { HomeComponent } from './components/home/home.component';
import { CitiesComponent } from './components/cities/cities.component';
import { PostsComponent } from './components/posts/posts.component';
import { DonorComponent } from './components/donor/donor.component';
import { SensabilisationComponent } from './components/sensabilisation/sensabilisation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'blood', component: BloodListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'cities', component: CitiesComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'posts', component: PostsComponent },
  { path: 'donor', component: DonorComponent },
  { path: 'sensabilisation', component: SensabilisationComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'users', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: '**', redirectTo: '/home' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};