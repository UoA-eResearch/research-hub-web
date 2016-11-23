import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {Http, Response, URLSearchParams, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
// import moment = require("moment/moment");

@Injectable()
export class DrupalService {
  drupalUrl = "https://researchit.cer.auckland.ac.nz:8080/";
  taxonomyUrl = this.drupalUrl + "taxonomy_term.json";
  contentUrl = this.drupalUrl + "node.json";

  constructor(private http:Http) {

  }

  getAllTaxonomies()
  {
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

    if(data.list && data.list.length > 0)
      return data.list[0];
    return {};
  }

  getProducts(query) {
    let search = new URLSearchParams();

    if (query.type)
      search.set("type", query.type);

    let headers = new Headers();
    headers.set('Accept', 'application/json');

    return this.http
      .get(this.contentUrl, {search: search, headers: headers})
      .map((response) => DrupalService.formatProducts(response, query.taxonomyId));
  }

  static formatProducts(response, taxonomyId) {
    let data = response.json();

    let products = [];
    for (let i = 0; i < data.list.length; i++) {
      let product = data.list[i];

      if (product && (!taxonomyId || DrupalService.productContainsTaxonomy(product, taxonomyId)))
        products.push(product);
    }

    return products;
  }

  static productContainsTaxonomy(product:any, taxonomyId:string) {
    let taxonomies = [product.field_research_lifecycle_stage, product.field_category, product.field_programme, product.field_study_level]; //All possible taxonomy fields for a product

    for (let i = 0; i < taxonomies.length; i++) {
      let taxonomy = taxonomies[i];

      if (taxonomy) {
        for (let j = 0; j < taxonomy.length; j++) {
          let term = taxonomy[j];

          if (term.id == taxonomyId)
            return true;
        }
      }
    }
    return false;
  }

  // contentSearch(category:string, searchChange:Subject<any>, debounceDuration=400) {
  //
  //   return searchChange
  //     .debounceTime(debounceDuration)
  //     .distinctUntilChanged()
  //     .switchMap(value => this.rawContentSearch(category, value.searchTerm, value.subcategories));
  // }

  // search(category:string, searchChange:Subject<any>, debounceDuration = 400) {
  //   return searchChange
  //     .debounceTime(debounceDuration)
  //     .distinctUntilChanged()
  //     .switchMap(value => this.rawSearch(category, value.searchTerm, value.subcategories));
  // }
  //
  // contentSearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
  //
  //   return searchChange
  //     .debounceTime(debounceDuration)
  //     .distinctUntilChanged()
  //     .switchMap(value => this.rawContentSearch(category, value.searchTerm, value.subcategories));
  // }
  //
  // frontSearch(category:string, searchChange:Subject<any>, debounceDuration = 400) {
  //   return searchChange
  //     .debounceTime(debounceDuration)
  //     .distinctUntilChanged()
  //     .switchMap(value => this.rawFrontSearch(category, value.searchTerm, value.subcategories));
  // }
  //
  // rawSearch(category:string, term:string, subcategories:any[]) {
  //   this.searchParams = new URLSearchParams();
  //   if (term != undefined && term.trim() != "") {
  //     this.searchParams.set('search_string', term);
  //   }
  //   else if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.value != "" && subcat.value != undefined)
  //         this.searchParams.set(subcat.key, subcat.value);
  //     }
  //   }
  //   let headers = new Headers();
  //   headers.set('Accept', 'application/json');
  //   return this.http
  //     .get(this.drupalUrl + "?limit=10000&fields=all", {search: this.searchParams, headers: headers})
  //     .map((response)=>response.json());
  //
  // }
  //
  // rawContentSearch(category:string, term:string, subcategories:any[]) {
  //   this.searchParams = new URLSearchParams();
  //   if (term != undefined && term.trim() != "") {
  //     this.searchParams.set('search_string', term);
  //   }
  //   else if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.value != "" && subcat.value != undefined)
  //         this.searchParams.set(subcat.key, subcat.value);
  //     }
  //   }
  //
  //   let headers = new Headers();
  //   headers.set('Accept', 'application/json');
  //
  //   if (category == 'lifecycle') {
  //     return this.http
  //       .get(this.drupalUrl + "?sort=nid&fields=all&sort_order=ASC&&limit=10000", {
  //         search: this.searchParams,
  //         headers: headers
  //       })
  //       .map((response) => this.extractData(response, category, subcategories));
  //   }
  //   else {
  //     return this.http
  //       .get(this.drupalUrl + "?sort=nid&fields=all&sort_order=ASC&&limit=10000&type=" + category, {
  //         search: this.searchParams,
  //         headers: headers
  //       })
  //       .map((response) => this.extractData(response, category, subcategories));
  //   }
  // }
  //
  // rawFrontSearch(category:string, term:string, subcategories:any[]) {
  //   this.searchParams = new URLSearchParams();
  //   if (term != undefined && term.trim() != "") {
  //     this.searchParams.set('search_string', term);
  //   }
  //   else if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.value != "" && subcat.value != undefined)
  //         this.searchParams.set(subcat.key, subcat.value);
  //     }
  //   }
  //
  //   let headers = new Headers();
  //   headers.set('Accept', 'application/json');
  //
  //   return this.http
  //     .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {search: this.searchParams, headers: headers})
  //     .map((response) => this.cleanData(response));
  // }
  //
  // populateTaxonomies(category:string, searchChange:Subject<any>, debounceDuration = 400) {
  //   return searchChange
  //     .debounceTime(debounceDuration)
  //     .distinctUntilChanged()
  //     .switchMap(value => this.callPopulateTaxonomies(category, value.searchTerm, value.subcategories));
  // }
  //
  // private callPopulateTaxonomies(category:string, term:string, subcategories:any[]) {
  //   let headers = new Headers();
  //   headers.set('Accept', 'application/json');
  //   if (category == 'cat_lifecycle') {
  //     return this.http
  //       .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers: headers})
  //       .map((response) => this.getLifecycleCat(response));
  //   }
  //   if (category == 'cat_service') {
  //     return this.http
  //       .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers: headers})
  //       .map((response) => this.getServiceCat(response));
  //   }
  //   if (category == 'cat_prog') {
  //     return this.http
  //       .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers: headers})
  //       .map((response) => this.getProgCat(response));
  //   }
  //   if (category == 'cat_study') {
  //     return this.http
  //       .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers: headers})
  //       .map((response) => this.getStudyCat(response));
  //   }
  //   if (category == 'cat_policy') {
  //     return this.http
  //       .get(this.drupalUrl + "?fields=all&sort_order=ASC&&limit=10000", {headers: headers})
  //       .map((response) => this.getPolicyCat(response));
  //   }
  // }
  //
  // private getLifecycleCat(response) {
  //   let res = response.json();
  //   let combo = [];
  //   let obj = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       for (let taxon of res[i].taxonomy) {
  //         if (taxon.vid == this.vid_lifecycle) {
  //           if (obj.indexOf(taxon.tid) == -1) {
  //             combo.push({key: taxon.tid, value: taxon.name});
  //             obj.push(taxon.tid);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return combo;
  // }
  //
  // private getServiceCat(response) {
  //   let res = response.json();
  //   let combo = [];
  //   let obj = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       for (let taxon of res[i].taxonomy) {
  //         if (taxon.vid == this.vid_service) {
  //           if (obj.indexOf(taxon.tid) == -1) {
  //             combo.push({key: taxon.tid, value: taxon.name});
  //             obj.push(taxon.tid);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return combo;
  // }
  //
  // private getProgCat(response) {
  //   let res = response.json();
  //   let combo = [];
  //   let obj = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       for (let taxon of res[i].taxonomy) {
  //         if (taxon.vid == this.vid_prog) {
  //           if (obj.indexOf(taxon.tid) == -1) {
  //             combo.push({key: taxon.tid, value: taxon.name});
  //             obj.push(taxon.tid);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return combo;
  // }
  //
  // private getStudyCat(response) {
  //   let res = response.json();
  //   let combo = [];
  //   let obj = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       for (let taxon of res[i].taxonomy) {
  //         if (taxon.vid == this.vid_study) {
  //           if (obj.indexOf(taxon.tid) == -1) {
  //             combo.push({key: taxon.tid, value: taxon.name});
  //             obj.push(taxon.tid);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return combo;
  // }
  //
  // private getPolicyCat(response) {
  //   let res = response.json();
  //   let combo = [];
  //   let obj = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       for (let taxon of res[i].taxonomy) {
  //         if (taxon.vid == this.vid_policy) {
  //           if (obj.indexOf(taxon.tid) == -1) {
  //             combo.push({key: taxon.tid, value: taxon.name});
  //             obj.push(taxon.tid);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return combo;
  // }
  //
  // private cleanData(response) {
  //   let res = response.json();
  //   let transRes = [];
  //   for (var i = 1; i < res.length; i++) {
  //     if (res[i] != null) {
  //       transRes.push(res[i]);
  //     }
  //   }
  //   return transRes;
  // }
  //
  // private getServiceType(subcategories) {
  //   var serviceType = '';
  //   if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.key == 'field_service_type') {
  //         serviceType = subcat.value;
  //       }
  //     }
  //   }
  //   return serviceType;
  // }
  //
  // private getResLifeCycle(subcategories) {
  //   var resLifeCycle = '';
  //   var params;
  //   if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.key == 'field_research_lifecycle_stage') {
  //         resLifeCycle = subcat.value;
  //       }
  //     }
  //   }
  //   return resLifeCycle;
  // }
  //
  // private getProg(subcategories) {
  //   var prog = '';
  //   var params;
  //   if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.key == 'field_programme') {
  //         prog = subcat.value;
  //       }
  //     }
  //   }
  //   return prog;
  // }
  //
  // private getStudyLevel(subcategories) {
  //   var studyLevel = '';
  //   var params;
  //   if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.key == 'field_study_level') {
  //         studyLevel = subcat.value;
  //       }
  //     }
  //   }
  //   return studyLevel;
  // }
  //
  // private getPolicyArea(subcategories) {
  //   var policyArea = '';
  //   var params;
  //   if (subcategories != undefined) {
  //     for (let subcat of subcategories) {
  //       if (subcat.key == 'field_policy_area') {
  //         policyArea = subcat.value;
  //       }
  //     }
  //   }
  //   return policyArea;
  // }
  //
  // private extractData(response, category, subcategories) {
  //   let res = response.json();
  //   let transRes = [];
  //
  //   var serviceType = '';
  //   serviceType = this.getServiceType(subcategories);
  //   var resLifeCycle = '';
  //   resLifeCycle = this.getResLifeCycle(subcategories);
  //   var Prog = '';
  //   Prog = this.getProg(subcategories);
  //   var studyLevel = '';
  //   studyLevel = this.getStudyLevel(subcategories);
  //   var policyArea = '';
  //   policyArea = this.getPolicyArea(subcategories);
  //
  //   // If nothing selected, return all
  //   if ((serviceType == '')
  //     && (resLifeCycle == '')
  //     && (Prog == '')
  //     && (studyLevel == '')
  //     && (policyArea == '')) {
  //     for (var i = 1; i < res.length; i++) {
  //       //transRes=res.slice(1,res.length);
  //       if (res[i] != null) {
  //         transRes.push(res[i]);
  //       }
  //     }
  //   }
  //   else {
  //     for (var i = 1; i < res.length; i++) {
  //       if (res[i] != null) {
  //         var serCounter = 0;
  //         var resCounter = 0;
  //         var progCounter = 0;
  //         var studyCounter = 0;
  //         var policyCounter = 0;
  //
  //         for (let taxon of res[i].taxonomy) {
  //           if (taxon.tid == serviceType) {
  //             serCounter++;
  //           }
  //           if (taxon.tid == resLifeCycle) {
  //             resCounter++;
  //           }
  //           if (taxon.tid == Prog) {
  //             progCounter++;
  //           }
  //           if (taxon.tid == studyLevel) {
  //             studyCounter++;
  //           }
  //           if (taxon.tid == policyArea) {
  //             policyCounter++;
  //           }
  //         }
  //         if (category == 'service') {
  //           // If research life cycle selected and service Type not selected
  //           if ((serviceType == '' || serviceType == 'Service Type')
  //             && (resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           // If research life cycle not selected and service Type is selected
  //           if ((serviceType != '' || serviceType != 'Service Type')
  //             && (resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           // If both selected
  //           if ((serviceType != '' || serviceType != 'Service Type')
  //             && (resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serCounter == 1)
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //         }
  //         if (category == 'education') {
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //         }
  //         if (category == 'guide') {
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //         }
  //         if (category == 'policies') {
  //           if ((policyArea == '' || policyArea == 'Policy Area')
  //             && (resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //
  //           if ((policyArea != '' || policyArea != 'Service Type')
  //             && (resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (policyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //
  //           if ((policyArea != '' || policyArea != 'Policy Area')
  //             && (resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (policyCounter == 1)
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //         }
  //         if (category == 'lifecycle') {
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (serCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)
  //             && (serCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)
  //             && (serCounter == 1)
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (serCounter == 1)
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType == '' || serviceType == 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (resCounter == 1)
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (serCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel == '' || studyLevel == 'Study Level')
  //             && (serCounter == 1)
  //             && (progCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle == '' || resLifeCycle == 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog == '' || Prog == 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (serCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //           if ((resLifeCycle != '' || resLifeCycle != 'Research Lifecycle')
  //             && (serviceType != '' || serviceType != 'Service Type')
  //             && (Prog != '' || Prog != 'Programme')
  //             && (studyLevel != '' || studyLevel != 'Study Level')
  //             && (resCounter == 1)
  //             && (serCounter == 1)
  //             && (progCounter == 1)
  //             && (studyCounter == 1)) {
  //             transRes.push(res[i]);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return transRes || {};
  // }
}
