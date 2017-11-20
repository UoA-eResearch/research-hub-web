import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import 'rxjs/add/operator/first';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route, state);

    return this.authService.getSession().map((isLoggedIn: boolean) => {
      // Redirect user to login page if not logged in
      if (!isLoggedIn) {
        const redirectPath = state.url; // Go to login page and after login redirect back to page that we were going to visit
        this.authService.login(redirectPath);
      }

      return isLoggedIn;
    }).first();
  }
}
