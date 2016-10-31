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
     
  contentdetailsearch(category:string) {
     console.log('in content detail search ' + this.thisUrl + "/" + category);
      
       let doheaders = new Headers();
        doheaders.set('Accept', 'application/json');

       return this.http.get(this.thisUrl + "/" + category)
       .map(res => res.json())
       .subscribe(
         data => this.product = data,
         err => console.log(err),
         () => console.log('Completed', this.product)
     );
   //  console.log(this.product);
    
     //return this.product;
     
     // return this.http
    //  .get(this.thisUrl + "/" + category, {headers:doheaders})
    //  .map(this.extractData)
   //  .catch(this.handleError);
      
     
    }
    private extractData(res: Response) {
    let body = res.json();
    console.log(body.data);
    return body.data || { };
  }
     
     private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = "${error.status} - ${error.statusText || ''} ${err}";
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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
      .get(this.thisUrl + "?type=" + category, {search:dosearch, headers:doheaders})
      .map((response) => response.json());
   
  }
  
 rawdetailSearch(category:string, term:string, subcategories:any[]) {
 console.log('in raw detail search');
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
      console.log(this.thisUrl + "/" + category);
      let doheaders = new Headers();
    doheaders.set('Accept', 'application/json');
      return this.http
      .get(this.thisUrl + "/" + category, {search:dosearch, headers:doheaders})
      .map((response) => response.json());
      
   
  }
}



