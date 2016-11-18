import {Component, AfterViewInit, OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
  templateUrl: './lifecycle.component.html'
})
export class LifecycleComponent implements AfterViewInit {
  products: Observable<Array<string>>;  
  constructor(private searchService:SearchService, private drupalService: DrupalService) {
  
  }

  ngOnInit() {
      this.products = this.drupalService.contentsearch('lifecycle', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    window.scrollTo(0,0);
    this.searchService.findAll();
  }
}
