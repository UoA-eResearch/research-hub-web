import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {ApiService} from 'app/services/api.service';
import {Content} from 'app/model/Content';
import {AuthService} from '../../services/auth.service';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {AppComponentService} from '../../app.component.service';
import {HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/retryWhen';


@Component({
  selector: 'app-request-vm',
  templateUrl: './request-vm.component.html',
  styleUrls: ['./request-vm.component.scss']
})
export class RequestVmComponent implements OnInit {

  private static requestVmFormKey = 'requestVmForm';

  @ViewChild('stepper') stepper: MatHorizontalStepper;
  public requestVmForm: FormGroup;
  public times = [];
  public dateToday = new Date();
  public dateCtrl = new FormControl(undefined, Validators.required);
  public timeCtrl = new FormControl(undefined, Validators.required);
  public researchVmContentId = 1;
  public content: Content;
  public submitting = false;
  public response: any;
  public title = 'Request a Research Virtual Machine';


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
              private apiService: ApiService, public authService: AuthService, private appComponentService: AppComponentService) {
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
        this.appComponentService.setTitle(this.title);
      });

    // this.loadForm();
  }

  // saveForm() {
  //   localStorage.setItem(RequestVmComponent.requestVmFormKey, JSON.stringify(this.requestVmForm.getRawValue()));
  // }
  //
  // loadForm() {
  //   const item = localStorage.getItem(RequestVmComponent.requestVmFormKey);
  //
  //   if (item !== null) {
  //     const value = JSON.parse(item);
  //     console.log(RequestVmComponent.requestVmFormKey, value);
  //     this.requestVmForm.setValue(value);
  //   }
  // }
  //
  // clearForm() {
  //   localStorage.removeItem(RequestVmComponent.requestVmFormKey)
  // }

  submit() {
    const isValid = this.requestVmForm.valid;
    this.dateCtrl.markAsTouched();
    this.timeCtrl.markAsDirty();
    this.timeCtrl.markAsTouched();

    if (isValid) {
      this.submitting = true;
      const values = this.requestVmForm.getRawValue();

      this.apiService.requestVm(values.date, values.time, values.comments)
        .subscribe(
          (response) => {
            this.response = response;
            this.stepper.selectedIndex = 1; // Navigate to second step
            // this.clearForm();
            // TODO: set Done step to completed so that a tick appears next to 'Done', doesn't work at the moment
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log(`A client-side or network error occurred: ${err.error.message}`);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`, err);

              // if (err.status === 401) {
              //   // this.saveForm();
              //   this.authService.login();
              // }
            }
          });
    }
  }
}
