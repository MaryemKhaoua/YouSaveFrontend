import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodService } from '../../services/blood.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bloodTypes: any[] = [];
  userCounts: { [key: string]: number } = {};

  constructor(private bloodService: BloodService) {}

  ngOnInit(): void {
    this.fetchBloodTypes();
    this.fetchUserCounts();
  }

  fetchBloodTypes(): void {
    this.bloodService.getBloodTypes().subscribe({
      next: (data) => {
        this.bloodTypes = data.map((blood) => ({
          ...blood,
          amount: this.userCounts[blood.type] || 0,
          status: this.getStatus(this.userCounts[blood.type] || 0)
        }));
      },
      error: (err) => console.error('Failed to fetch blood types', err)
    });
  }

  fetchUserCounts(): void {
    this.bloodService.getUserCountsByBloodType().subscribe({
      next: (counts) => {
        this.userCounts = counts;
        this.bloodTypes = this.bloodTypes.map((blood) => ({
          ...blood,
          amount: counts[blood.type] || 0,
          status: this.getStatus(counts[blood.type] || 0)
        }));
      },
      error: (err) => console.error('Failed to fetch user counts', err)
    });
  }

  getStatus(count: number): string {
    if (count > 5) return 'Available';
    if (count > 0 && count <= 5) return 'Low';
    return 'Unavailable';
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
