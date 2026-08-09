import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { OwnPlanService } from '../services/own-plan.service';
import { CompletedWeekPlan, GoStudyPlanWeekGapOne, TotalWeekCount } from '../Models/weeks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-own-plan-description',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './own-plan-description.component.html',
  styleUrl: './own-plan-description.component.css'
})
export class OwnPlanDescriptionComponent implements OnInit {

    constructor (private ownPlan:OwnPlanService, private route:ActivatedRoute){  }

      data: GoStudyPlanWeekGapOne | null = null
      weekCount: TotalWeekCount | null=null;
      weekCountArr:number[]=[]

      count:number=0
      completedWeek: CompletedWeekPlan | null=null;
      title1:string=""

ngOnInit(): void {

//to show the plan saved by user by getting title in payload
const title= this.route.snapshot.paramMap.get('title');
if(title)
  {
  this.title1=title;
  this.ownPlan.OwnPlanDescription(title).subscribe({
    next:(response:GoStudyPlanWeekGapOne)=>{
      this.data=response;
    },
    error: (error)=>{
      console.log(error)
    }
  })
}

//to get weekCount
if(title){

  this.ownPlan.GetCountToView(title).subscribe({
    next:(response:TotalWeekCount)=>{
      this.weekCount=response
      this.count=response.count
     this.weekCountArr=this.getArr();
    },
    error:(error)=>{
      console.log(error);
    }
  })
}

//compute which weeks are completed (backend calculates from plan CreatedAt vs now, no click needed)
if(title){
  this.checkWeekCompletion();
}

}

//backend derives completed weeks from CreatedAt vs current time, capped at total plan weeks
checkWeekCompletion(){
  const time= Date.now()
  this.ownPlan.CompletedWeek(this.title1,time).subscribe({
    next:(response:CompletedWeekPlan)=>{
      this.completedWeek=response
    },
    error: (error)=>{
      console.log(error)
    }
  })
}
getArr(){
      return Array.from({length: this.count}, (_,i)=>i+1)
     }

StartTest(){
  localStorage.setItem("title",JSON.stringify(this.title1))
}

}
