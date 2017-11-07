import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetResultsListItem} from 'app/model/ResultsListItemInterface';
import {AnalyticsService} from 'app/services/analytics.service';


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {

  public resultsValue = new Array<GetResultsListItem>();
  public titleValue = '';
  @Output() resultsChange = new EventEmitter();

  constructor(private analyticsService: AnalyticsService) {

  }

  ngOnInit() {

  }

  trackOutboundLink(result: GetResultsListItem) {
    if (result['type'] !== undefined && result['type'] === 'policy') {
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
