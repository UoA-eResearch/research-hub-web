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

  searchCategory (category:string, term: string) {
    var search = new URLSearchParams();
    search.set('q', term);
    return this.http
      .get(this.rootUrl + category, { search })
      .map((response) => response.json());
  }
}
