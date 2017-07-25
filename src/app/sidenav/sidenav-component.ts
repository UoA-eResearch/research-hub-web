import {HostListener} from '@angular/core';


export class SideNavComponent {
  private isSideNavOpened = true;
  private isScreenSmall = false;
  private sideNavMode = 'side';

  constructor() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSideNav();
  }

  public updateSideNav() {
    const windowWidth = window.innerWidth;
    this.isScreenSmall = windowWidth < 800;
    if (this.isScreenSmall) {
      this.sideNavMode = 'over';
      this.isSideNavOpened = false;
    } else {
      this.sideNavMode = 'side';
      this.isSideNavOpened = true;
    }
  }
}
