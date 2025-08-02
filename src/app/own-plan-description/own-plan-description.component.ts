import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OwnPlanService } from '../services/own-plan.service';
import { CompletedWeekPlan, GoStudyPlanWeekGapOne, TotalWeekCount } from '../Models/weeks';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-own-plan-description',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './own-plan-description.component.html',
  styleUrl: './own-plan-description.component.css'
})
export class OwnPlanDescriptionComponent implements OnInit {

    constructor (private ownPlan:OwnPlanService, private route:ActivatedRoute){  }
    ownPlanDesp : GoStudyPlanWeekGapOne | null=null;
      data:any=null
      weekCount: TotalWeekCount | null=null;
      weekCountArr:number[]=[]
     
      count:number=0
      completedWeek: CompletedWeekPlan | null=null;
      title1:string=""

ngOnInit(): void {

//  const   title= String(localStorage.getItem('title'));
//to show the plan saved by user by getting title in payload 
const title= this.route.snapshot.paramMap.get('title');
if(title)
  {
  this.title1=title;
  this.ownPlan.OwnPlanDescription(title).subscribe({
    next:(response:GoStudyPlanWeekGapOne)=>{
      console.log(response,"_=_=-+-=-=-=-=")
      this.data=response;
      console.log("---",typeof(response),response)

    },
    error: (error)=>{
      console.log(error)
    }
  })
}

//to get count of week to show the week block
console.log("in own desp -----------------")
 
//to get weekCount
if(title){

  this.ownPlan.GetCountToView(title).subscribe({
    next:(response:TotalWeekCount)=>{
      this.weekCount=response
      this.count=response.count
     this.weekCountArr=this.getArr();
      console.log(".,.,.,",response)
      console.log(".,.,.,",this.weekCount.count)
      
    },
    error:(error)=>{
      console.log(error);
    }
  })
}

//due to this 1st button getting green color and 2nd getting square gray color
this.weekReward(1)


}
getArr(){
  console.log(Date.now())
  console.log(Date.now()/1000)
  let b=  Date.now();
let t= new Date(b)
console.log(t);

let c= 1752960000000 /(1000 * 60 * 60 * 24 )
console.log(c)



      return Array.from({length: this.count}, (_,i)=>i+1)
     }

     
 
weekReward(idx:number){
   console.log("---",idx+1)
   const time= Date.now()
  this.ownPlan.CompletedWeek((idx+1),this.title1,time).subscribe({
    next:(response)=>{
      console.log("++++++",response)
      this.completedWeek=response
   
      console.log(this.completedWeek?.time)
      console.log(this.completedWeek?.complete)
      
    },
    error: (error)=>{
      console.log(error)
    }
  })

}

StartTest(){
  // this.router.navigate([])
  // this.router
  localStorage.setItem("title",JSON.stringify(this.title1))
}

}
