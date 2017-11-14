import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppComponentService {

  public progressBarVisibilityChange: Subject<any> = new Subject<any>();

  constructor() {
  }

  setProgressBarVisibility(isVisible: boolean) {
    this.progressBarVisibilityChange.next(isVisible);
  }
}
