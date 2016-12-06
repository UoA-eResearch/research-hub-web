import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, URLSearchParams, Headers} from "@angular/http";

@Injectable()
export class DrupalService {
  drupalUrl = "https://researchit.cer.auckland.ac.nz:8080/";
  taxonomyUrl = this.drupalUrl + "taxonomy_term.json";
  contentUrl = this.drupalUrl + "node.json";

  constructor(private http:Http) {

  }

  getAllTaxonomies() {
    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.taxonomyUrl, {headers: headers})
      .map((response) => DrupalService.formatAllTaxonomies(response));
  }

  static formatAllTaxonomies(response) {
    let data = response.json();
    let terms = {};
    for (let i = 0; i < data.list.length; i++) {
      let item = data.list[i];
      terms[item.tid] = item;
    }
    return terms;
  }

  getTaxonomy(taxonomyId) {
    let search = new URLSearchParams();
    search.set("vocabulary", taxonomyId);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.taxonomyUrl, {search: search, headers: headers})
      .map((response) => DrupalService.formatTaxonomy(response));
  }

  static formatTaxonomy(response) {
    let data = response.json();
    let terms = [];
    for (let i = 0; i < data.list.length; i++) {
      let item = data.list[i];
      terms.push({id: item.tid, name: item.name});
    }
    return terms;
  }

  getProduct(productId) {
    let search = new URLSearchParams();
    search.set("nid", productId);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http.get(this.contentUrl, {search: search, headers: headers})
      .map((response) => DrupalService.formatProduct(response));
  }

  static formatProduct(response) {
    let data = response.json();

    if (data.list && data.list.length > 0)
      return data.list[0];
    return {};
  }

  getProducts(type, termIds) {
    let search = new URLSearchParams();

    if (type)
      search.set("type", type);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.contentUrl, {search: search, headers: headers})
      .map((response) => DrupalService.filterProducts(response, undefined, termIds));
  }

  static productContainsTerms(product:any, termIds:string[]) {
    let taxonomyFields = [product.field_research_lifecycle_stage, product.field_category, product.field_programme, product.field_study_level]; //All possible taxonomy fields for a product
    let numFieldsMatched = 0;

    for (let i = 0; i < termIds.length; i++) {
      let termId = termIds[i];

      for (let j = 0; j < taxonomyFields.length; j++) {
        let field = taxonomyFields[j];

        if (field) {
          for (let k = 0; k < field.length; k++) {
            let fieldTerm = field[k];

            if (fieldTerm.id == termId) {
              numFieldsMatched += 1;
              break;
            }
          }
        }
      }
    }
    return termIds.length == numFieldsMatched;
  }

  productSearch(searchChange:Subject<any>, debounceDuration=400) {
    return searchChange
      .debounceTime(debounceDuration)
      .distinctUntilChanged()
      .switchMap(value => this.getProductsSearch(value.productType, value.searchTerm, value.termIds));
  }

  getProductsSearch(type, searchTerm, termIds) {
    console.log('type', type, 'searchTerm', searchTerm, 'termIds', termIds);

    let search = new URLSearchParams();

    if (type)
      search.set("type", type);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.contentUrl, {search: search, headers: headers})
      .map((response) => DrupalService.filterProducts(response, searchTerm, termIds));
  }

  static filterProducts(response, searchTerm, termIds) {
    let data = response.json();

    let products = [];
    for (let i = 0; i < data.list.length; i++) {
      let product = data.list[i];
      let bodyContainsSearchTerm = !searchTerm || DrupalService.productBodyContainsText(product, searchTerm);
      let termIdsMatch = termIds.length == 0 || DrupalService.productContainsTerms(product, termIds);

      if (bodyContainsSearchTerm && termIdsMatch)
        products.push(product);
    }

    return products;
  }

  static productBodyContainsText(product, searchTerm) {
    var re = new RegExp("\w*(" + searchTerm.trim() + ")\w*", 'gi');
    let matches = re.exec(product.body.value);
    return matches != null;
  }
}
