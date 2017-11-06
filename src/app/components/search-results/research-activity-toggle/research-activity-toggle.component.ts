import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


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

  public researchActivities = [
    {id: 1, name: 'Plan & Design', icon: 'mdi-timetable', className: 'plan', selected: false},
    {id: 2, name: 'Create, Collect & Capture', icon: 'mdi-google-circles-extended', className: 'create', selected: false},
    {id: 3, name: 'Analyze & Interpret', icon: 'mdi-chart-areaspline', className: 'analyze', selected: false},
    {id: 4, name: 'Publish & Report', icon: 'mdi-cube-send', className: 'publish', selected: false},
    {id: 5, name: 'Discover & Reuse', icon: 'mdi-sync', className: 'discover', selected: false}
  ];

  @Input() _value: number[] = [];
  onChange: any = () => { };
  onTouched: any = () => { };

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.updateState();
  }

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  updateState() {
    for (const activity of this.researchActivities) {
      activity.selected = this._value.indexOf(activity.id) >= 0;
    }
  }

  updateValue() {
    const selectedResearchActivities = [];

    for (const activity of this.researchActivities) {
      if (activity.selected) {
        selectedResearchActivities.push(activity.id);
      }
    }

    this.value = selectedResearchActivities;
  }
}
