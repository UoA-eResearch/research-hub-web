import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";

@Injectable()
export class SearchService {
  private searchTerm: string;
  private subcategories: any;
  searchChange: Subject<any> = new Subject<any>();
  uiChange: Subject<any> = new Subject<any>();

  getSearch()
  {
    return {
      "searchTerm": this.searchTerm,
      "subcategories": this.subcategories
    };
  }

  findAll()
  {
    this.searchChange.next({});
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.searchChange.next(this.getSearch());
  }

  setSubcategories(subcategories, updateUI=false)
  {
    this.subcategories = subcategories;
    this.searchChange.next(this.getSearch());

    if(updateUI)
      this.uiChange.next(this.getSearch())
  }
}
