import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoryId, OptionsService, OptionType} from './services/options.service';
import {SearchBarService} from './components/search-bar/search-bar.service';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ApiService} from './services/api.service';
import {AnalyticsService} from './services/analytics.service';
import {isPlatformBrowser} from '@angular/common';
import {ToolbarService} from './services/toolbar.service';
import {AuthService} from './services/auth.service';
import {ChangeDetectorRef} from '@angular/core';
import * as format from 'date-fns/format';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import {HeaderService} from "./components/header/header.service";
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {

  public aucklandUniUrl = 'https://auckland.ac.nz';
  public eResearchUrl = 'http://eresearch.auckland.ac.nz';
  public disclaimerUrl = 'https://www.auckland.ac.nz/en/admin/footer-links/disclaimer.html';

  private mediaChangeSub: Subscription;
  private searchTextChangeSub: Subscription;
  private routerSub: Subscription;

  public selectedCategory = CategoryId.All;
  public searchText = '';
  public showFilterButton = false;
  public showLoginBtn = true;

  constructor(private location: Location, public optionsService: OptionsService, private headerService: HeaderService,
              private searchBarService: SearchBarService, private router: Router,
              public apiService: ApiService, public analyticsService: AnalyticsService,
              public authService: AuthService, private ref: ChangeDetectorRef) {

    authService.loginChange.subscribe((loggedIn) => {
      this.showLoginBtn = !loggedIn;
      this.ref.detectChanges();
    });
  }

  getSearchQueryParams(item: any) {
    const type = item['type'];

    if (type === OptionType.Category) {
      return {categoryId: item.id};
    } else {
      return {researchActivityIds: [item.id]};
    }
  }

  getRouteName(url: string) {
    const routeName = url.replace('?', '/');
    return routeName.split('/')[1];
  }

  ngOnInit() {
    // Navigate to the search page if the user types text in
    this.searchTextChangeSub = this.searchBarService.searchTextChange.distinctUntilChanged().subscribe(searchText => {
      const url = this.location.path();
      if (url && !url.startsWith('/search') && searchText != null && searchText !== '') {
        this.router.navigate(['/search'], {
          queryParams: {
            categoryId: this.searchBarService.category,
            searchText: this.searchBarService.searchText
          }
        });
      }
    });

    if (isPlatformBrowser) {
      this.routerSub = this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          // Need to use urlAfterRedirects rather than url to get correct routeName, even when route redirected automatically
          const routeName = this.getRouteName(event['urlAfterRedirects']);

          if (routeName) {
            const pageInfo = this.optionsService.pageInfo[routeName];
            this.headerService.setBatchParams(pageInfo.title, pageInfo.description, pageInfo.imageUrl, pageInfo.isHeaderVisible);
            this.searchBarService.setVisibility(pageInfo.isSearchBarVisible);

            this.showFilterButton = routeName === 'search';
            window.scrollTo(0, 0);
          }
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
