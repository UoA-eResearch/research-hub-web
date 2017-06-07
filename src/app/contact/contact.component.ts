import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SharedDataService} from '../app.sharedData.service';
import {AnalyticsService} from '../app.analytics.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title = 'Contact';

  constructor(private sharedDataService: SharedDataService, private location: Location,
  private analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.sharedDataService.setTitle(this.title, false);
    this.analyticsService.trackPageView(this.location.path(), this.title);
  }

}
