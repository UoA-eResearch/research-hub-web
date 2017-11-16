import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/first';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate() {
    return this.authService.getSession().map((isLoggedIn: boolean) => {
      console.log('Is user authenticated: ', isLoggedIn);

      // Redirect user to login page if not logged in
      if (!isLoggedIn) {
        this.authService.login();
      }

      return isLoggedIn;
    }).first();
  }
}
