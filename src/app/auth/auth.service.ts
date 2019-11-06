import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token:string;
  private isAuth=false;
  private tokenTimer: any;

  constructor(private http: HttpClient,
    private router:Router) { }

  getToken(){
    return this.token;
  }

  getAuthStatus(){
    return this.isAuth;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(
      response => {
        console.log(response);
      })
  }

  login(email:string,password:string){
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login", authData).subscribe(
      response =>{
        const token=response.token;
        this.token=token;
        if(token){
          const expiresIn=response.expiresIn;
          this.tokenTimer=setTimeout(()=>{
            this.logout();
          },expiresIn*1000); //minisecond
          this.isAuth=true;
          this.router.navigate(['/'])
        }
      }
    )
  }

  logout(){
    this.isAuth=false;
    this.token=null;
    this.router.navigate(['/'])
    clearTimeout(this.tokenTimer);
  }
}
