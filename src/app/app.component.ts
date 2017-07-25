import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {AnalyticsService} from "./app.analytics.service";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SideNavComponent} from "./sidenav/sidenav-component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends SideNavComponent implements OnInit {

  menuItems = [
    {name: 'Home', icon: 'home', href: ''},
    {name: 'Search & Browse', icon: 'search', href: ''},
    {name: 'Provide Feedback', icon: 'thumbs_up_down', href: ''},
    {name: 'About CeR', icon: 'info', href: ''},
    {name: 'Contact Us', icon: 'phone', href: ''}
  ];

  constructor(private analyticsService: AnalyticsService,
              private breadcrumbService: BreadcrumbService) {
    super();
    breadcrumbService.addFriendlyNameForRoute('/home', 'Home');
  }

  ngOnInit() {
    this.updateSideNav();
  }

  getYear() {
    return moment().year();
  }

  trackOutboundLink(event) {
    this.analyticsService.trackOutboundLink(event.target.href);
  }
}
