import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class ToolbarService {

  buttonClickChange: Subject<any> = new Subject<any>();

  constructor() { }

  setButtonClicked(buttonName) {
    this.buttonClickChange.next(buttonName);
  }
}
