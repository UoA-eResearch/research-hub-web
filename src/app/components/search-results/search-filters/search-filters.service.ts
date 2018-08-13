import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;

  constructor() {
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl()
    });
  }
}
