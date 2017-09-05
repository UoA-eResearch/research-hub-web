import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-research-activity-toggle',
  templateUrl: './research-activity-toggle.component.html',
  styleUrls: ['./research-activity-toggle.component.scss']
})
export class ResearchActivityToggleComponent implements OnInit {

  researchActivities = [
    {id: 1, name: 'Plan & Design', icon: 'map', className: 'plan', selected: false},
    {id: 2, name: 'Create, Collect & Capture', icon: 'create', className: 'create', selected: false},
    {id: 3, name: 'Analyze & Interpret', icon: 'show_chart', className: 'analyze', selected: false},
    {id: 4, name: 'Publish & Report', icon: 'share', className: 'publish', selected: false},
    {id: 5, name: 'Discover & Reuse', icon: 'search', className: 'discover', selected: false}
  ];

  selectedValue = [];
  @Output() selectedChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateModel() {
    const selectedValues = [];

    for (const activity of this.researchActivities) {
      if (activity.selected) {
        selectedValues.push(activity.id);
      }
    }

    console.log(selectedValues);

    this.selectedValue = selectedValues;
    this.selectedChange.emit(selectedValues);

    // this.selected(selectedValues);
  }

  // set selected(val) {
  //
  // }

}
