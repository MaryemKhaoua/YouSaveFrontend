  import { Routes } from '@angular/router';
  import { RegisterComponent } from './auth/register/register.component';
  import { LoginComponent } from './auth/login/login.component';
  import { DashboardComponent } from './components/dashboard/dashboard.component';
  import { AuthGuard } from './guards/auth.guard';
  import { BloodListComponent } from './components/blood/blood-list/blood-list.component';
  import { BloodFormComponent } from './components/blood/blood-form/blood-form.component';
  import { HomeComponent } from './components/home/home.component';
  import { CitiesComponent } from './components/cities/cities.component';
  import { PostsComponent } from './components/posts/posts.component';

  export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'blood', component: BloodListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'blood/new', component: BloodFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'blood/edit/:id', component: BloodFormComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'cities', component: CitiesComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
    { path: 'posts', component: PostsComponent},


    { path: '**', redirectTo: '/home' }
  ];