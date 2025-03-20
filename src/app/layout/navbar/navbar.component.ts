import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  isAdmin: boolean = false;


  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getToken();
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.isAdmin = localStorage.getItem('userRole') === 'ADMIN';

    });
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('userRole');
  }
}