import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import {MenuService} from "./menu.service";
import {SearchBarService} from "./search-bar/search-bar.service";
import {ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import {ApiService} from "./app.api.service";
import {AnalyticsService} from "./app.analytics.service";
import { isPlatformBrowser } from '@angular/common';
import {BrowseComponent} from "./browse/browse.component";
import {ToolbarService} from "./toolbar.service";
import {AuthService} from "./app.auth.service";
import {ChangeDetectorRef} from '@angular/core';
import {ResearchActivityComponent} from "./research-activity/research-activity.component";
import * as format from 'date-fns/format';
import preventExtensions = Reflect.preventExtensions;


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

  // menuItems = [
  //   {name: 'Home', icon: 'home', href: '/home'},
  //   {name: 'Search & Browse', icon: 'magnify', href: '/browse'},
  //   {name: 'Provide Feedback', icon: 'thumbs-up-down', href: '/feedback'},
  //   {name: 'About Us', icon: 'information', href: '/about'},
  //   {name: 'Contact Us', icon: 'phone-classic', href: '/contact'}
  // ];

  researchActivities = ResearchActivityComponent.researchActivities;


  categories = [];
  showFilterButton = false;
  showLoginBtn = true;
  private menuItems = [];

  constructor(private navigationService: MenuService,
              private searchBarService: SearchBarService, private router: Router,
              private observableMedia: ObservableMedia, public apiService: ApiService, public analyticsService: AnalyticsService,
              private toolbarService: ToolbarService, public authService: AuthService, private ref: ChangeDetectorRef) {

    // Populate menuItems for search-bar bar
    this.categories = navigationService.getMenuItem('/').menuItems;

    authService.loginChange.subscribe((loggedIn) => {
      this.showLoginBtn = !loggedIn;
      this.ref.detectChanges();
    });
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
        console.log('search nav change: ', searchText);
        this.router.navigate(['/search']);
      }
    });

    if (isPlatformBrowser) {
      this.routerSub = this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          const url = event['url'];
          this.showFilterButton = url.startsWith('/search?') || url === '/search';
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
    return format(new Date(), 'YYYY');
  }
}
