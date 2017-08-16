import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GetResultsListItem} from "../model/ResultsListItemInterface";
import {ApiService} from "../app.api.service";


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {

  private anchorBased = true;
  private resultsValue = new Array<GetResultsListItem>();
  private titleValue = '';
  @Output() resultsChange = new EventEmitter();

  constructor(private apiService: ApiService) {
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
