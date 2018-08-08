import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;
  readonly filtersVisibilityChange : Subject<any> = new Subject<any>();

  constructor() {
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl()
    });
  }

  setSidenav(isOpen : boolean){

  }
}
