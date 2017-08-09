import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarParams, SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {Category, CategoryType, NavigationService} from "../navigation.service";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  private searchChangeSub: Subscription;
  private contentResults: Array<Content>;
  private peopleResults: Array<Person>;

  constructor(private breadcrumbService: BreadcrumbService, private searchBarService: SearchBarService,
              private navigation: NavigationService, private apiService: ApiService, private progressBarService: ProgressBarService) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  onSearchChange(searchBarParams: SearchBarParams) {
    console.log('SearchResultsComponent: searchChange', searchBarParams);
    this.progressBarService.setVisible();
    const categoryId = NavigationService.getCategoryId([searchBarParams.category]);
    const category = this.navigation.getCategory(categoryId);

    if (category.type === CategoryType.All) {
      this.getPeople(searchBarParams);
      this.getContentItems(searchBarParams.searchText, null);
    } else if (category.type === CategoryType.Person) {
      this.getPeople(searchBarParams);
      this.contentResults = new Array<Content>();
    } else if (category.type === CategoryType.Category) {
      this.peopleResults = new Array<Person>();
      this.getContentItems(searchBarParams.searchText, category);
    }
  }

  getPeople(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);

    this.apiService.getPeople(searchParams).subscribe(
      page => {
        this.progressBarService.setHidden();
        this.peopleResults = Person.fromObjects(page.content);
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
        this.progressBarService.setHidden();
        this.contentResults = Content.fromObjects(page.content);
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
