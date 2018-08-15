import { Injectable } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchFiltersService {

  readonly filtersForm : FormGroup;
  private categoriesSubject: Subject<Array<Object>>;
  currentCategories$ : Observable<Array<Object>>;

  constructor() {
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl(),
      categories: new FormControl([])
    });
    this.categoriesSubject = new Subject<Array<Object>>();
    this.currentCategories$ = this.categoriesSubject.asObservable();
  }

  setSearchResultCategories(categories : Array<Object>){
    this.categoriesSubject.next(categories);
  }
}
