import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  searchText: string;
  searchCategory: string;

  constructor() { }

  setSearchCategory(searchCategory) {
    this.searchCategory = searchCategory;
  }

  setSearchText(searchText) {
    this.searchText = searchText;
  }

  getSearchCategory() {
    return this.searchCategory;
  }

  getSearchText() {
    return this.searchText;
  }

}
