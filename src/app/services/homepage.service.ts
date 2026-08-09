import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http:HttpClient) { }
  getToken(): string | null{
    return localStorage.getItem('token')
  }
  setLoginState(){
    const token = this.getToken()
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    // isLogin(log: any): Observable <any>{
      return this.http.post<any>(`${environment.apiUrl}/login`,{},{headers})
      // };
    }
}
