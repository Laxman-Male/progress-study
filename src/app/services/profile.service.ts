import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  GetUserProfile(): Observable<any>{
    const token = localStorage.getItem('token')
    if(!token){
      console.error("no token found")
    }
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    
    return this.http.get("http://localhost:8000/profile",{headers: header}).pipe(
      catchError( error =>{
        console.error("error in getting profile",error)
         return throwError(() => new Error('Failed to fetch profile data. Please try again.'));
      })
    );
  }
}
