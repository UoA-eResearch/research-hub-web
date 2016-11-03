import {Component, OnDestroy, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {Observable} from "rxjs/Rx";
import {DrupalService} from "../app.drupal.service";

@Component({
    templateUrl: './policies.component.html'
})
export class PoliciesComponent implements OnInit, AfterViewInit {
  policies: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.policies = this.drupalService.contentsearch('policies', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    window.scrollTo(0,0);
    this.searchService.findAll();
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}
