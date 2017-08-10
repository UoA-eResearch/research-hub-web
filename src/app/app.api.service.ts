import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {Page} from "./model/Page";
import {Person} from "./model/Person";
import {Content} from "./model/Content";
import {environment} from 'app/../environments/environment';


export class SearchParams {
  private page = 0;
  private size = 50;
  private searchText: string;

  public setPage(page: number) {
    this.page = page;
  }

  public setSize(size: number) {
    this.size = size;
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

    if (this.searchText != null && this.searchText.trim() !== '') {
      params.set('searchText', this.searchText.trim());
    }

    return params;
  }
}

export class ContentItemsSearchParams extends SearchParams {

  private contentTypes: number[];
  private contentSubtypes: number[];

  public setContentTypes(contentTypes: number[]) {
    this.contentTypes = contentTypes;
  }

  public setContentSubtypes(contentSubtypes: number[]) {
    this.contentSubtypes = contentSubtypes;
  }

  public getUrlSearchParams() {
    const params = super.getUrlSearchParams();

    const names = ['contentTypes', 'contentSubtypes'];
    const variables = [this.contentTypes, this.contentSubtypes];

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const variable = variables[i];

      if (variable != null && variable.length > 0) {
        params.set(name, variable.join(','));
      }
    }

    return params;
  }
}


@Injectable()
export class ApiService {

  private static PERSON_URL = 'person';
  private static CATEGORY_URL = 'category';
  private static CONTENT_URL = 'content';
  private static SIMILAR_CONTENT_URL = 'similarContent';
  private static ORG_UNIT_URL = 'orgUnit';
  private host = environment.apiUrl;


  constructor(private http: Http) {

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
    console.log('getContentItems', search);
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.CONTENT_URL, {search: search, headers: headers})
      .map((response) => Page.fromObject<Content>(response.json(), Content.fromObjects));
  }

  getSimilarContentItems(id: number) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.SIMILAR_CONTENT_URL + '/' + id, {headers: headers})
      .map((response) => Content.fromObjects(response.json()));
  }

  getContentItem(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.CONTENT_URL + '/' + id, {headers: headers})
      .map((response) => Content.fromObject(response.json()));
  }

  getPeople(searchParams: SearchParams) {
    const search = searchParams.getUrlSearchParams();
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL, {search: search, headers: headers})
      .map((response) => Page.fromObject<Person>(response.json(), Person.fromObjects));
  }

  getPerson(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL + '/' + id, {headers: headers})
      .map((response) => Person.fromObject(response.json()));
  }

  getOrgUnits(searchParams: SearchParams) {
    const search = searchParams.getUrlSearchParams();
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
