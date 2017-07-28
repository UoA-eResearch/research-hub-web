import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import {Subject} from "rxjs/Subject";


export class ContentItemsSearchParams {
  private page = 0;
  private size = 50;
  private contentTypes: number[];
  private contentSubtypes: number[];
  private orgUnits: number[];
  private researchPhases: number[];
  private people: number[];
  private searchText: string;

  public setPage(page: number) {
    this.page = page;
  }

  public setSize(size: number) {
    this.size = size;
  }

  public setContentTypes(contentTypes: number[]) {
    this.contentTypes = contentTypes;
  }

  public setContentSubtypes(contentSubtypes: number[]) {
    this.contentSubtypes = contentSubtypes;
  }

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public setResearchPhases(researchPhases: number[]) {
    this.researchPhases = researchPhases;
  }

  public setPeople(people: number[]) {
    this.people = people;
  }

  public setSearchText(searchText: string) {
    this.searchText = searchText;
  }

  public getUrlSearchParams() {
    const params = new URLSearchParams();

    let page = this.page;
    let size = this.size;
    if (page == null || page < 0) {
      page = 0;
    }

    if (size == null || size > 50) {
      size = 50;
    }

    params.set('page', page.toString());
    params.set('size', size.toString());

    const names = ['contentTypes', 'contentSubtypes', 'orgUnits', 'researchPhases', 'people'];
    const variables = [this.contentTypes, this.contentSubtypes, this.orgUnits, this.researchPhases, this.people];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const variable = variables[i];

      if (variable != null && variable.length > 0) {
        params.set(name, variable.join(','));
      }
    }

    if (this.searchText != null && this.searchText.trim() !== '') {
      params.set('searchText', this.searchText.trim());
    }

    return params;
  }
}


export class SearchParams {
  public categories: number[];
  public subcategories: number[];
  public searchText: string;

  constructor() {
    this.categories = [];
    this.subcategories = [];
  }

  public getSearchParams() {
    const params = new URLSearchParams();

    const names = ['categories', 'subcategories'];
    const variables = [this.categories, this.subcategories];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const variable = variables[i];

      if (variable != null && variable.length > 0) {
        params.set(name, variable.join(','));
      }
    }

    if (this.searchText != null && this.searchText.trim() !== '') {
      params.set('searchText', this.searchText.trim());
    }

    return params;
  }
}


@Injectable()
export class ApiService {

  private static PERSON_URL = 'person';
  private static CATEGORY_URL = 'category';
  private static CONTENT_URL = 'content';
  private static SEARCH_URL = 'search';
  private static ORG_UNIT_URL = 'orgUnit';
  private host = 'http://localhost:8080/';


  static getPaginationParams(page = 0, size = 50) {
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

  getSearchResults(searchParams: SearchParams) {
    const search = searchParams.getSearchParams();
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.SEARCH_URL, {search: search, headers: headers})
      .map((response) => response.json());
  }

  getCategory(categoryName) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    return this.http
      .get(this.host + ApiService.CATEGORY_URL + '/' + categoryName, {headers: headers})
      .map((response) => response.json());
  }

  getContentItems(searchParams: ContentItemsSearchParams) {
    const search = searchParams.getUrlSearchParams();
    console.log('search-bar params', search);
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
