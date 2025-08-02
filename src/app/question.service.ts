import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
    return this.http.get<any>('http://localhost:8000/firstQ',{headers : header,
      params: params,
    })
  }

  SubmitedMcq(title:string,optionsSelected:string, qNum:number){
        const token = localStorage.getItem("token")

      const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

     const params=({
   Title: title,
   QNumber: qNum,
   option: optionsSelected
    })
     console.log("icnoming ",title)
    return this.http.post<any>('http://localhost:8000/SubmQuestion',params,{headers : header})

  }

}
