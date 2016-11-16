import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";

@Component({
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Observable<Array<string>>;
  loading: boolean;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.services = this.drupalService.contentsearch('service', this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    window.scrollTo(0,0);
    this.searchService.findAll();
  }
}
