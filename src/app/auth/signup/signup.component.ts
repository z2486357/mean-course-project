import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  get isLoading(){return this.authService.isLoading;}

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoading=false;
  }

  signup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.isLoading=true;
    this.authService.createUser(form.value.email, form.value.password);
    //console.log(form.value);
  }
}
