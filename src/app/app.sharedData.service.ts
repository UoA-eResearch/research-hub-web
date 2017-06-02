import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class SharedDataService {
  private title: string;
  titleChange: Subject<any> = new Subject<any>();

  private showLogo: boolean;

  getShowLogo() {
    return this.showLogo;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title, showLogo) {
    this.showLogo = showLogo;
    this.title = title;
    this.titleChange.next(title);
  }
}
