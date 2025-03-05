import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    userCount: 0,
    cityCount: 0,
    bloodTypeCount: 0,
    bannedCount: 0
  };


  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchUserCount();
  }

  fetchUserCount(): void {
    this.dashboardService.getUserCount().subscribe({
      next: (count) => {
        console.log('User count fetched:', count);
        this.stats.userCount = count;
      },
      error: (err) => console.error('Failed to fetch user count', err)
    });
  }
} 