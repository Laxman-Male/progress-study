import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [RouterLink, RouterLinkActive,CommonModule,RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit   {
  toprofile:any=null
  constructor( private profileservice: ProfileService, private router:Router ){}
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
    this.router.navigate(['own/plan/list'])
  }

}
