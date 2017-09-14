import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {MenuService} from "./menu.service";
import {SearchBarService} from "./search-bar/search-bar.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ProgressBarService} from "./app.progress-bar.service";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {ApiService} from "./app.api.service";
import {AnalyticsService} from "./app.analytics.service";
import { isPlatformBrowser } from '@angular/common';
import {BrowseComponent} from "./browse/browse.component";
import {ToolbarService} from "./toolbar.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {

  aucklandUniUrl = 'https://auckland.ac.nz';
  eResearchUrl = 'http://eresearch.auckland.ac.nz';
  disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';

  private isSideNavOpened = true;
  private sideNavMode = 'side';
  private mediaChangeSub: Subscription;

  private searchTextChangeSub: Subscription;
  private routerSub: Subscription;

  menuItems = [
    {name: 'Home', icon: 'home', href: '/home'},
    {name: 'Search & Browse', icon: 'magnify', href: '/browse'},
    {name: 'Provide Feedback', icon: 'thumbs-up-down', href: '/feedback'},
    {name: 'About CeR', icon: 'information', href: '/about'},
    {name: 'Contact Us', icon: 'phone-classic', href: '/contact'}
  ];

  categories = [];
  category = 'all';
  searchText = '';


  constructor(private breadcrumbService: BreadcrumbService, private navigationService: MenuService,
              private searchBarService: SearchBarService, private router: Router,
              private observableMedia: ObservableMedia, private apiService: ApiService, private analyticsService: AnalyticsService,
              private toolbarService: ToolbarService) {

    // Populate menuItems for search-bar bar
    this.categories = navigationService.getMenuItem('/').menuItems;

    // Create friendly names for menu items in breadcrumbs
    for (const item of this.menuItems) {
      breadcrumbService.addFriendlyNameForRoute(item['href'], item['name']);
    }
  }

  openSearchFilter() {
    this.toolbarService.setButtonClicked('filter');
  }

  updateSideNav(mqAlias) {
    if (['xs', 'sm'].includes(mqAlias)) {
      this.sideNavMode = 'over';
      this.isSideNavOpened = false;
    } else {
      this.sideNavMode = 'side';
      this.isSideNavOpened = true;
    }
  }

  ngOnInit() {
    // Update side nav

    this.updateSideNav(BrowseComponent.getMQAlias());

    this.mediaChangeSub = this.observableMedia.subscribe((change: MediaChange) => {
      this.updateSideNav(change.mqAlias);
    });

    // Navigate to the search page if the user types text in
    this.searchTextChangeSub = this.searchBarService.searchTextChange.distinctUntilChanged().subscribe(searchText => {
      if (this.router.url !== '/search' && searchText != null && searchText.trim() !== '') {
        this.router.navigate(['/search']);
      }
    });

    if (isPlatformBrowser) {
      this.routerSub = this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          window.scrollTo(0, 0);
        });
    }
  }

  ngOnDestroy() {
    this.mediaChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  getYear() {
    return moment().year();
  }
}
