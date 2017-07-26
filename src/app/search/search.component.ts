import {Component, EventEmitter, Input, Output} from "@angular/core";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

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

  searchTextValue = '';
  categoryValue = '';
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();

  constructor() {

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

  clear() {
    this.searchText = '';
  }
}
