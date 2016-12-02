import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";

@Injectable()
export class SearchService {
  private searchTerm: string;
  private subcategories: any;
  private productType: string;
  searchChange: Subject<any> = new Subject<any>();
  uiChange: Subject<any> = new Subject<any>();

  getSearch()
  {
    return {
      "productType": this.productType,
      "searchTerm": this.searchTerm,
      "subcategories": this.subcategories,
      "termIds": this.getTermIds()
    };
  }

  getTermIds()
  {
    let termIds = [];
    console.log('subcats: ', this.subcategories);
    for (var key in this.subcategories) {
      if (this.subcategories.hasOwnProperty(key)) {
        let value = this.subcategories[key];
        console.log(value);
        if(value && value != "null" && value != "undefined")
          termIds.push(value)
      }
    }
    return termIds;
  }

  findAll()
  {
    this.searchChange.next(this.getSearch());
  }

  updateSearchParameters(productType, subcategories, updateUI=false)
  {
    this.productType = productType;
    this.subcategories = subcategories;
    this.searchChange.next(this.getSearch());

    if(updateUI)
      this.uiChange.next(this.getSearch())
  }

  setSearchTerm(searchTerm) {
    this.searchTerm = searchTerm;
    this.searchChange.next(this.getSearch());
  }
}
