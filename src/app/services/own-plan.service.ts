import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnPlanService {

  constructor(private http:HttpClient) { }

 
  //to get count of plan to view at profile/see your plan
  OwnPlan(){
    const token= localStorage.getItem("token")
    const headers= new HttpHeaders({
           'Content-Type': 'application/json',
       Authorization: `Bearer ${token}`

    })
  //  const params= new HttpParams().set('email',email)
     return this.http.get<any>('http://localhost:8000/getCount',{
      headers: headers,
      //params: params
     })
    }
    OwnPlanDescription(title:string){
      const token= localStorage.getItem('token');
      const headers= new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        // title: title      //search ffor why i pass title here 
      })
      const params ={
        title: title
      }

      return this.http.get<any>('http://localhost:8000/OwnPlanDescription',{
        headers:headers,
       params:params
      })
    }


    //to get count and title of plan to use it in place where we show the complete plan
    GetCountToView(title:string){
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      const params= {
        title: title,
      }

      return this.http.get<any>('http://localhost:8000/getWeekCount_view_plan',{
        headers: headers,
        params: params
      })

    }


    CompletedWeek(weekNum:number , title:string, nowTime:number){
      const token= localStorage.getItem('token');
       const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
      const params={
        week: weekNum,
        title: title,
        nowTime: nowTime,

      }
      return this.http.get<any> ('http://localhost:8000/week_completed',{
        headers: headers,
        params: params,
      })
    }


}
