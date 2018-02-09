import {CanDeactivate} from '@angular/router';
import {Component} from '@angular/core';


export class ConfirmDeactivateGuard implements CanDeactivate<Component> {

  constructor() {
  }

  canDeactivate(target: Component) {
    return window.confirm('Leaving this form will delete all information you have filled in. Do you want to leave the form?');
  }
}
