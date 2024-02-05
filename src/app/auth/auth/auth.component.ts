import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export type AuthType = 'login' | 'signup';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  error: string;
  authType:AuthType = 'login';


  constructor(private authService: AuthService,
              private router: Router){
  }
  
  onSwitchMode(){   
    if(this.authType === 'login'){
      this.authType = 'signup';
    } else {
      this.authType = 'login';
    }
  }

  isLogIn(){
    if(this.authType === 'login'){
      return true;
    } else {
      return false;
    }
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(!this.isLogIn()){
      this.authService.signUp(email, password).subscribe(
        responseData => {
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
