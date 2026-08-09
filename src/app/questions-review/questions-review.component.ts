import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../question.service';
import { MCQReview } from '../Models/weeks';

@Component({
  selector: 'app-questions-review',
  imports: [CommonModule],
  templateUrl: './questions-review.component.html',
  styleUrl: './questions-review.component.css'
})
export class QuestionsReviewComponent implements OnInit {

  constructor(private question: QuestionService) { }

  reviewList: MCQReview[] = [];
  correctCount: number = 0;

  ngOnInit(): void {
    const title = localStorage.getItem("title")
    if (title != null) {
      this.question.GetReview(title).subscribe({
        next: (response: MCQReview[]) => {
          this.reviewList = response.map(item => ({
            ...item,
            options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
            // some older rows may have the correct-answer letter in lowercase
            // while option keys are always uppercase A-D; normalize for lookup.
            correctAns: (item.correctAns || '').toUpperCase(),
            optionSelected: (item.optionSelected || '').toUpperCase()
          }))
          this.correctCount = this.reviewList.filter(item => item.isCorrect).length
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }

}
