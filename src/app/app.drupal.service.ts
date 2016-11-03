import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class DrupalService {
  private rootUrl = "https://localhost:3027/";
  thisUrl = "https://researchit.cer.auckland.ac.nz/api/content";
  
   product:any;
  
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
     
  rawSearch(category:string, term:string, subcategories:any[]) {
    var dosearch = new URLSearchParams();
      console.log(dosearch);
    if (term != undefined && term.trim() != "") {
      dosearch.set('search_string', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          dosearch.set(subcat.key, subcat.value);
      }
    }
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json');
      return this.http
      .get(this.thisUrl + "/" + category, {search:dosearch, headers:doheaders})
      .map((response) => response.json());
  }
  
  rawContentSearch(category:string, term:string, subcategories:any[]) {
     var dosearch = new URLSearchParams();
     
    if (term != undefined && term.trim() != "") {
      dosearch.set('search_string', term);
    }
    else if (subcategories != undefined) {
      for (let subcat of subcategories) {
        if (subcat.value != "" && subcat.value != undefined)
          dosearch.set(subcat.key, subcat.value);
      }
    }

    console.log(dosearch);
    let doheaders = new Headers();
    doheaders.set('Accept', 'application/json');
      return this.http
      .get(this.thisUrl + "?type=" + category, {search:dosearch, headers:doheaders})
      .map((response) => response.json());
   
  }
}



