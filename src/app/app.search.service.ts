import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";

@Injectable()
export class SearchService {
  private searchTerm: string;
  private subcategories: string[];
  searchChange: Subject<any> = new Subject<any>();

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

  setSubcategories(subcategories)
  {
    this.subcategories = subcategories;
    this.searchChange.next(this.getSearch());
  }
}
