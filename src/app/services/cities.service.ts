import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'http://localhost:8080/api/cities';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  saveCity(city: City): Observable<City> {
    return city.id ? this.updateCity(city) : this.addCity(city);
  }

  private addCity(city: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, city);
  }

  updateCity(city: City): Observable<City> {
    return this.http.put<City>(`/api/cities/${city.id}`, city);
  }
  

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}