import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {NavigationService} from "./navigation.service";
import {SearchBarService} from "./search-bar/search-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ProgressBarService} from "./app.progress-bar.service";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {

  private isSideNavOpened = true;
  private sideNavMode = 'side';
  private mediaChangeSub: Subscription;

  private searchTextChangeSub: Subscription;

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


  constructor(private breadcrumbService: BreadcrumbService, private navigationService: NavigationService,
              private searchBarService: SearchBarService, private router: Router, private progressBarService: ProgressBarService,
              private observableMedia: ObservableMedia) {

    // Populate categories for search-bar bar
    this.categories = navigationService.getCategory('/').categories;

    // Create friendly names for menu items in breadcrumbs
    for (const item of this.menuItems) {
      breadcrumbService.addFriendlyNameForRoute(item['href'], item['name']);
    }
  }

  ngOnInit() {
    // Update side nav
    this.mediaChangeSub = this.observableMedia.subscribe((change: MediaChange) => {
      if (['xs', 'sm'].includes(change.mqAlias)) {
        this.sideNavMode = 'over';
        this.isSideNavOpened = false;
      } else {
        this.sideNavMode = 'side';
        this.isSideNavOpened = true;
      }
    });

    // Navigate to the search page if the user types text in
    this.searchTextChangeSub = this.searchBarService.searchTextChange.distinctUntilChanged().subscribe(searchText => {
      console.log('searchTextChange', searchText, this.router.url);
      if (this.router.url !== '/search' && searchText != null && searchText.trim() !== '') {
        this.router.navigate(['/search']);
      }
    });
  }

  ngOnDestroy() {
    this.mediaChangeSub.unsubscribe();
    this.searchTextChangeSub.unsubscribe();
  }

  getYear() {
    return moment().year();
  }
}
