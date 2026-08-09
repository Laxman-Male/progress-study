import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = {
    name: '',
    email: '',
  }
  isValid: boolean = true;
  isSubmitting: boolean = false;

  // Backend isn't hooked up to a real auth provider yet, so offer a working
  // demo account instead of leaving visitors stuck at the login page.
  demoUser = {
    name: 'laxman',
    email: '000150525@yopmail.com',
  }

  constructor(private login: LoginService, private router: Router) { }

  UseDemoCredentials() {
    this.user.name = this.demoUser.name;
    this.user.email = this.demoUser.email;
  }

  LoginBtn(name: string, email: string) {
    this.isValid = true;
    this.isSubmitting = true;
    this.user.name = name;
    this.user.email = email;

    this.login.Login(this.user).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        localStorage.setItem("token", response.token)
        localStorage.setItem("UserEmail", response.userId)
        this.router.navigate([''])
      },
      error: (error) => {
        console.log(error)
        this.isSubmitting = false;
        this.isValid = false;
      }
    })
  }
}
