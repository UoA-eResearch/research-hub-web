import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-research-activity-toggle',
  templateUrl: './research-activity-toggle.component.html',
  styleUrls: ['./research-activity-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResearchActivityToggleComponent),
      multi: true
    }
  ]
})
export class ResearchActivityToggleComponent implements OnInit, ControlValueAccessor {

  researchActivities = [
    {id: 1, name: 'Plan & Design', icon: 'map', className: 'plan', selected: false},
    {id: 2, name: 'Create, Collect & Capture', icon: 'create', className: 'create', selected: false},
    {id: 3, name: 'Analyze & Interpret', icon: 'show_chart', className: 'analyze', selected: false},
    {id: 4, name: 'Publish & Report', icon: 'share', className: 'publish', selected: false},
    {id: 5, name: 'Discover & Reuse', icon: 'search', className: 'discover', selected: false}
  ];

  selectedResearchActivities: any;
  propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
  }

  updateModel() {
    const selectedResearchActivities = [];

    for (const activity of this.researchActivities) {
      if (activity.selected) {
        selectedResearchActivities.push(activity.id);
      }
    }

    this.selectedResearchActivities = selectedResearchActivities;
    this.propagateChange(selectedResearchActivities);
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.selectedResearchActivities = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
