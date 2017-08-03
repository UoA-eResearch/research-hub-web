import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SearchBarService} from "./search-bar.service";


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  private categoriesValue = [];
  private searchTextValue = '';
  private categoryValue = '';
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();
  @Output() categoriesChange = new EventEmitter();

  constructor(private searchService: SearchBarService) {
  }

  @Input()
  get categories() {
    return this.categoriesValue;
  }

  @Input()
  get searchText() {
    return this.searchTextValue;
  }

  @Input()
  get category() {
    return this.categoryValue;
  }

  set categories(val) {
    this.categoriesValue = val;
    this.categoriesChange.emit(val);
  }

  set searchText(val) {
    this.searchTextValue = val;
    this.searchTextChange.emit(val);
    this.searchService.setSearchText(val);
  }

  set category(val) {
    this.categoryValue = val;
    this.categoryChange.emit(val);
    this.searchService.setCategory(val);
  }

  clearSearchText() {
    this.searchText = '';
  }
}
