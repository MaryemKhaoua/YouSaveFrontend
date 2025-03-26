// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; 
  private rolesApiUrl = 'http://localhost:8080/api/users/roles-info';  
  private rolesFetchUrl = 'http://localhost:8080/api/roles/all';  

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    if (!userData.password) {
      const { password, ...dataWithoutPassword } = userData;
      userData = dataWithoutPassword;
    }
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  getAllUsersWithRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.rolesApiUrl); 
  }
updateUserRole(id: number, roleChangeRequest: { newRoleName: string }): Observable<any> {
  return this.http.put(
    `${this.apiUrl}/${id}/role`, 
    roleChangeRequest, 
    { responseType: 'text' } 
  );
}

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.rolesFetchUrl);  
  }
}
