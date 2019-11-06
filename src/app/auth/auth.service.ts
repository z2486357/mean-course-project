import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private isAuth = false;
  private tokenTimer: any;

  constructor(private http: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.isAuth;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/signup", authData).subscribe(
      response => {
        console.log(response);
      })
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/login", authData).subscribe(
      response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresIn = response.expiresIn;
          this.setTokenTimer(expiresIn);
          this.isAuth = true;
          const now = new Date();
          const expireTime = new Date(now.getTime() + expiresIn * 1000);
          //console.log(expireTime)
          this.saveAuthData(token, expireTime);
          this.router.navigate(['/'])
        }
      }
    )
  }

  autoAuthUser(){
    const authInformation=this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime()-now.getTime();
    if(expiresIn>0){
      this.token=authInformation.token;
      this.isAuth=true;
      this.setTokenTimer(expiresIn/1000);
    }
  }

  setTokenTimer(duration:number){ //second
    console.log("Set timer: ", duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000); //minisecond
  }

  logout() {
    this.isAuth = false;
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/'])
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
  }

  private getAuthData(){
    const token=localStorage.getItem('token');
    const expirationDate=localStorage.getItem('expirationDate')
    if(!token || !expirationDate){
      return;
    }
    return {
      token:token,
      expirationDate:new Date(expirationDate)
    }
  }
}
