import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface DashboardStats {
  userCount: number;
  cityCount: number;
  bloodTypeCount: number;
  bannedCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`).pipe(
      catchError((error) => {
        console.error('Failed to fetch dashboard stats', error);
        return of({ userCount: 0, cityCount: 0, bloodTypeCount: 0, bannedCount: 0 });
      })
    );
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/users/count`).pipe(
      catchError((error) => {
        console.error('Failed to fetch user count', error);
        return of(0);
      })
    );
  }
}