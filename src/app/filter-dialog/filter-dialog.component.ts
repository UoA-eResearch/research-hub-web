import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Person} from "../model/Person";
import {OrgUnit} from "../model/OrgUnit";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

  private searchCatSub: Subscription;
  private people: Person[];
  private orgUnits: OrgUnit[];
  private categories: any[];
  private filtersForm: FormGroup;
  private categoryFormControl: FormControl = new FormControl();
  private personFormControl: FormControl = new FormControl();
  private orgUnitFormControl: FormControl = new FormControl();
  private researchActivitiesFormControl: FormControl = new FormControl();
  private showPersonFilter = true;
  private showOrgUnitFilter = true;
  private showResearchActivityFilter = true;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.people = data['people'];
    this.orgUnits = data['orgUnits'];
    this.categories = data['categories'];

    this.filtersForm = new FormGroup({
      category: this.categoryFormControl,
      person: this.personFormControl,
      orgUnit: this.orgUnitFormControl,
      researchActivities: this.researchActivitiesFormControl
    });

    this.searchCatSub = this.categoryFormControl.valueChanges.subscribe((category) => {
      this.updateFilterVisibility(category);
    });

    this.filtersForm.patchValue(data['filtersFormValue']);
  }

  clear() {
    this.filtersForm.patchValue({category: 'all', person: '', orgUnit: '', researchActivities: []});
  }

  updateFilterVisibility(category: string) {
    if (category === 'people') {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = false;
    } else if (category === 'policies') {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = false;
      this.showResearchActivityFilter = false;
    } else {
      this.showPersonFilter = true;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = true;
    }
  }

  done() {
    this.dialogRef.close(this.filtersForm.getRawValue());
  }
}
