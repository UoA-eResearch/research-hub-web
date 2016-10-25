import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class DrupalService {
  private rootUrl = "http://localhost:3027/";

  constructor(private http:Http) {
  }

  search(category:string, searchChange:Subject<any>, debounceDuration = 400) {
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawSearch(category, value.searchTerm, value.subcategories));
  }

  rawSearch(category:string, term:string, subcategories:any[]) {
    var search = new URLSearchParams();

    if (term != undefined)
      search.set('q', term);

    if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          search.set(subcat.key, subcat.value);
      }
    }

    return this.http
      .get(this.rootUrl + category, {search})
      .map((response) => response.json());
  }
}



