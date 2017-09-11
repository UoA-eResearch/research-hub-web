import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {GetResultsListItem} from "../model/ResultsListItemInterface";
import {ApiService} from "../app.api.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteSearchComponent),
      multi: true
    }
  ]
})
export class AutocompleteSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {

  selectedItemCtrl: FormControl;
  selectedItemSub: Subscription;
  filteredItems: Observable<any[]>;

  @Input() placeholder = '';
  @Input() items: GetResultsListItem[] = [];

  selectedItem: any;
  propagateChange = (_: any) => {};

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

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.selectedItem = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onSelectedItemChanged(selectedItem: any) {
    let newSelectedItem = '';

    if (selectedItem && typeof selectedItem === 'object') {
      newSelectedItem = selectedItem.getId();
    }

    if (this.selectedItem !== newSelectedItem) {
      this.selectedItem = newSelectedItem;
      this.propagateChange(this.selectedItem);
    }
  }

  ngOnDestroy() {
    this.selectedItemSub.unsubscribe();
  }
}
