import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observeOn } from 'rxjs';
import { observeNotification } from 'rxjs/internal/Notification';

@Injectable({
  providedIn: 'root'
})
export class registerservice {

  constructor( private http:HttpClient) { }

  //observable--asynchronous behaviour, this give full access to status, headers,body
  RegisterUser(userData: any): Observable<HttpResponse <any>>{
    return this.http.post<any>('http://localhost:8000/register',userData,{
      observe:'response'
    })
  };
}
