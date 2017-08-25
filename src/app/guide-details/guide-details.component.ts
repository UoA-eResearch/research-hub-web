import {Component, OnDestroy, OnInit} from '@angular/core';
import {Content} from "../model/Content";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../app.api.service";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {Subscription} from "rxjs/Subscription";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import { Location } from '@angular/common';
import {MenuService} from "../menu.service";


@Component({
  selector: 'app-guide-details',
  templateUrl: './guide-details.component.html',
  styleUrls: ['./guide-details.component.scss']
})
export class GuideDetailsComponent implements OnInit, OnDestroy {

  numCols = 1;
  content: Content;
  mediaSub: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private media: ObservableMedia,
              private breadcrumbService: BreadcrumbService, private location: Location, private menuService: MenuService) {

  }

  ngOnInit() {
    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.setNumCategoryColumns(change.mqAlias);
    });

    this.route.params.subscribe(params => {
      const contentId = params['id'];

      this.apiService.getContentItem(contentId).subscribe(
        content => {
          this.breadcrumbService.addFriendlyNameForRoute(this.location.path(), content.name);
          this.content = content;
        }
      );
    });
  }

  getGuideCategoryRouterLink(guideCategoryId) {
    const path = this.menuService.getCurrentPath();
    path.push(guideCategoryId);
    return path;
  }

  setNumCategoryColumns(mqAlias: string) {
    let numCols = 2;
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
        numCols = 3;
        break;
      case 'xl':
        numCols = 3;
        break;
      default:
        numCols = 3;
        break;
    }

    this.numCols = numCols;
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
