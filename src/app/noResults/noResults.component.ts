import {AfterViewInit} from "@angular/core";
import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'no-results',
  templateUrl: './noResults.component.html'
})
export class NoResultsComponent implements AfterViewInit
{

  constructor(private router:Router) {

  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
