import {Component, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {SearchService} from "../app.search.service";
import {DrupalService} from "../app.drupal.service";
import {Observable} from "rxjs/Rx";
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './details.component.html'
})
export class GuidedetailsComponent implements OnInit, AfterViewInit {
id: number;
    private sub: any;
  details: Observable<Array<string>>;

  constructor(private searchService:SearchService, private drupalService: DrupalService, private route: ActivatedRoute) {

  }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {this.id = +params['id']});
        this.details = this.drupalService.contentdetailsearch(this.sub, this.searchService.searchChange);
  }

  ngAfterViewInit()
  {
    this.searchService.findAll();
  }
}