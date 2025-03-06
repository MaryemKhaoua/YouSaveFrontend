import { Component, OnInit } from '@angular/core';
import { BloodService } from '../../../services/blood.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-blood-list',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './blood-list.component.html',
  styleUrls: ['./blood-list.component.css']
})
export class BloodListComponent implements OnInit {
  bloodTypes: any[] = [];

  constructor(private bloodService: BloodService) {}

  ngOnInit(): void {
    this.fetchBloodTypes();
  }

  fetchBloodTypes(): void {
    this.bloodService.getBloodTypes().subscribe({
      next: (data) => this.bloodTypes = data,
      error: (err) => console.error('Failed to fetch blood types', err)
    });
  }

  deleteBloodType(id: number): void {
    if (confirm('Are you sure you want to delete this blood type?')) {
      this.bloodService.deleteBloodType(id).subscribe({
        next: () => this.fetchBloodTypes(),
        error: (err) => console.error('Failed to delete blood type', err)
      });
    }
  }
}