import {Component, AfterViewInit} from "@angular/core";
import {OnInit, OnDestroy} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {Http} from "@angular/http";

@Component({
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService, private http: Http) {

  }

  ngOnInit() {
    this.services = this.drupalService.search('services', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }

  getAbstract(text) {
    var maxWords = 10;
    return text.split(" ").splice(0, maxWords).join(" ") + "...";
  }
}
