import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from 'app/services/analytics.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(public analyticsService: AnalyticsService, public location: Location) {
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Feedback');
  }

}
