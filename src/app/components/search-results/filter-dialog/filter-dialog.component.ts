import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryId} from 'app/services/options.service';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent {

  @Input()
  public filtersForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl()
    });

    this.filtersForm.patchValue(data['rawFormValues']);
  }

  clear() {
    this.filtersForm.patchValue({categoryId: CategoryId.All, personTags: [], orgUnitTags: [], researchActivityIds: []});
  }

  done() {
    this.dialogRef.close(this.filtersForm.getRawValue());
  }
}
