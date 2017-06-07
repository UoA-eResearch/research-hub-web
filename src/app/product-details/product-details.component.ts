import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {SearchService} from '../app.search.service';
import {AnalyticsService} from '../app.analytics.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  searchText: string;
  routeParamsSub: Subscription;

  constructor(private location: Location, private route: ActivatedRoute, private searchService: SearchService,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.searchText = this.searchService.getSearchText();
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.analyticsService.trackPageView(this.location.path(), params['name']);
    });
  }

  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }

  back() {
    this.location.back();
  }
}
