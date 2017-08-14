import {Component, OnInit, Input, OnDestroy} from "@angular/core";
import {MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {ProgressBarService} from "../app.progress-bar.service";
import {SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  private menuItems = [];
  mediaSub: Subscription;

  @Input()
  numCols = 4;
  teal = '#0294a5';
  navy = '#004059';
  orange = '#ff8300';
  tileColors = [this.teal, this.navy, this.orange];

  constructor(private menuService: MenuService, private route: ActivatedRoute, private progressBarService: ProgressBarService,
              private searchBarService: SearchBarService, private media: ObservableMedia) {
  }


  ngOnInit() {
    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.setNumCategoryColumns(change.mqAlias);
    });

    this.route.params.subscribe(params => {
      const categoryId = MenuService.getMenuItemId([params['contentTypeId'], params['subcategoryId']]);
      const menuItem = this.menuService.getMenuItem(categoryId);

      if (!menuItem.isLeaf()) {
        this.progressBarService.setHidden();

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

  setNumCategoryColumns(mqAlias: string) {
    switch (mqAlias) {
      case 'xs':
        this.numCols = 2;
        break;
      case 'sm':
        this.numCols = 2;
        break;
      case 'md':
        this.numCols = 2;
        break;
      case 'lg':
        this.numCols = 3;
        break;
      case 'xl':
        this.numCols = 4;
        break;
      default:
        this.numCols = 4;
        break;
    }
  }

  getTileColor(id: number): any {
    return {'background-color': this.tileColors[id % 3]};
  }
}
