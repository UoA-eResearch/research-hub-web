import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryId} from 'app/services/options.service';
import { DEFAULT_FILTERS_VALUE } from '../search-filters/search-filters.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

  public filtersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filtersForm = data.form;
  }

  public clear() {
    this.filtersForm.patchValue(DEFAULT_FILTERS_VALUE);
  }

  public saveAndClose() {
    this.dialogRef.close(this.filtersForm);
  }
}
