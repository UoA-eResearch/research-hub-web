import {Component, AfterViewInit} from "@angular/core";

@Component({
  templateUrl: './lifecycle.component.html'
})
export class LifecycleComponent implements AfterViewInit {

  constructor() {

  }

  ngAfterViewInit() {
    window.scrollTo(0,0);
  }
}
