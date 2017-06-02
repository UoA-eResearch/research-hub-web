import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

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

  constructor() {

  }

  ngOnInit() {

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
  }

  set category(val) {
    this.categoryValue = val;
    this.categoryChange.emit(val);
  }
}
