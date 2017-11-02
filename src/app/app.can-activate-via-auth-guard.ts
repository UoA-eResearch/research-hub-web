import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './app.auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.getSession().map((session) => {
      const isLoggedIn = Object.getOwnPropertyNames(session).length !== 0; // Checks if session object empty or not

      if (isLoggedIn) {
        console.log('authenticated');
        return true;
      }
      console.log('not authenticated');
      // this.router.navigateByUrl('/login');
      return false;
    }).first();
  }
}
