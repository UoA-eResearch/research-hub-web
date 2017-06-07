import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from '../app.sharedData.service';
import {AnalyticsService} from '../app.analytics.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Home';

  constructor(private sharedDataService: SharedDataService, private location: Location,
        private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle(this.title, true);
    this.analyticsService.trackPageView(this.location.path(), this.title);
  }
}
