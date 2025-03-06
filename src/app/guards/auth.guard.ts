import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const role = this.authService.getRoleFromToken();
  
    if (token && role) {
      if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
  
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}