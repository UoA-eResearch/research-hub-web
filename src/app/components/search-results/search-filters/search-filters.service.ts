import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CategoryId } from 'app/services/options.service';

export const DEFAULT_FILTERS_VALUE = {
  categoryId: CategoryId.All,
  personTags: [],
  orgUnitTags: [],
  researchActivityIds: [],
  categories: []
}

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;

  constructor() {
    this.filtersForm = this.createFilters();
  }

  /**
  * Create and return a new filters FormGroup that has the same
  * values as the current filters.
  * Used for filter dialog which does not change values instantly.
  */
  public duplicateFilters() : FormGroup {
    const duplicate = this.createFilters();
    duplicate.patchValue(this.filtersForm.getRawValue());
    return duplicate;
  }

  private createFilters() : FormGroup {
    const newFilters = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl(),
      categories: new FormControl([])
    });
    newFilters.patchValue(DEFAULT_FILTERS_VALUE);
    return newFilters;
  }
}
