import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class AppComponentService {

  public titleChange: Subject<string> = new Subject<string>();
  public progressBarVisibilityChange: Subject<boolean> = new Subject<boolean>();

  private contentSidenavVisibilityChange: Subject<boolean>;
  public contentSidenavVisibility$ : Observable<boolean>;
  public showContentSidenav : boolean;

  constructor() {
    this.contentSidenavVisibilityChange = new Subject<boolean>();
    this.contentSidenavVisibility$ = this.contentSidenavVisibilityChange.asObservable();
    this.showContentSidenav = false;
  }

  setTitle(title: string) {
    this.titleChange.next(title);
  }

  setProgressBarVisibility(isVisible: boolean) {
    this.progressBarVisibilityChange.next(isVisible);
  }

  setContentSidenavVisibility(isVisible: boolean){
    // Need to use setTimeout, as this may be called by a child component.
    // setTimeout means the changes won't be made in the same VM turn.
    // See https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
    setTimeout(() => {
      this.contentSidenavVisibilityChange.next(isVisible);
      this.showContentSidenav = isVisible;
    });
  }
}
