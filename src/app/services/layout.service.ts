import {Injectable} from '@angular/core';


@Injectable()
export class LayoutService {

  constructor() {

  }

  public getNumGridCols(mqAlias: string) {
    let numCols = 0;
    switch (mqAlias) {
      case 'xs':
        numCols = 2;
        break;
      case 'sm':
        numCols = 3;
        break;
      case 'md':
        numCols = 3;
        break;
      case 'lg':
        numCols = 4;
        break;
      case 'xl':
        numCols = 5;
        break;
      default:
        numCols = 4;
        break;
    }

    return numCols;
  }

  public getMQAlias(): string {
    const width = window.innerWidth;

    // fxFlex breakpoint min widths
    // https://github.com/angular/flex-layout/wiki/Responsive-API
    const sm = 600;
    const md = 960;
    const lg = 1280;
    const xl = 1920;

    if ( width < sm) {
      return 'xs';
    } else if (width >= sm && width < md) {
      return 'sm';
    } else if (width >= md && width < lg) {
      return 'md';
    } else if (width >= lg && width < xl) {
      return 'lg';
    } else if (width >= xl) {
      return 'xl';
    }
  }
}
