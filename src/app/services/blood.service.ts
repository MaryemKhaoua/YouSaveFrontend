import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface BloodType {
  id?: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class BloodService {
  private apiUrl = '/api/blood-types';

  constructor(private http: HttpClient) {}

  getBloodTypes(): Observable<BloodType[]> {
    return this.http.get<BloodType[]>(this.apiUrl);
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
}
