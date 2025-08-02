import { Component, OnInit } from '@angular/core';
import { OwnPlanService } from '../services/own-plan.service';
import { NgFor, NgIf } from '@angular/common';
import { count } from 'rxjs';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


interface ResFromBac {
  count: number 
  title: string[]
}



interface dailyBreakForGapOne {
  day: string;
  description:string[]
  whyToLearn:string[]
  revision: string
}

interface weeklyBrdeakdownGapOne {
  dayRange: string;
  topic: string;
  resources:string[];
  activities:string[];
  dailyBreakdown: dailyBreakForGapOne[]

}
 export interface GoStudyPlanWeekGapOne {
  title: string;
  introduction: string;
  overallStrategy: string;
  weeklyBreakdown: weeklyBrdeakdownGapOne[];  
  forNextTopic: string;
  finalReview: string;
  motivationMessage: string;
}

@Component({
  selector: 'app-own-plan',
  imports: [NgFor,RouterOutlet,NgIf],
  templateUrl: './own-plan.component.html',
  styleUrl: './own-plan.component.css'
})
export class OwnPlanComponent implements OnInit {

  planCount:number=0
  planCountArr:number[]=[]
  titleArr:string[]=[]
  showOwnPlan:boolean=true


  constructor (private ownPlan:OwnPlanService, private router:Router){
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showOwnPlan= !event.url.includes('pl/description');
    }
     });
  }
// ResponseFromBack: ResFromBac | null =null
  ngOnInit(): void {
   this.CheckForUserPlan();
  }

  
  

     CheckForUserPlan() {
     this.ownPlan.OwnPlan().subscribe({
      next:(response:ResFromBac)=>{
        this.planCount=response.count
        this.titleArr=response.title
        console.log(this.titleArr)
        console.log(this.titleArr[0])
        console.log(this.titleArr[1])
        console.log(this.titleArr[2])
        console.log(this.titleArr[3])
        console.log(this.titleArr.slice(0,1))
        this.planCountArr=  this.getArr()
        console.log(response)
        // console.log(response.count)
        console.log(this.planCount)
      },
      error: (error)=>{
        console.log("error",error)
      }
     })
  }

   getArr(){
         return Array.from({length: this.planCount}, (_,i)=>i+1)
        }
        SeeWorkBtn(){
              this.router.navigate(['profile/own/plan/pl/description'])
              // this.router.navigate(['profile'])

        }
        responsePlan: GoStudyPlanWeekGapOne | null = null
        SeePlanDescription(idx:number){
          console.log("idx",idx)
          console.log(this.titleArr[idx])
          this.ownPlan.OwnPlanDescription(this.titleArr[idx]).subscribe({
            next:(response:GoStudyPlanWeekGapOne)=>{
              console.log("response",response)
               
              // this.router.navigate(['own/plan/pl/description'])
                   this.router.navigate(['profile/own/plan/pl/description',this.titleArr[idx]])
            },
            error: (error)=>{
              console.log("error",error)
            }
          })
        }

}
