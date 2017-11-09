import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';


export class SearchBarParams {
  public category: string;
  public searchText: string;
}


@Injectable()
export class SearchBarService {

  searchBarVisibilityChange: Subject<any> = new Subject<any>();
  searchChange: Subject<any> = new Subject<any>();
  searchCategoryChange: Subject<any> = new Subject<any>();
  searchTextChange: Subject<any> = new Subject<any>();
  isVisible: boolean;
  searchText: string;
  category: string;

  constructor() { }

  setVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
    this.searchBarVisibilityChange.next(isVisible);
  }

  setCategory(category) {
    if (category !== undefined) {
      this.category = category;
      this.searchCategoryChange.next(category);
      this.searchChange.next(this.getSearchParams());
    }
  }

  setSearchText(searchText) {
    if (searchText !== undefined) {
      this.searchText = searchText;
      this.searchTextChange.next(searchText);
      this.searchChange.next(this.getSearchParams());
    }
  }

  getCategory() {
    return this.category;
  }

  getSearchText() {
    return this.searchText;
  }

  getSearchParams(): SearchBarParams {
    return {searchText: this.searchText, category: this.category} as SearchBarParams;
  }
}
