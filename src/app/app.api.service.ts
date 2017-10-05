import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http';
import {Subject} from "rxjs/Subject";
import {Page} from "./model/Page";
import {Person} from "./model/Person";
import {Content} from "./model/Content";
import {environment} from 'app/../environments/environment';
import {Policy} from "./model/Policy";
import {OrgUnit} from "./model/OrgUnit";
import {GuideCategory} from "./model/GuideCategory";


export enum OrderBy {
  Relevance = 1,
  Alphabetical
}


export class SearchParams {
  private page = 0;
  private size = 1000;
  private searchText: string;
  private orderBy: OrderBy = OrderBy.Relevance;

  public static getIdArrayUrlParams(params: URLSearchParams, names: string[], idArrays: number[][]) {

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const variable = idArrays[i];

      if (variable != null && variable.length > 0) {
        params.set(name, variable.join(','));
      }
    }

    return params;
  }

  public setPage(page: number) {
    this.page = page;
  }

  public setSize(size: number) {
    this.size = size;
  }

  public setSearchText(searchText: string) {
    this.searchText = searchText;
  }

  public setOrderBy(orderBy: OrderBy) {
    this.orderBy = orderBy;
  }

  public getUrlSearchParams() {
    const params = new URLSearchParams();

    let page = this.page;
    let size = this.size;
    if (page == null || page < 0) {
      page = 0;
    }

    if (size == null || size < 1) {
      size = 1;
    }

    params.set('page', page.toString());
    params.set('size', size.toString());

    if (this.searchText != null && this.searchText.trim() !== '') {
      params.set('searchText', this.searchText.trim());
    }

    // TODO: replace when upgrade to typescript 2.4 which supports string enums
    if (this.orderBy === OrderBy.Relevance) {
      params.set('orderBy', 'relevance');
    } else if (this.orderBy === OrderBy.Alphabetical) {
      params.set('orderBy', 'alphabetical');
    }

    return params;
  }
}



export class PeopleSearchParams extends SearchParams {

  private orgUnits: number[];

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public getUrlSearchParams() {
    const params = super.getUrlSearchParams();

    const names = ['orgUnits'];
    const variables = [this.orgUnits];
    SearchParams.getIdArrayUrlParams(params, names, variables);

    return params;
  }
}

export class ContentItemsSearchParams extends SearchParams {

  private contentTypes: number[];
  private researchPhases: number[];
  private people: number[];
  private orgUnits: number[];

  public setContentTypes(contentTypes: number[]) {
    this.contentTypes = contentTypes;
  }

  public setResearchPhases(researchPhases: number[]) {
    this.researchPhases = researchPhases;
  }

  public setPeople(people: number[]) {
    this.people = people;
  }

  public setOrgUnits(orgUnits: number[]) {
    this.orgUnits = orgUnits;
  }

  public getUrlSearchParams() {
    const params = super.getUrlSearchParams();

    const names = ['contentTypes', 'researchPhases', 'people', 'orgUnits'];
    const variables = [this.contentTypes, this.researchPhases, this.people, this.orgUnits];
    SearchParams.getIdArrayUrlParams(params, names, variables);

    return params;
  }
}


@Injectable()
export class ApiService {

  private static POLICY_URL = 'policy';
  private static PERSON_URL = 'person';
  private static CATEGORY_URL = 'category';
  private static GUIDE_CATEGORY_URL = 'guideCategory';
  private static CONTENT_URL = 'content';
  private static SIMILAR_CONTENT_URL = 'similarContent';
  private static ORG_UNIT_URL = 'orgUnit';
  private static ASSET_URL = 'assets/';
  private host = environment.apiUrl;


  constructor(private http: Http) {

  }

  getAssetUrl(fileName: string) {
    const uriComponent = this.host + ApiService.ASSET_URL + fileName;
    return encodeURI(uriComponent.trim());
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

  getContentItemUserSupport(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.CONTENT_URL + '/' + id + '/userSupport', {headers: headers})
      .map((response) => Person.fromObjects(response.json()));
  }

  getGuideCategory(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.GUIDE_CATEGORY_URL + '/' + id, {headers: headers})
      .map((response) => GuideCategory.fromObject(response.json()));
  }


  getPeople(searchParams: PeopleSearchParams) {
    const search = searchParams.getUrlSearchParams();
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL, {search: search, headers: headers})
      .map((response) => Page.fromObject<Person>(response.json(), Person.fromObjects));
  }

  getPolicies(searchParams: SearchParams) {
    const search = searchParams.getUrlSearchParams();
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.POLICY_URL, {search: search, headers: headers})
      .map((response) => Page.fromObject<Policy>(response.json(), Policy.fromObjects));
  }

  getPerson(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL + '/' + id, {headers: headers})
      .map((response) => Person.fromObject(response.json()));
  }

  getPersonUserSupportContent(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.PERSON_URL + '/' + id + '/userSupportContent', {headers: headers})
      .map((response) => Content.fromObjects(response.json()));
  }

  getOrgUnits(searchParams: SearchParams) {
    const search = searchParams.getUrlSearchParams();
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.ORG_UNIT_URL, {search: search, headers: headers})
      .map((response) => Page.fromObject<OrgUnit>(response.json(), OrgUnit.fromObjects));
  }

  getOrgUnit(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.ORG_UNIT_URL + '/' + id, {headers: headers})
      .map((response) => OrgUnit.fromObject(response.json()));
  }

  getOrgUnitUserSupport(id) {
    const headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.host + ApiService.ORG_UNIT_URL + '/' + id + '/userSupport', {headers: headers})
      .map((response) => Person.fromObjects(response.json()));
  }
}
