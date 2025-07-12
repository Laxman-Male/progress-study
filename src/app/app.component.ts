import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,FormsModule],
    // imports: [RouterOutlet,HomepageComponent],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 
export class AppComponent {
  title = 'progess-fe';
}
