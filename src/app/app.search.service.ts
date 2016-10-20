import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";

@Injectable()
export class SearchService {
  private value: string;
  searchChange: Subject<string> = new Subject<string>();

  setSearchValue(value) {
    this.value = value;
    this.searchChange.next(this.value);
  }
}
