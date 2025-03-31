import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { DashboardService, DashboardStats } from '../../services/dashboard.service'
import { UserComponent } from "../users/users.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, FormsModule, UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardStats();
  }

  fetchDashboardStats(): void {
    // this.dashboardService.getDashboardStats().subscribe((stats: DashboardStats) => {
    //   this.totalUsers = stats.userCount;
    // });

    this.dashboardService.getUserCount().subscribe((count: number) => {
      this.totalUsers = count;
    });
  }
}
