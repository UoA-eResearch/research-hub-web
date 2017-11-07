import {Component, OnInit} from '@angular/core';
import {ApiService} from 'app/services/api.service';
import {AnalyticsService} from 'app/services/analytics.service';
import { Location } from '@angular/common';
import {OptionsService, CategoryIds} from 'app/services/options.service';
import {HeaderService} from "../header/header.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(public optionsService: OptionsService,
              private analyticsService: AnalyticsService, private location: Location) {
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Home');
    // this.headerService.setBatchParams('Welcome to the Research Hub', 'The Research Hub connects you with people, resources, and services from across the University to enhance and accelerate your research.', coverImageUrl);
  }
}
