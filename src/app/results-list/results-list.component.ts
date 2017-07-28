import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent {

  private resultsValue = [];
  @Output() resultsChange = new EventEmitter();

  constructor() {
  }

  @Input()
  get results() {
    return this.resultsValue;
  }

  set results(val) {
    this.resultsValue = val;
    this.resultsChange.emit(val);
  }
}
