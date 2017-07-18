import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';

@Injectable()
export class ApiService {

  private static PERSON_URL = 'person';
  private static CATEGORY_URL = 'category';
  private static CONTENT_URL = 'content';
  private static ORG_UNIT_URL = 'orgUnit';
  private host = 'http://localhost:8080/';


  static getPaginationParams(page, size) {
    if (page < 0) {
      page = 0;
    }

    if (size > 50) {
      size = 50;
    }

    const search = new URLSearchParams();
    search.set('page', page.toString());
    search.set('size', size.toString());

    return search;
  }

  constructor(private http: Http) {

  }

  getCategory(categoryName) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    return this.http
      .get(this.host + ApiService.CATEGORY_URL + '/' + categoryName, {headers: headers})
      .map((response) => response.json());
  }

  getContentItems(page = 0, size = 50) {
    const search = ApiService.getPaginationParams(page, size);

    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.CONTENT_URL, {search: search, headers: headers})
      .map((response) => response.json());
  }

  getContentItem(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.CONTENT_URL + '/' + id, {headers: headers})
      .map((response) => response.json());
  }

  getPeople(page = 0, size = 50) {
    const search = ApiService.getPaginationParams(page, size);
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL, {search: search, headers: headers})
      .map((response) => response.json());
  }

  getPerson(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL + '/' + id, {headers: headers})
      .map((response) => response.json());
  }

  getOrgUnits(page = 0, size = 50) {
    const search = ApiService.getPaginationParams(page, size);
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.ORG_UNIT_URL, {search: search, headers: headers})
      .map((response) => response.json());
  }

  getOrgUnit(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.ORG_UNIT_URL + '/' + id, {headers: headers})
      .map((response) => response.json());
  }
}
