import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {ApiService} from 'app/services/api.service';
import {Content} from 'app/model/Content';

@Component({
  selector: 'app-request-vm',
  templateUrl: './request-vm.component.html',
  styleUrls: ['./request-vm.component.scss']
})
export class RequestVmComponent implements OnInit {

  public requestVmForm: FormGroup;
  public times = [];
  public dateToday = new Date();
  public dateCtrl = new FormControl(undefined, Validators.required);
  public timeCtrl = new FormControl(undefined, Validators.required);
  public researchVmContentId = 1;
  public content: Content;
  public submitting = false;

  private static getTimes() {
    const times = [];

    for (let i = 9; i < 17; i++) {
      let time = '';

      if (i < 10) {
        time += '0';
      }

      time += i;

      times.push(time + ':00');
      times.push(time + ':30');
    }

    return times;
  }

  constructor(private formBuilder: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>,
              private apiService: ApiService) {
    dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.times = RequestVmComponent.getTimes();

    this.requestVmForm = this.formBuilder.group({
      date: this.dateCtrl,
      time: this.timeCtrl,
      comments: ['']
    });

    this.apiService.getContent(this.researchVmContentId).subscribe(
      content => {
        this.content = content;
      });
  }

  submit() {
    const isValid = this.requestVmForm.valid;
    this.dateCtrl.markAsTouched();
    this.timeCtrl.markAsDirty();
    this.timeCtrl.markAsTouched();

    console.log('Is Valid: ', isValid, this.requestVmForm);

    if (isValid) {
      this.submitting = true;
      const values = this.requestVmForm.getRawValue();
      this.apiService.requestVm(values.date, values.time, values.comments).subscribe((response) => {
        console.log('requestVM response', response);
      });
    }
  }

}

// ng build --prod --aot --build-optimizer
