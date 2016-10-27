import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class DrupalService {
  private rootUrl = "https://localhost:3027/";
  private thisUrl = "https://researchit.cer.auckland.ac.nz/api/content";

  constructor(private http:Http) {
  }

 search(category:string, searchChange:Subject<any>, debounceDuration = 400) {
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawSearch(category, value.searchTerm, value.subcategories));
  }
      
 contentsearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawContentSearch(category, value.searchTerm, value.subcategories));
  }
     
  contentdetailsearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
      return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.rawdetailSearch(category, value.searchTerm, value.subcategories));
  }

  rawSearch(category:string, term:string, subcategories:any[]) {
    var search = new URLSearchParams();

    if (term != undefined && term.trim() != "") {
      search.set('q', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          search.set(subcat.key, subcat.value);
      }
    }

     return this.http
      .get(this.rootUrl + category, {search})
      .map((response) => response.json());
  }
  
  rawContentSearch(category:string, term:string, subcategories:any[]) {
    var search = new URLSearchParams();

    if (term != undefined && term.trim() != "") {
      search.set('q', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          search.set(subcat.key, subcat.value);
      }
    }


       return this.http
      .get(this.thisUrl + "?type=" + category, {search})
      .map((response) => response.json());
      
   
  }
  
 rawdetailSearch(category:string, term:string, subcategories:any[]) {
    var search = new URLSearchParams();

    if (term != undefined && term.trim() != "") {
      search.set('q', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          search.set(subcat.key, subcat.value);
      }
    }


       return this.http
      .get(this.thisUrl + "/" + category, {search})
      .map((response) => response.json());
      
   
  }
}



