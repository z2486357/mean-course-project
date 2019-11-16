import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get isLoading(){return this.authService.isLoading;}

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoading=false;
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
    //console.log(form);
  }
}
