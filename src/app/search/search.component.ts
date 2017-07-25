import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AnalyticsService} from '../app.analytics.service';
import {SearchService} from '../app.search.service';
import {ApiService} from "../app.api.service";
import {Observable} from "rxjs/Observable";


import {MdInputContainer, OverlayContainer} from '@angular/material';

// @NgModule({
//   // ...
// })
// export class UnicornCandyAppModule {
//   constructor(overlayContainer: OverlayContainer) {
//
//   }
// }

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searchInput') search; //: MdInputContainer;

  categories = [
    {id: 1, name: 'All Categories'},
    {id: 2, name: 'Support'},
    {id: 3, name: 'Training'},
    {id: 4, name: 'People'},
    {id: 5, name: 'Collaboration'},
    {id: 6, name: 'Things'},
    {id: 7, name: 'Publications'},
    {id: 8, name: 'Research Advice'},
    {id: 9, name: 'Policies & Strategy'},
    {id: 10, name: 'Guides & Tool Chains'},
    {id: 11, name: 'Events & News'},
  ];

  // categories: Observable<Array<any>>;
  searchTextValue;
  categoryValue = 1;
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();
  searchTextSubject: Subject<String> = new Subject();

  constructor(private analyticsService: AnalyticsService, private searchService: SearchService, private apiService: ApiService, overlayContainer: OverlayContainer) {
    // overlayContainer.themeClass = 'search-bar-theme';
  }

  clear() {
    this.searchText = '';
  }

  ngOnInit() {
    // this.categories = this.apiService.getCategory('contentType').map((data) => {
    //   data.sort((categoryA, categoryB) => {
    //     return categoryA['name'].localeCompare(categoryB['name']);
    //   });
    //   return data;
    // });
    //
    // this.categories.subscribe(data => {
    //   console.log('load categories: ', data);
    // });

    this.searchTextSubject.debounceTime(1000).subscribe((searchText) => this.analyticsService.trackSearch(this.categoryValue, searchText));
  }

  @Input()
  get searchText() {
    return this.searchTextValue;
  }

  @Input()
  get category() {
    return this.categoryValue;
  }

  set searchText(val) {
    this.searchTextValue = val;
    this.searchTextChange.emit(val);
    this.searchTextSubject.next(val);
    this.searchService.setSearchText(val);
  }

  set category(val) {
    this.categoryValue = val;
    this.categoryChange.emit(val);
    this.searchService.setSearchCategory(val);
  }
}
