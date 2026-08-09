import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerservice } from '../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    userId: '',
    name: '',
    email: '',
    password: ''
  };
  userD = {
    name: '',
    email: '',
    userId: ''
  }
  isValid: boolean = true;
  isSubmitting: boolean = false;

  constructor(private registerUser: registerservice, private router: Router, private profile: ProfileService) { }

  registerBtn(name: string, email: string, password: string) {
    this.isValid = true;
    this.isSubmitting = true;
    this.user.name = name;
    this.user.email = email;
    this.user.password = password;

    this.registerUser.RegisterUser(this.user).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.status == 200) {
          this.userD.name = this.user.name;
          this.userD.email = this.user.email;
          localStorage.setItem("token", response.body.token)
          this.router.navigate([''])
        }
      },
      error: (error) => {
        console.log(error);
        this.isSubmitting = false;
        this.isValid = false;
      }
    })

  }
}
