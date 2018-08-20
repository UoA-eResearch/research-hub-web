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

  onChipClick(activityId) {
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
    Object.keys(this.model).forEach(key => {
      this.model[key].selected = this._value.indexOf(+key) >= 0;
    });
  }

  updateValue() {
    const selectedResearchActivities = [];

    Object.keys(this.model).forEach(key => {
      const isSelected = this.model[key].selected;

      if (isSelected) {
        selectedResearchActivities.push(+key);
      }
    });

    this.value = selectedResearchActivities;
  }
}
