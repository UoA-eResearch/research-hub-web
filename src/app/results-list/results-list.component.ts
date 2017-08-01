import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ResultsListItem} from "../model/ResultsListItemInterface";


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {

  private resultsValue = new Array<ResultsListItem>();
  private titleValue = '';
  @Output() resultsChange = new EventEmitter();

  constructor() {
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
