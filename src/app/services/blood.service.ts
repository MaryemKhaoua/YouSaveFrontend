import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BloodType } from '../models/blood-type.model';

@Injectable({
  providedIn: 'root'
})
export class BloodService {
  private apiUrl = '/api/blood-types';
  private userCountsUrl = '/api/blood-types/user-counts';


  constructor(private http: HttpClient) {}

  getBloodTypes(): Observable<BloodType[]> {
    return this.http.get<BloodType[]>(`${this.apiUrl}/all`);
  }

  getBloodTypeById(id: number): Observable<BloodType> {
    return this.http.get<BloodType>(`${this.apiUrl}/${id}`);
  }

  addBloodType(bloodType: BloodType): Observable<BloodType> {
    return this.http.post<BloodType>(this.apiUrl, bloodType);
  }

  updateBloodType(id: number, bloodType: BloodType): Observable<BloodType> {
    return this.http.put<BloodType>(`${this.apiUrl}/${id}`, bloodType);
  }

  deleteBloodType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getUserCountsByBloodType(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(this.userCountsUrl);
  }
}
