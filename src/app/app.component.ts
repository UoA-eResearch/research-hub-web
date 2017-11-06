import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuService} from './services/menu.service';
import {SearchBarService} from './components/shared/search-bar/search-bar.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {ApiService} from './services/api.service';
import {AnalyticsService} from './services/analytics.service';
import {isPlatformBrowser} from '@angular/common';
import {ToolbarService} from './services/toolbar.service';
import {AuthService} from './services/auth.service';
import {ChangeDetectorRef} from '@angular/core';
import {ResearchActivityComponent} from './components/home/research-activity/research-activity.component';
import {LayoutService} from 'app/services/layout.service';
import * as format from 'date-fns/format';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

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

  researchActivities = ResearchActivityComponent.researchActivities;


  categories = [];
  showFilterButton = false;
  showLoginBtn = true;
  private menuItems = [];

  constructor(private navigationService: MenuService,
              private searchBarService: SearchBarService, private router: Router,
              private observableMedia: ObservableMedia, public apiService: ApiService, public analyticsService: AnalyticsService,
              private toolbarService: ToolbarService, public authService: AuthService, private ref: ChangeDetectorRef,
              private layoutService: LayoutService) {

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
    this.updateSideNav(this.layoutService.getMQAlias());

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
