import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import { ActivatedRoute } from '@angular/router';
import {URLSearchParams} from "@angular/http";

@Component({
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  services: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {
      //var research_life_cycle;
      //var sub_cat;
      //research_life_cycle = this.location.search().field_research_lifecycle_stage;
    //  sub_cat = this.route.snapshot.params['field_research_lifecycle_stage'].value;
  }

  ngOnInit() {
      this.services = this.drupalService.contentsearch('service', this.searchService.searchChange);
      console.log(this.services);
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