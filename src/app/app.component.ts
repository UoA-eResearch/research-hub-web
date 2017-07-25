import {Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {MdSidenav} from '@angular/material';
import {NavigationStart, Router, Event, NavigationEnd, ActivatedRoute} from '@angular/router';
import {SharedDataService} from "./app.sharedData.service";
import {AnalyticsService} from "./app.analytics.service";
import {LocationStrategy} from "@angular/common";
import {BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MdSidenav;

  isSideNavOpened = true;
  isScreenSmall = false;
  sideNavMode = 'side';

  menuItems = [{name: 'Home', icon: 'home', href: ''},
                {name: 'Search & Browse', icon: 'search', href: ''},
                {name: 'Provide Feedback', icon: 'thumbs_up_down', href: ''},
                {name: 'About CeR', icon: 'info', href: ''},
                {name: 'Contact Us', icon: 'phone', href: ''}
  ];

  constructor(private sharedDataService: SharedDataService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private route: ActivatedRoute,
              private breadcrumbService: BreadcrumbService) {

    breadcrumbService.addFriendlyNameForRoute('/home', 'Home');
  }

  test() {
    console.log('hello');
  }

  ngOnInit() {
    this.updateSideNav(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateSideNav(event.target.innerWidth);
  }

  updateSideNav(windowWidth) {
    this.isScreenSmall = windowWidth < 800;
    if (this.isScreenSmall) {
      this.sideNavMode = 'over';
      this.isSideNavOpened = false;
    } else {
      this.sideNavMode = 'side';
      this.isSideNavOpened = true;
    }
  }

  getYear() {
    return moment().year();
  }

  trackOutboundLink(event) {
    this.analyticsService.trackOutboundLink(event.target.href);
  }
}
