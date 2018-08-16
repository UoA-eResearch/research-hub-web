import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CategoryId } from 'app/services/options.service';

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;

  constructor() {
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl(),
      categories: new FormControl([])
    });
  }

  public resetFilters(){
    this.filtersForm.patchValue({categoryId: CategoryId.All, personTags: [], orgUnitTags: [], researchActivityIds: []});
  }
}
