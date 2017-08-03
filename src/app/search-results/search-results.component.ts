import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarParams, SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {Category, CategoryType, NavigationService} from "../navigation.service";
import {getResultsListItems, ResultsListItem} from "../model/ResultsListItemInterface";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  private loadingData = true;
  private searchChangeSub: Subscription;
  private contentResults: Array<ResultsListItem>;
  private peopleResults: Array<ResultsListItem>;

  constructor(private breadcrumbService: BreadcrumbService, private searchBarService: SearchBarService,
              private navigation: NavigationService, private apiService: ApiService) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  onSearchChange(searchBarParams: SearchBarParams) {
    console.log('SearchResultsComponent: searchChange', searchBarParams);
    this.loadingData = true;
    const categoryId = NavigationService.getCategoryId([searchBarParams.category]);
    const category = this.navigation.getCategory(categoryId);

    if (category.type === CategoryType.All) {
      this.getPeople(searchBarParams);
      this.getContentItems(searchBarParams.searchText, null);
    } else if (category.type === CategoryType.Person) {
      this.getPeople(searchBarParams);
      this.contentResults = new Array<ResultsListItem>();
    } else if (category.type === CategoryType.Category) {
      this.peopleResults = new Array<ResultsListItem>();
      this.getContentItems(searchBarParams.searchText, category);
    }
  }

  getPeople(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);

    this.apiService.getPeople(searchParams).subscribe(
      page => {
        this.loadingData = false;
        this.peopleResults = getResultsListItems(Person.fromObjects(page.content));
      }
    );
  }

  getContentItems(searchText: string, category: Category) {
    const contentItemsSearchParams = new ContentItemsSearchParams();
    contentItemsSearchParams.setSearchText(searchText);

    if (category != null) {
      contentItemsSearchParams.setContentTypes([category.categoryId]);
    }

    this.apiService.getContentItems(contentItemsSearchParams).subscribe(
      page => {
        this.loadingData = false;
        this.contentResults = getResultsListItems(Content.fromObjects(page.content));
      }
    );
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
