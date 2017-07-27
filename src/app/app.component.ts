import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {AnalyticsService} from "./app.analytics.service";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SideNavComponent} from "./sidenav/sidenav-component";
import {NavigationService} from "./navigation.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends SideNavComponent implements OnInit {

  menuItems = [
    {name: 'Home', icon: 'home', href: '/home'},
    {name: 'Search & Browse', icon: 'search', href: '/browse'},
    {name: 'Provide Feedback', icon: 'thumbs_up_down', href: '/feedback'},
    {name: 'About CeR', icon: 'info', href: '/about'},
    {name: 'Contact Us', icon: 'phone', href: '/contact'}
  ];

  categories = [];
  category = 'all';
  searchText = '';

  constructor(private breadcrumbService: BreadcrumbService, private navigationService: NavigationService) {
    super();

    // Populate categories for search bar
    this.categories = navigationService.getCategory('/').categories;

    // Create friendly names for menu items in breadcrumbs
    for (const item of this.menuItems) {
      breadcrumbService.addFriendlyNameForRoute(item['href'], item['name']);
    }
  }

  ngOnInit() {
    this.updateSideNav();
  }

  getYear() {
    return moment().year();
  }
}
