import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Jsonp, Http, URLSearchParams} from "@angular/http";

@Injectable()
export class DrupalService {
  private rootUrl = "http://localhost:3027/";

  constructor(private http: Http) {}

  getCategory(category)
  {
    return this.http
      .get(this.rootUrl + category)
      .map((response) => response.json());
  }

  searchCategory (category:string, term: string, subcategories: any[]) {
    console.log('search. category: ', category, 'term', term, 'subcats', subcategories);

    var search = new URLSearchParams();

    if(term != undefined)
      search.set('q', term);

    for (let subcat of subcategories) {
      if(subcat.value != "" && subcat.value != undefined)
        search.set(subcat.key, subcat.value);
    }

    return this.http
      .get(this.rootUrl + category, { search })
      .map((response) => response.json());
  }
}
