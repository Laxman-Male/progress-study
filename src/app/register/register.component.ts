import { CommonModule, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerservice } from '../services/register.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    userId:'',
    name: '',
    email: '',
    password: ''
  };
  userD={
    name:'',
    email:'',
    userId: ''
  }
  
  constructor (private registerUser: registerservice, private router: Router, private profile: ProfileService ){ }
  
  
  registerBtn(name:string, email:string, password:string){
    this.user.name=name;
    this.user.email=email;
    this.user.password=password;
    
    
    this.registerUser.RegisterUser(this.user).subscribe({
      next:(response)=>{
        // this.message ='registration success';
        console.log(response)
        if(response.status==200){
          console.log(response.status)
          this.userD.name=this.user.name;
          this.userD.email=this.user.email;
          console.log(this.userD.name, this.userD.email,this.userD.userId)
          console.log(response)
          console.log(response.body)
          console.log(response.body.userId)
          console.log(response.body.token);
          localStorage.setItem("token",response.body.token)
           this.router.navigate([''])
          // this.profile.GetUserProfile(this.userD).subscribe({
            //   next:(response)=>{
              //     console.log(response)
              //   },
              //   error:(error)=>{
                //     console.error("error to passing profile",error)
                //   }
                // })
              }
              
            },
            error:(error)=>{
              console.log(error);
            }
          })
        }
        
}
