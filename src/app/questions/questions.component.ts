import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

constructor ( private question:QuestionService){}

  ngOnInit(): void {
    this.FirstQuestion()
  }

  OptionSelectedByUser:string=""
  mcq:MCQ | null = null
  questionCount:number=1;
  // mcq=null

  SubmitAns(){
    const title = localStorage.getItem("title")
    console.log("selected",this.OptionSelectedByUser)
    if (title!=null){
      this.question.SubmitedMcq(title,this.OptionSelectedByUser, this.questionCount).subscribe({
        next:(response)=>{
          console.log("next mcq",response)
          console.log("qcount",this.questionCount)
          response.options=JSON.parse(response.options)
        this.mcq=response
        this.questionCount++;
        }
      })
    }
  }

  SkipQuestion(){

  }
  FirstQuestion (){
    const title= localStorage.getItem("title")

    if (title !=null){
    console.log("1st question");
    this.question.FirstMCQ(title).subscribe({
      next:(response)=>{
        response.options=JSON.parse(response.options)
        this.mcq=response
        console.log("1st Q",response)
        console.log("1st Q",response.options)
      }
    })
  }

  }
}
