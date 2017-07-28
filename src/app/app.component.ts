import {Component, OnDestroy, OnInit, ViewEncapsulation} from "@angular/core";
import * as moment from "moment";
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SideNavComponent} from "./sidenav/sidenav-component";
import {NavigationService} from "./navigation.service";
import {SearchBarService} from "./search-bar/search-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent extends SideNavComponent implements OnInit, OnDestroy {

  private searchTextChangeSub: Subscription;

  menuItems = [
    {name: 'Home', icon: 'home', href: '/home'},
    {name: 'Search & Browse', icon: 'search', href: '/browse'},
    {name: 'Provide Feedback', icon: 'thumbs_up_down', href: '/feedback'},
    {name: 'About CeR', icon: 'info', href: '/about'},
    {name: 'Contact Us', icon: 'phone', href: '/contact'}
  ];

  categories = [];
  category = 8;
  searchText = '';

  constructor(private breadcrumbService: BreadcrumbService, private navigationService: NavigationService,
              private searchBarService: SearchBarService, private router: Router) {
    super();

    // Populate categories for search-bar bar
    this.categories = navigationService.getCategory('/').categories;

    // Create friendly names for menu items in breadcrumbs
    for (const item of this.menuItems) {
      breadcrumbService.addFriendlyNameForRoute(item['href'], item['name']);
    }
  }

  ngOnInit() {
    this.updateSideNav();

    this.searchTextChangeSub = this.searchBarService.searchTextChange.distinctUntilChanged().subscribe(searchText => {
      console.log('searchTextChange', searchText, this.router.url);

      // Navigate to the search page if the user types text in
      if (this.router.url !== '/search' && searchText != null && searchText.trim() !== '') {
        this.router.navigate(['/search']);
      }
    });
  }

  ngOnDestroy() {
    this.searchTextChangeSub.unsubscribe();
  }

  getYear() {
    return moment().year();
  }
}
