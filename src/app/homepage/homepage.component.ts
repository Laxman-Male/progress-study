import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HomepageService } from '../services/homepage.service';

@Component({
  selector: 'app-homepage',
  standalone: true, // Needed if using `imports` in component
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] // Should be `styleUrls` not `styleUrl`
})
export class HomepageComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private auth: HomepageService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }
  checkLoginStatus():void{
    const token= localStorage.getItem('token')
    if (token){
      this.isLogin=true
    }
    else{
      this.isLogin=false
      console.log("user is not log in ")
    }
  }
}
