import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  Subject } from "rxjs";
import { User } from "./user.model";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";

interface AuthResponse{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService{
    user = new Subject<User>();

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string){
        return this.http.post<AuthResponse>(environment.signUpKey + environment.apiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(
            resData => {
                const expireDate = new Date(
                    new Date().getTime() + +resData.expiresIn+100
                );
                const user = new User(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    expireDate
                );
                this.user.next(user);
            }
        ));
    
    }

    logIn(email: string, password: string){
        return this.http.post<AuthResponse>(environment.logInKey + environment.apiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap(
            resData => {
                const expireDate = new Date(
                    new Date().getTime() + +resData.expiresIn+100
                );
                const user = new User(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    expireDate
                );
                this.user.next(user);
            }
        ));
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

}