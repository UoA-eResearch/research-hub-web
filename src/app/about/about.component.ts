import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from '../app.sharedData.service';
import {AnalyticsService} from '../app.analytics.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'About';

  constructor(private sharedDataService: SharedDataService, private location: Location,
              private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle(this.title, false);
    this.analyticsService.trackPageView(this.location.path(), this.title);
  }

}
