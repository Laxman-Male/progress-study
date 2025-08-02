import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterOutlet], //NgIf is under CommonModule
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit   {
  toprofile:any=null
  showProfileContent = true;
  constructor( private profileservice: ProfileService, private router:Router ){
    
 this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showProfileContent = !event.url.includes('own/plan');
    }
     });

  }
  ngOnInit():void{
   this.fetchUserProfile();
  }

  fetchUserProfile():void{
    this.profileservice.GetUserProfile().subscribe({
      next:(data)=>{
        this.toprofile=data;
        console.log("user profle",this.toprofile)
         localStorage.setItem("userInfoP",JSON.stringify(this.toprofile))

      },
      error:error=>{
        console.error("error in fetch",error)
      }
      
    });
  }

   LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem("userInfop")
    this.router.navigate([''])
  }

  SeeOwnWork(){
    this.router.navigate(['profile/own/plan'])
    // this.router.navigate(['own/plan/list']);

  }

}
