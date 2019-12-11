import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  get isAuth(){return this.authService.getAuthStatus();}

  constructor(private authService:AuthService,
    private router:Router){}

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot): boolean |
    import("@angular/router").UrlTree | import("rxjs").Observable<boolean |
    import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
      if(!this.isAuth){
        this.router.navigate(['/auth/login']);
      }
      return this.isAuth;

  }

}
