import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AnalyticsService} from '../app.analytics.service';
import {SearchService} from '../app.search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  categories = [
    {value: 'All'},
    {value: 'Data sources'},
    {value: 'Facilities'},
    {value: 'Guides'},
    {value: 'Instrument'},
    {value: 'Knowledge articles'},
    {value: 'People'},
    {value: 'Policies'},
    {value: 'Software'},
    {value: 'Training'},
    {value: 'Services'}
  ];

  searchTextValue;
  categoryValue;
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();
  searchTextSubject: Subject<String> = new Subject();

  constructor(private analyticsService: AnalyticsService, private searchService: SearchService) {

  }

  ngOnInit() {
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
