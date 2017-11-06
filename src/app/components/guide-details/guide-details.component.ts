import {Component, OnDestroy, OnInit} from '@angular/core';
import {Content} from 'app/model/Content';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from 'app/services/api.service';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';
import {AnalyticsService} from 'app/services/analytics.service';
import {LayoutService} from 'app/services/layout.service';


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
              private location: Location, private analyticsService: AnalyticsService, private layoutService: LayoutService) {

  }

  ngOnInit() {
    this.setNumCategoryColumns(this.layoutService.getMQAlias());

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.setNumCategoryColumns(change.mqAlias);
    });

    this.route.params.subscribe(params => {
      const id = params['guideId'];

      this.apiService.getContentItem(id).subscribe(
        content => {
          const url = this.location.path();
          const name = content.name;

          this.analyticsService.trackGuide(name, url);
          this.content = content;
        }
      );
    });
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

    this.numCols = numCols;
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
