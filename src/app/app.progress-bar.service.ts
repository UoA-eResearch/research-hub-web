import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarService {

  protected visible = true;

  constructor() { }

  setVisible() {
    this.visible = true;
  }

  setHidden() {
    this.visible = false;
  }
}
