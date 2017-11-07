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
    this.numCols = this.layoutService.getNumGridCols(this.layoutService.getMQAlias());

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.numCols = this.layoutService.getNumGridCols(change.mqAlias);
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

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }
}
