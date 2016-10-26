import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import {GuidesComponent} from "../guides/guides.component";

@Component({
    templateUrl: './details.component.html'
})
export class GuidedetailsComponent implements OnInit, AfterViewInit {
  details: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService) {

  }

  ngOnInit() {
    this.details = this.drupalService.detailsearch(this.guide.nid, this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }
}