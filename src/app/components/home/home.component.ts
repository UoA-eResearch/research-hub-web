import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from 'app/services/analytics.service';
import {Location} from '@angular/common';
import {CategoryId, OptionsService} from 'app/services/options.service';
import {SearchBarService} from '../search-bar/search-bar.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public optionsService: OptionsService, private searchBarService: SearchBarService,
              private analyticsService: AnalyticsService, private location: Location) {
  }

  ngOnInit() {
    this.analyticsService.trackPageView(this.location.path(), 'Home');
    this.searchBarService.setSearchText('');
    this.searchBarService.setCategory(CategoryId.All);
  }
}
