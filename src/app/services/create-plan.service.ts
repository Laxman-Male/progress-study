import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePlanService {

  constructor(private http:HttpClient) { }
  getToken(){
    return localStorage.getItem('token')
  }
  GetPlan(getPlan:any){
    const token=this.getToken()
    const headers= new HttpHeaders({
       Authorization: `Bearer ${token}`
    })

    const paramObject: any = {};
if(getPlan.subject!=""){
  paramObject.subject=getPlan.subject;
}
if(getPlan.topic!=""){
  paramObject.topic=getPlan.topic;
}
paramObject.days=getPlan.days
paramObject.hours=getPlan.hours


//need to make topic as optional parameter 

    const params= new HttpParams({fromObject: paramObject })
    return this.http.get<any>('http://localhost:8000/study-plan',{headers:headers,params})
  }

  SavePlanByUser(){
      const token=this.getToken()
      const userPlan2raw=localStorage.getItem("userplan2")
      const userPlan2= JSON.parse(userPlan2raw || '{}')
      const userInforaw= localStorage.getItem("userInfoP")
      const userInfo = JSON.parse(userInforaw || '{}')
      const weekCount = localStorage.getItem("weekCount")
      const Title = localStorage.getItem("title");
    const headers= new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`
    })
    const params=({
      count: Number(weekCount),
      title: Title,
      userPlan2: userPlan2,
    })
    // const payload={
      // userInfo: userInfo,
      // userPlan: userPlan2
    // }
     return this.http.post<any>('http://localhost:8000/savePlan',params,{headers: headers});
   }

}
