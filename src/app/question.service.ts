import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  
  
  FirstMCQ(title:string){
    const token = localStorage.getItem("token")
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

     const params=({
   Title: title
    })

    console.log("icnoming ",title)
    return this.http.get<any>(`${environment.apiUrl}/firstQ`,{headers : header,
      params: params,
    })
  }

  SubmitedMcq(title:string,optionsSelected:string, mcqID:number){
        const token = localStorage.getItem("token")

      const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

     const params=({
   Title: title,
   mcqID: mcqID,
   option: optionsSelected
    })
     console.log("icnoming ",title)
    return this.http.post<any>(`${environment.apiUrl}/SubmQuestion`,params,{headers : header})

  }

  GetReview(title:string){
    const token = localStorage.getItem("token")
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const params=({
      Title: title
    })
    return this.http.get<any>(`${environment.apiUrl}/quizReview`,{headers : header, params})
  }

}
