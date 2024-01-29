import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLogin = true;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router){
  }
  
  onSwitchMode(){   
    this.isLogin = !this.isLogin; 
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(!this.isLogin){
      this.authService.signUp(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.router.navigate(['./recipes']);
        },
        errorRes => {
          console.log(errorRes);
          switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS' : this.error = 'Email already exists';
          }
        }
      );
    } else {
      this.authService.logIn(email, password).subscribe(
        responseData => {
          console.log(responseData);
          this.router.navigate(['./recipes']);
        },
        errorRes => {
          console.log(errorRes);
        }
      );

    }

    form.reset();
  }
}
