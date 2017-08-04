import {Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numCols: number;
  categoryItems: string[] = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7'];

  constructor() {  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSideNav();
  }

  public updateSideNav() {
    const windowWidth = window.innerWidth;
    this.numCols = 3;
  }

  ngOnInit() {
    this.updateSideNav();
  }
}
