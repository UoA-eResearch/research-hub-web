import {Injectable} from '@angular/core';
import {environment} from 'app/../environments/environment';
import {Http, Headers} from '@angular/http';
import {Location} from '@angular/common';
import {Md5} from 'ts-md5/dist/md5';
import {Subject} from "rxjs/Subject";


class User {
  private email = 'j.diprose@auckland.ac.nz';

  getAvatarUrl() {
    return 'https://www.gravatar.com/avatar/' + Md5.hashStr(this.email.trim().toLowerCase()).toString() + '?d=identicon&s=56';
  }
}

@Injectable()
export class AppAuthService {

  public user: User;
  private session: any;
  // public loggedIn = false;
  private loginPopup: any;

  public loginChange: Subject<any> = new Subject<any>();

  constructor(private http: Http, private location: Location) {
    this.user = new User();
    console.log('authlogin');
    this.loginChange.next(false);
    // this.getSession().subscribe((data) => {
    //     this.updateSession(data);
    // });
  }

  login() {
    this.loginPopup = window.open('login.html', 'popup', 'width=600,height=600');
    this.loginPopup.onbeforeunload = () => {
      console.log('popup closed');
      this.loginChange.next(true);
      // this.loggedIn = true;
      this.getSession().subscribe((data) => {
        this.updateSession(data);
      });
    };
  }

  // getUser() {
  //   return this.user;
  // }

  private updateSession(data: any) {
    console.log('updateSession: ', data);
    // this.loggedIn = Object.getOwnPropertyNames(data).length === 0;
    this.session = data;
  }

  private getSession() {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    return this.http
      .get(environment.shibbolethSessionUrl, {headers: headers})
      .map((response) => response.json());
  }
}
