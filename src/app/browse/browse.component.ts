import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {MenuService} from "../menu.service";
import {ActivatedRoute} from "@angular/router";
import {SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {AnalyticsService} from "../app.analytics.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  public menuItems = [];
  private mediaSub: Subscription;

  @Input()
  embedded = false;

  @Input()
  maxCols = 5;

  @Input()
  numCols = 4;
  teal = '#0294a5';
  navy = '#004059';
  orange = '#ff8300';
  tileColors = [this.teal, this.navy, this.orange];

  constructor(private menuService: MenuService, private route: ActivatedRoute,
              private searchBarService: SearchBarService, private media: ObservableMedia, private analyticsService: AnalyticsService,
              private location: Location) {
  }


  ngOnInit() {

    if (!this.embedded) {
      this.analyticsService.trackPageView(this.location.path(), 'Browse Categories');
    }

    this.setNumCategoryColumns(BrowseComponent.getMQAlias());

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.setNumCategoryColumns(change.mqAlias);
    });

    this.route.params.subscribe(params => {
      const categoryId = MenuService.getMenuItemId([params['contentTypeId'], params['subcategoryId']]);
      const menuItem = this.menuService.getMenuItem(categoryId);

      if (!menuItem.isLeaf()) {
        // Remove 'all' category when root category is requested
        let start = 0;
        if (categoryId === '/') {
          start = 1;
          this.searchBarService.setCategory('all');
        }
        this.menuItems = menuItem.menuItems.slice(start);
      }
    });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  public static getMQAlias(): string {
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

  setNumCategoryColumns(mqAlias: string) {
    // console.log(mqAlias);
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

    if (this.embedded && mqAlias !== 'xs') {
      numCols -= 1;
    }

    this.numCols = Math.min(this.maxCols, numCols);
  }

  getTileColor(id: number): any {
    return {'background-color': this.tileColors[id % 3]};
  }
}
