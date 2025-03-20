import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('role', response.role);
        this.loggedIn.next(true);
      })
    );  
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (token) {
        this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
}


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getRoleFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      // console.log('my Token:', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log('Token Payload:', payload);
      const firstname = payload.firstname;
      const lastname = payload.lastname;
      // console.log('First Name:', firstname);
      // console.log('Last Name:', lastname);
      return `${firstname} ${lastname}`;
    }
    return null;
  }
}