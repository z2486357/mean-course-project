import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  get isAuth() { return this.authService.getAuthStatus(); }
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
  }
}
