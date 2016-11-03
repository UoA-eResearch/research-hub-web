import {Component, AfterViewInit} from "@angular/core";

@Component({
  templateUrl: './showcase.component.html'
})
export class ShowcaseComponent implements AfterViewInit {

  constructor() {

  }

  ngAfterViewInit() {
    window.scrollTo(0,0);
  }
}
