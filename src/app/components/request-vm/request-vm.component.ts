import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {ApiService} from 'app/services/api.service';
import {Content} from 'app/model/Content';
import {AuthService} from '../../services/auth.service';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {AppComponentService} from '../../app.component.service';


@Component({
  selector: 'app-request-vm',
  templateUrl: './request-vm.component.html',
  styleUrls: ['./request-vm.component.scss']
})
export class RequestVmComponent implements OnInit {

  @ViewChild('stepper') stepper: MatHorizontalStepper;
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
              private apiService: ApiService, public authService: AuthService, private appComponentService: AppComponentService) {
    dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.appComponentService.setTitle('Request a Virtual Machine');

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

  stepChanged(event) {
    console.log('event: ', event);
  }

  submit() {
    const isValid = this.requestVmForm.valid;
    this.dateCtrl.markAsTouched();
    this.timeCtrl.markAsDirty();
    this.timeCtrl.markAsTouched();

    console.log('Is Valid: ', isValid, this.requestVmForm);

    if (isValid) {
      // this.appComponentService.setProgressBarVisibility(true);
      this.submitting = true;
      const values = this.requestVmForm.getRawValue();
      this.apiService.requestVm(values.date, values.time, values.comments).subscribe((response) => {
        this.appComponentService.setProgressBarVisibility(false);
        this.stepper.selectedIndex = 1;
        console.log('requestVM response', response);
      });
    }
  }
}

// ng build --prod --aot --build-optimizer
