import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from "../app.analytics.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor(private analyticsService: AnalyticsService, private location: Location) {
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Feedback');
  }

}
