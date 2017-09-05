import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {GetResultsListItem} from "../model/ResultsListItemInterface";
import {ApiService} from "../app.api.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})
export class AutocompleteSearchComponent implements OnInit, OnDestroy {

  selectedItemCtrl: FormControl;
  selectedItemSub: Subscription;
  filteredItems: Observable<any[]>;

  @Input() placeholder = '';
  @Input() items: GetResultsListItem[] = [];

  selected: GetResultsListItem;
  @Output() onSelected = new EventEmitter<GetResultsListItem>();

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.selectedItemCtrl = new FormControl();
    this.selectedItemSub = this.selectedItemCtrl.valueChanges.subscribe(selectedItem => this.onSelectedItemChanged(selectedItem));

    this.filteredItems = this.selectedItemCtrl.valueChanges
      .startWith(null)
      .map(item => item && typeof item === 'object' ? item.getTitle() : item)
      .map(name => name ? this.filter(name) : this.items.slice());
  }

  filter(name: string): GetResultsListItem[] {
    return this.items.filter(item =>
      item.getTitle().toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayWith(item: GetResultsListItem): string {
    if (item !== null) {
      return item.getTitle();
    }

    return '';
  }

  onSelectedItemChanged(selectedItem: any) {
    if (typeof selectedItem === 'object') {
      this.onSelected.emit(selectedItem);
      this.selected = selectedItem;
    }
  }

  ngOnDestroy() {
    this.selectedItemSub.unsubscribe();
  }
}
