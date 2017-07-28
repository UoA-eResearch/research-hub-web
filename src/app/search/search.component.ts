import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private loadingData = true;
  private searchChangeSub: Subscription;

  constructor(private breadcrumbService: BreadcrumbService, private searchBarService: SearchBarService) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  onSearchChange(data) {
    this.loadingData = true;
    console.log('SearchComponent: searchChange', data);
  }

  ngOnInit() {
    this.onSearchChange(this.searchBarService.getSearchParams()); // Get search parameters on initial page landing
    this.searchChangeSub = this.searchBarService.searchChange.distinctUntilChanged().subscribe(searchParams => {
      this.onSearchChange(searchParams);
    });
  }

  ngOnDestroy() {
    this.searchChangeSub.unsubscribe();
  }
}
