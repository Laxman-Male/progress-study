import { NgFor, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CreatePlanService } from '../services/create-plan.service';
import { CommonModule } from '@angular/common';
import { GoStudyPlanGapFourDays, GoStudyPlanGapWeek, GoStudyPlanWeekGapOne } from '../Models/weeks';
import { DUMMY_STUDY_PLAN } from './dummy-plan';

const FutureTime = 60 * 60 * 1000;   //first 60 for minutes,- seconds -miniseconds-no of hours

@Component({
  selector: 'app-create-plan',
  //In standalone Angular components, not using NgModule
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent implements OnInit {
  result = 0;
  isLoggedIn: boolean = false
  planPage = {
    subject: '',
    topic: '',
    days: '',
    hours: '',
  }
  weekNumber: number = 0
  getPlan: boolean = true;
  isGenerated: boolean = false;
  isLoading: boolean = false;
  // true when /study-plan failed and we're showing DUMMY_STUDY_PLAN instead,
  // so visitors can still see/save/attempt a full plan end-to-end
  isDemoFallback: boolean = false;
  getPlanCount: number = 0;
  weekCount: number = 0;
  daysEnteredByUser: number = 1;

  constructor(private createPlan: CreatePlanService) { }

  studyPlanData: GoStudyPlanWeekGapOne | null = null

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if (token != null) {
      this.isLoggedIn = true
    }
    else {
      this.isLoggedIn = false
    }
    const storedPlan = localStorage.getItem("userPlanbeforeSave")
    if (storedPlan) {
      try {

        this.studyPlanData = JSON.parse(storedPlan) as GoStudyPlanWeekGapOne
      } catch (e) {
        console.log("error in getting", e)
      }
    }

    console.log("count->", this.getPlanCount)

  }



  GetPlanBtn(): void {
    const subject = document.getElementById('subject') as HTMLInputElement
    const topic = document.getElementById('topic') as HTMLInputElement
    const days = document.getElementById('days') as HTMLInputElement
    const hours = document.getElementById('hours') as HTMLInputElement
    // var ResponseData: null
    this.getPlanCount = this.getPlanCount + 1;
    this.isDemoFallback = false;

    this.daysEnteredByUser = Number(days.value);
    if (this.getPlanCount > 20) {
      let nowTime = Date.now();
      localStorage.setItem("NowTime", JSON.stringify(nowTime))
      alert("extended limit! You can generate 5 Plan try again after 1 Hour")
      setTimeout(() => {
        this.getPlanCount = 0
        this.getPlan = true
        this.isGenerated = false
      }, FutureTime)
      //need to do this for a day
    }

    console.log("count->", this.getPlanCount)

    console.log("input from user", subject.value, topic.value, days.value)
    this.planPage.subject = subject.value
    this.planPage.topic = topic.value
    this.planPage.days = days.value
    this.planPage.hours = hours.value
    if ((this.planPage.subject || this.planPage.topic || this.planPage.days || this.planPage.hours) == "") {
      alert("Enter values")
      return
    }
    console.log("--", this.planPage.subject, this.planPage.days, this.planPage.hours)
    this.getPlan = false
    this.isGenerated = false;
    this.isLoading = true;
    this.createPlan.GetPlan(this.planPage).subscribe({
      next: (response) => {
        let tt;
        if(this.daysEnteredByUser<=45){
          this.studyPlanData = response as GoStudyPlanWeekGapOne
          const a = this.studyPlanData.weeklyBreakdown;
          this.weekCount = a.length
          tt = this.studyPlanData.title
        }
        else if(this.daysEnteredByUser >45 && this.daysEnteredByUser <100){
          // this.studyPlanData=response as GoStudyPlanGapFourDays;
        }
        else{
          // this.studyPlanData=response as GoStudyPlanGapWeek;
        }
        console.log(this.weekCount)
        console.log("plan response->1st", response)
        console.log("plan response->2nd", this.studyPlanData)
        localStorage.setItem("userPlanbeforeSave", JSON.stringify(this.studyPlanData))
        localStorage.setItem("weekCount", JSON.stringify(this.weekCount))
        console.log(tt)
        localStorage.setItem("title", JSON.stringify(tt))
        this.isLoading = false;
        this.isGenerated = true;
      },
      error: (error) => {
        // Plan generation failed (e.g. Gemini API key issue) - fall back to a
        // sample plan so the UI/save/MCQ flow can still be shown end-to-end.
        console.log("get plan error->x", error)
        this.isLoading = false;
        this.isDemoFallback = true;
        this.daysEnteredByUser = 22;
        this.studyPlanData = DUMMY_STUDY_PLAN;
        this.weekCount = DUMMY_STUDY_PLAN.weeklyBreakdown.length;
        localStorage.setItem("userPlanbeforeSave", JSON.stringify(this.studyPlanData))
        localStorage.setItem("weekCount", JSON.stringify(this.weekCount))
        localStorage.setItem("title", JSON.stringify(this.studyPlanData.title))
        this.isGenerated = true;
      }
    })

  }
  ClearPlan(): void {
    this.getPlan = true;
    this.isGenerated = false;
    this.isDemoFallback = false;
    this.studyPlanData = null;
    localStorage.removeItem("userPlan2")
    localStorage.removeItem("userPlanbeforeSave")
  }
  SavePlan(): void {
    console.log("saved successfully")
    localStorage.setItem("userplan2", JSON.stringify(this.studyPlanData))
    this.createPlan.SavePlanByUser().subscribe({
      next: (response: GoStudyPlanWeekGapOne) => {
        console.log(response)
        localStorage.removeItem("userPlan2");
        this.result = 1;
      }
    })
    this.getPlan = true;
    this.isGenerated = false;
    this.isDemoFallback = false;
    localStorage.removeItem("userPlan2")
    localStorage.removeItem("userPlanbeforeSave")
  }
}
