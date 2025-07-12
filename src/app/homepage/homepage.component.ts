import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HomepageService } from '../services/homepage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-homepage',
  standalone: true, // Needed if using `imports` in component
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'] // Should be `styleUrls` not `styleUrl`
})
export class HomepageComponent implements OnInit {
  isLogin: boolean = false;
  isValid: boolean=true
  userLogIn={
    name:'',
    email:'',
  }
  
  constructor(private auth: HomepageService, private login: LoginService ,private router: Router) {}
  
  // ngOnInit(): void {
  //   this.auth.setLoginState().subscribe({
  //     next: () => console.log('Login state updated'),
  //     error: (err) => {
  //       console.error('Error updating login state:', err);
  //     }
  //   });
  // }
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
  
  CLickedLogIn():void{
     
    let name2= document.getElementById("name") as HTMLInputElement
    let email2= document.getElementById("email") as HTMLInputElement
    if(name2.value ==="" || email2.value===""){
      console.log("field is empty")
       name2.style.setProperty("border", "2px solid red", "important");
    this.isValid= false;
    email2.style.setProperty("border", "2px solid red", "important");
    return;

    }
    this.isLogin=true
    this.userLogIn.name= name2.value;
    this.userLogIn.email= email2.value;
    this.login.Login(this.userLogIn).subscribe({
      next:(response)=>{
        console.log("response",response)
        localStorage.setItem("token",response.token)
        console.log("token---",response.token)
       

      },
            error:(error)=>{
              console.log(error);
              console.log(error.status);
              if (error.status !=200){
             alert("please check Name and Password")
              }
              this.isLogin=false
            //  return;
             }
    })
  }
}
