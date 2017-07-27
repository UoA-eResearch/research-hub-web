import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {

  searchChange: Subject<any> = new Subject<any>();
  searchText: string;
  category: string;

  constructor() { }

  setCategory(category) {
    this.category = category;
    this.searchChange.next(this.getSearchParams());
  }

  setSearchText(searchText) {
    this.searchText = searchText;
    this.searchChange.next(this.getSearchParams());
  }

  getCategory() {
    return this.category;
  }

  getSearchText() {
    return this.searchText;
  }

  getSearchParams() {
    return {searchText: this.searchText, category: this.category};
  }
}
