import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OptionsService} from 'app/services/options.service';


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

  constructor(public optionsService: OptionsService) { }

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
    // for (const activity of this.researchActivities) {
    //   activity.selected = this._value.indexOf(activity.id) >= 0;
    // }
  }

  updateValue() {
    const selectedResearchActivities = [];

    // for (const activity of this.researchActivities) {
    //   if (activity.selected) {
    //     selectedResearchActivities.push(activity.id);
    //   }
    // }

    this.value = selectedResearchActivities;
  }
}
