import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AppComponentService {

  public titleChange: Subject<string> = new Subject<string>();
  public progressBarVisibilityChange: Subject<boolean> = new Subject<boolean>();
  public contentSidenavVisibilityChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  setTitle(title: string) {
    this.titleChange.next(title);
  }

  setProgressBarVisibility(isVisible: boolean) {
    this.progressBarVisibilityChange.next(isVisible);
  }

  setContentSidenavVisibility(isVisible: boolean){
    this.contentSidenavVisibilityChange.next(isVisible);
  }
}
