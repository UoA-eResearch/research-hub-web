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
  private itemId: number;

  @Input() placeholder = '';
  @Input() _items: GetResultsListItem[] = [];

  @Input() _value: any = [];
  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(private apiService: ApiService) {

  }

  get items() {
    return this._items;
  }

  @Input()
  set items(items: GetResultsListItem[]) {
    this._items = items;

    if (this._value) {
      const selectedItem = items.find((item) => {
        return item.getId() === this._value;
      });

      if (selectedItem) {
        this.selectedItemCtrl.setValue(selectedItem);
      }
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = Number(val) || '';
    this.onChange(this._value);
    this.onTouched();
  }

  ngOnInit() {
    this.selectedItemCtrl = new FormControl();
    this.selectedItemSub = this.selectedItemCtrl.valueChanges.subscribe(selectedItem => this.onSelectedItemChanged(selectedItem));

    this.filteredItems = this.selectedItemCtrl.valueChanges
      .startWith(null)
      .map(item => item && typeof item === 'object' ? item.getTitle() : item)
      .map(name => name ? this.filterByName(name) : this._items.slice());
  }

  filterByName(name: string): GetResultsListItem[] {
    return this._items.filter(item =>
      item.getTitle().toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayWith(item: GetResultsListItem): string {
    if (item !== null) {
      return item.getTitle();
    }

    return '';
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  onSelectedItemChanged(selectedItem: any) {
    let newSelectedItem = '';

    if (selectedItem && typeof selectedItem === 'object') {
      newSelectedItem = selectedItem.getId();
    }

    if (this.value !== newSelectedItem) {
      this.value = newSelectedItem;
    }
  }

  ngOnDestroy() {
    this.selectedItemSub.unsubscribe();
  }
}
