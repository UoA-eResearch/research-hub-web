import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {ApiService} from 'app/services/api.service';
import {AuthService} from '../../services/auth.service';
import {MatHorizontalStepper} from '@angular/material/stepper';
import {AppComponentService} from '../../app.component.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from '../shared/error-dialog/error-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AnalyticsService} from '../../services/analytics.service';
import * as format from 'date-fns/format';

interface DataPerson {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  access: string;
  roles: string[];
}


@Component({
  selector: 'app-request-data',
  templateUrl: './request-data.component.html',
  styleUrls: ['./request-data.component.scss']
})
export class RequestDataComponent implements OnInit, OnDestroy {
  // private static requestFormKey = 'requestDataForm';

  @ViewChild('stepper') stepper: MatHorizontalStepper;
  public dateToday = new Date();
  public submitting = false;
  private routeParamsSub: Subscription;
  public title = 'Request for Storage';
  public response: any;
  public storageTypeForm: FormGroup;
  public projectForm: FormGroup;
  public dataInfoForm: FormGroup;
  public dataSizeForm: FormGroup;
  public projectMembersCtrl = new FormControl([] as DataPerson[], Validators.required);

  public fieldOfResearchCodes = [
    '01 Mathematical Sciences',
    '02 Physical Sciences',
    '03 Chemical Sciences',
    '04 Earth Sciences',
    '05 Environmental Sciences',
    '06 Biological Sciences',
    '07 Agricultural and Veterinary Sciences',
    '08 Information and Computing Sciences',
    '09 Engineering',
    '10 Technology',
    '11 Medical and Health Sciences',
    '12 Built Environment and Design',
    '13 Education',
    '14 Economics',
    '15 Commerce, Management, Tourism and Services',
    '16 Studies in Human Society',
    '17 Psychology and Cognitive Sciences',
    '18 Law and Legal Studies',
    '19 Studies in Creative Arts and Writing',
    '20 Language, Communication and Culture',
    '21 History and Archaeology',
    '22 Philosophy and Religious Studies',
    'Other'
  ];

  public dataRequirements = [
    'Part of a funded project research',
    'Requires human ethics research',
    'Requires animal ethics',
    'Part of clinical research',
    'Research involving children',
    'Commercially sensitive',
    'Research involves patent application',
    'Requires encryption on disk',
    'Need for external collaborator access',
    'Requirement to delete data at end of project',
    'Other'
  ];

  public units = [
    'Gigabytes',
    'Terabytes'
  ];

  public access = [
    'Full Access',
    'Read Only'
  ];

  public roleTypes = [
    'Data Owner',
    'Data Contact'
  ];

  constructor(private formBuilder: FormBuilder, dateAdapter: DateAdapter<NativeDateAdapter>,
              private apiService: ApiService, public authService: AuthService, private appComponentService: AppComponentService,
              public dialog: MatDialog, private location: Location, private route: ActivatedRoute,
              private analyticsService: AnalyticsService) {
    dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.addPerson();

    this.analyticsService.trackIntegratedService(this.title, this.location.path());

    this.storageTypeForm = this.formBuilder.group({
      storageType: new FormControl(undefined, Validators.required)
    });

    this.projectForm = this.formBuilder.group({
      title: new FormControl(undefined, Validators.required),
      abstract: new FormControl(undefined, Validators.required),
      endDate: new FormControl(undefined, Validators.required),
      fieldOfResearch: new FormControl(undefined, Validators.required),
    });

    this.dataInfoForm = this.formBuilder.group({
      dataRequirements: new FormControl(undefined, Validators.required),
      shortName: new FormControl(undefined, Validators.required),
      projectMembers: this.projectMembersCtrl
    });

    this.dataSizeForm = this.formBuilder.group({
      sizeThisYear: new FormControl(undefined, Validators.required),
      unitThisYear: new FormControl(undefined, Validators.required),
      sizeNextYear: new FormControl(undefined, Validators.required),
      unitNextYear: new FormControl(undefined, Validators.required),
      comments: new FormControl(undefined, Validators.required)
    });
  }

  addPerson() {
    this.projectMembersCtrl.value.push({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      username: undefined,
      access: undefined,
      roles: []
    });
  }

  deletePerson(index: number) {
    this.projectMembersCtrl.value.splice(index, 1);
  }

  ngOnDestroy() {
    // this.routeParamsSub.unsubscribe();
  }

  showErrorDialog(title: string, message: string, closeButtonName: string, timeout: number) {
    return this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        message: message,
        closeButtonName: closeButtonName,
        timeout: timeout
      }
    });
  }

  submit() {
    const isValid = this.dataSizeForm.valid;
    this.dataSizeForm.markAsTouched();
    this.dataSizeForm.markAsDirty();
    this.dataSizeForm.markAsTouched();

    if (isValid) {
      this.submitting = true;

      const body = Object.assign({},
        this.storageTypeForm.getRawValue(),
        this.projectForm.getRawValue(),
        this.dataInfoForm.getRawValue(),
        this.dataSizeForm.getRawValue());

      // Convert endDate and projectMembers into strings
      body.endDate = format(body.endDate, 'YYYY-MM-DD');
      body.projectMembers = body.projectMembers.map((p) => {
        return `${p.firstName} ${p.lastName}, ${p.email}, ${p.username}, ${p.access}, ${p.roles.join(', ')}`
      });

      this.apiService.requestService('storage', body)
        .subscribe(
          (response) => {
            this.analyticsService.trackActionIntegrated(this.title);
            this.response = response;
            this.stepper.selectedIndex = 4; // Navigate to lat step
          });
    }
  }
}
