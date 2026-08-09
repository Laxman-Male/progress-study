import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { QuestionService } from '../question.service';
import { MCQ } from '../Models/weeks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions',
  imports: [RouterLink, RouterLinkActive,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})



export class QuestionsComponent implements OnInit {

constructor ( private question:QuestionService, private router: Router){}

  ngOnInit(): void {
    this.FirstQuestion()
  }

  OptionSelectedByUser:string=""
  mcq:MCQ | null = null
  submitting:boolean=false

  SubmitAns(){
    const title = localStorage.getItem("title")
    if (!this.OptionSelectedByUser || this.mcq==null || title==null){
      return
    }
    this.submitting=true
    this.question.SubmitedMcq(title,this.OptionSelectedByUser, this.mcq.mcqID).subscribe({
      next:(response:MCQ)=>{
        console.log("next mcq",response)
        this.submitting=false
        this.OptionSelectedByUser="";
        if (response.done){
          this.router.navigate(['questions/review'])
          return
        }
        response.options=JSON.parse(response.options as any)
        this.mcq=response
      },
      error: (error)=>{
        console.log(error)
        this.submitting=false
      }
    })
  }

  SkipQuestion(){

  }

  FirstQuestion (){
    const title= localStorage.getItem("title")

    console.log("title in question",title)
    if (title !=null){
    console.log("1st question");
    this.question.FirstMCQ(title).subscribe({
      next:(response:MCQ)=>{
        console.log(response)
        if (response.done){
          this.router.navigate(['questions/review'])
          return
        }
        response.options=JSON.parse(response.options as any)
        this.mcq=response
        console.log("1st Q",response)
        console.log("1st Q",response.options)
      }
    })
  }

  }
}
