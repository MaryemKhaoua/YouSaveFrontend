import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  cities: any[] = [];
  bloodTypes: any[] = [];
  isLoading = false;
  currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cityId: [null, Validators.required],
      bloodTypeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCities();
    this.fetchBloodTypes();
    this.fetchCurrentUser();
  }

  fetchCities() {
    this.http.get('/api/cities/all').subscribe({
      next: (data: any) => this.cities = data,
      error: (err) => console.error('Failed to fetch cities', err)
    });
  }

  fetchBloodTypes() {
    this.http.get('/api/blood-types/all').subscribe({
      next: (data: any) => this.bloodTypes = data,
      error: (err) => console.error('Failed to fetch blood types', err)
    });
  }

  fetchCurrentUser() {
    this.isLoading = true;
    const token = this.authService.getToken();

    if (!token) {
      console.warn('No token found');
      this.isLoading = false;
      return;
    }

    const userId = this.getUserIdFromToken(token);
    if (!userId) {
      console.warn('No user ID found in token');
      this.isLoading = false;
      return;
    }

    const citiesRequest = this.http.get<any[]>('/api/cities/all');
    const bloodTypesRequest = this.http.get<any[]>('/api/blood-types/all');
    const userRequest = this.http.get<any>(`/api/users/${userId}`);

    forkJoin([citiesRequest, bloodTypesRequest, userRequest]).subscribe({
      next: (responses) => {
        const [cities, bloodTypes, user] = responses;
        this.cities = cities;
        this.bloodTypes = bloodTypes;
        this.currentUser = user;
        this.setFormValues(user, cities, bloodTypes);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch data:', err);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load profile data',
          confirmButtonColor: '#8A0707'
        });
      }
    });
  }

  private setFormValues(user: any, cities: any[], bloodTypes: any[]) {
    const city = cities.find(c => c.name === user.cityName);
    const bloodType = bloodTypes.find(b => b.type === user.bloodTypeName);

    this.profileForm.patchValue({
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
      cityId: city?.id || null,
      bloodTypeId: bloodType?.id || null
    });
  }

  getUserIdFromToken(token: string | null): string | null {
    if (!token) {
      console.warn('No token provided');
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      if (!payload.userId) {
        console.warn('No userId found in token payload');
      }
      return payload.userId || null;
    } catch (error) {
      console.error('Token decoding error:', error);
      return null;
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const token = this.authService.getToken();
      const userId = token ? this.getUserIdFromToken(token) : null;

      if (userId) {
        const formData = {...this.profileForm.value};
        if (!formData.password) {
          delete formData.password;
        }

        this.userService.updateUser(Number(userId), formData).subscribe({
          next: () => {
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Profile updated successfully',
              confirmButtonColor: '#8A0707'
            });
          },
          error: (err) => {
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update profile',
              confirmButtonColor: '#8A0707'
            });
            console.error('Update error:', err);
          }
        });
      }
    }
  }
}
