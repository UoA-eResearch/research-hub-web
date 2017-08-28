import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetResultsListItem} from "../model/ResultsListItemInterface";
import {ApiService} from "../app.api.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {MenuService} from "../menu.service";
import {AnalyticsService} from "../app.analytics.service";


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {

  private anchorBased = true;
  private resultsValue = new Array<GetResultsListItem>();
  private titleValue = '';
  @Output() resultsChange = new EventEmitter();

  @Input()
  intermediatePath: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location,
              private menuService: MenuService, private analyticsService: AnalyticsService) {

  }

  getRoute(result: GetResultsListItem) {

    const route = this.menuService.getCurrentPath();

    if (this.intermediatePath !== undefined) {
      route.push(this.intermediatePath);
    }

    route.push('' + result.getId());

    return route;
  }

  ngOnInit() {

  }

  trackOutboundLink(result: GetResultsListItem) {
    if (result['type'] !== undefined && result['type'] === 'policy') {
      console.log('track policy!');
      this.analyticsService.trackPolicy(result.getTitle(), result.getHref());
    } else {
      this.analyticsService.trackOutboundLink(result.getHref());
    }
  }

  @Input()
  get results() {
    return this.resultsValue;
  }

  @Input()
  get title() {
    return this.titleValue;
  }

  set results(val) {
    this.resultsValue = val;
    this.resultsChange.emit(val);
  }

  set title(val) {
    this.titleValue = val;
  }
}
