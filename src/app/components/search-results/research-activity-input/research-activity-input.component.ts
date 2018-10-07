import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {OptionsService} from 'app/services/options.service';


@Component({
  selector: 'app-research-activity-input',
  templateUrl: './research-activity-input.component.html',
  styleUrls: ['./research-activity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ResearchActivityInputComponent),
      multi: true
    }
  ]
})
export class ResearchActivityInputComponent implements OnInit, ControlValueAccessor {

  public model = {};

  @Input() _value: number[] = [];
  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  /**
   * Determines whether we show the larger, thicker inputs that are touch-friendly.
   */
  @Input() touchFriendly : boolean = false;


  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
    this.updateState();
  }

  constructor(public optionsService: OptionsService) {
    for (const activity of optionsService.researchActivityOptions) {
      this.model[activity.id] = {selected: false};
    }
  }

  ngOnInit() {
  }

  onToggle(activityId,toggleEvent) {
    const selectedActivities = Object.keys(this.model).map(
      (key) =>
        (this.model[key].selected ? key : null));
    const filteredActivities = selectedActivities.filter(
      (activityId) =>
        (activityId !== null));
    if (filteredActivities.length === 1 &&
        parseInt(filteredActivities[0]) === activityId){
      // Do not allow users to deselect the only selected research activity.
      // Reset the toggle state if required.
      // TODO In Angular Material 6 we can disable internal state in
      // the slide toggles - use that instead when we migrate:
      // https://material.angular.io/components/slide-toggle/api#MatSlideToggleDefaultOptions
      if (!toggleEvent.checked){
        toggleEvent.source.toggle();
      }
      return;
    }
    this.model[activityId].selected = !this.model[activityId].selected;
    this.updateValue();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value === null || value === undefined){
      value = [];
    }
    this.value = value;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  updateState() {
    if (this._value.length === 0){
      // If no research activity is selected in filter,
      //we should show all research activites as toggled.
      Object.keys(this.model).forEach(key => {
        this.model[key].selected = true;
      });
    } else {
      Object.keys(this.model).forEach(key => {
        this.model[key].selected = this._value.indexOf(+key) >= 0;
      });
    }
  }

  updateValue() {
    const selectedActivities = Object.keys(this.model).map(
      key => (this.model[key].selected ? +key : null));
    const filteredActivities = selectedActivities.filter(
      key => (key !== null));


     if (selectedActivities.length === filteredActivities.length) {
      // If every research activity is selected,
      // the research activity filter should be
      // empty in order to show ALL content - those that
      // are applicable to all research activities and
      // also those that apply to none.
      this.value = [];
    } else {
      this.value = filteredActivities;
    }
  }
}
