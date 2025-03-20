import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../layout/navbar/navbar.component";

interface UserBasicInfo {
  name: string;
  city: string;
  bloodType: string;
  phone: string;
}

@Component({
  selector: 'app-donor',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './donor.component.html',
  styleUrl: './donor.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonorComponent implements OnInit {
  users: UserBasicInfo[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<UserBasicInfo[]>('/api/users/basic-info').subscribe({
      next: (data: UserBasicInfo[]) => this.users = data,
      error: (err) => console.error('Failed to fetch users', err)
    });
  }
}