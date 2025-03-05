import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
// import { FooterComponent } from "../../layout/footer/footer.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  cities: any[] = [];
  bloodTypes: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cityId: [null, Validators.required],
      bloodTypeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCities();
    this.fetchBloodTypes();
  }

  fetchCities() {
    this.http.get('/api/cities').subscribe({
      next: (data: any) => this.cities = data,
      error: (err) => console.error('Failed to fetch cities', err)
    });
  }

  fetchBloodTypes() {
    this.http.get('/api/blood-types').subscribe({
      next: (data: any) => this.bloodTypes = data,
      error: (err) => console.error('Failed to fetch blood types', err)
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed. Please try again.');
        }
      });
    }
  }
}