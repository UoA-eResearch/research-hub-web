import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MdSidenav} from '@angular/material';
import {NavigationStart, Router, Event, NavigationEnd, ActivatedRoute} from '@angular/router';
import {SharedDataService} from "./app.sharedData.service";
import {AnalyticsService} from "./app.analytics.service";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = '';
  category = 'All';
  searchText = '';

  constructor(private sharedDataService: SharedDataService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sharedDataService.titleChange.distinctUntilChanged().subscribe(title => {
      this.title = title;
    });
  }

  getYear() {
    return moment().year();
  }

  trackOutboundLink(event) {
    this.analyticsService.trackOutboundLink(event.target.href);
  }

  searchTextChanged(searchText) {
    console.log('searchTextChanged', searchText);
    if (searchText !== '') {
      this.router.navigate(['results', searchText]);
    }
  }
}
