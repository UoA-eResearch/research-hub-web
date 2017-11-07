import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SearchBarService} from './search-bar.service';
import {Subscription} from 'rxjs/Subscription';
import {MatInput} from '@angular/material/input';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public isVisible: boolean;
  public categoriesValue = [];
  private searchTextValue = '';
  private categoryValue = '';
  @Output() searchTextChange = new EventEmitter();
  @Output() categoryChange = new EventEmitter();
  @Output() categoriesChange = new EventEmitter();
  @Output() focusOnInitChange = new EventEmitter();
  @ViewChild('searchTextInput', { read: MatInput }) searchTextInput: MatInput;

  private searchBarVisibilityChangeSub: Subscription;
  private searchCategoryChangeSub: Subscription;
  private searchTextChangeSub: Subscription;

  constructor(private searchBarService: SearchBarService) {
  }

  ngOnInit() {
    this.searchCategoryChangeSub = this.searchBarService.searchCategoryChange.subscribe(searchCategory => {
      this.categoryValue = searchCategory;
    });

    this.searchTextChangeSub = this.searchBarService.searchTextChange.subscribe(searchText => {
      this.searchTextValue = searchText;
    });

    this.searchBarVisibilityChangeSub = this.searchBarService.searchBarVisibilityChange.subscribe(isVisible => {
      this.isVisible = isVisible;
    });
  }

  ngOnDestroy() {
    this.searchCategoryChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
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
    this.searchBarService.setSearchText(val);
  }

  set category(val) {
    this.categoryValue = val;
    this.categoryChange.emit(val);
    this.searchBarService.setCategory(val);
  }

  clearSearchText() {
    this.searchText = '';
  }
}
