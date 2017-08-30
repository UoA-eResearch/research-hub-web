import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarParams, SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {ContentTypeIds, MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";
import {Page} from "../model/Page";
import {Policy} from "../model/Policy";
import {AnalyticsService} from "../app.analytics.service";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";


class SearchResultsSummary {
  constructor(public name: string, public page: Page<any>, public elementRef: ElementRef) {

  }

  scrollToResults() {
    this.elementRef.nativeElement.scrollIntoView();
  }
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  @ViewChild('guidesResults') guidesResults: ElementRef;
  @ViewChild('supportResults') supportResults: ElementRef;
  @ViewChild('instrumentsResults') instrumentsResults: ElementRef;
  @ViewChild('trainingResults') trainingResults: ElementRef;
  @ViewChild('softwareResults') softwareResults: ElementRef;
  @ViewChild('facilitiesResults') facilitiesResults: ElementRef;
  @ViewChild('peopleResults') peopleResults: ElementRef;
  @ViewChild('knowledgeArticleResults') knowledgeArticleResults: ElementRef;
  @ViewChild('policiesResults') policiesResults: ElementRef;

  private searchChangeSub: Subscription;
  private guidesPage: Page<Content>;
  private supportPage: Page<Content>;
  private instrumentsEquipmentPage: Page<Content>;
  private trainingPage: Page<Content>;
  private softwarePage: Page<Content>;
  private facilitiesSpacesPage: Page<Content>;
  private peoplePage: Page<Person>;
  private knowledgeArticlePage: Page<Content>;
  private policiesPage: Page<Policy>;
  private maxNumberOfItems = 50;
  private searchResultsSummary: Array<SearchResultsSummary>;
  private pages: [any];
  private showEmptyState = false;

  constructor(private breadcrumbService: BreadcrumbService, protected searchBarService: SearchBarService,
              protected menuService: MenuService, private apiService: ApiService,
              private progressBarService: ProgressBarService, private analyticsService: AnalyticsService,
              private titleService: Title) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  ngOnInit() {
    this.titleService.setTitle('Research Hub: Search Results');

    this.supportPage = new Page<Content>();
    this.instrumentsEquipmentPage = new Page<Content>();
    this.trainingPage = new Page<Content>();
    this.softwarePage = new Page<Content>();
    this.facilitiesSpacesPage = new Page<Content>();
    this.knowledgeArticlePage = new Page<Content>();
    this.guidesPage = new Page<Content>();
    this.peoplePage = new Page<Person>();
    this.policiesPage = new Page<Policy>();

    this.pages = [this.supportPage, this.instrumentsEquipmentPage, this.trainingPage, this.softwarePage,
      this.facilitiesSpacesPage, this.knowledgeArticlePage, this.guidesPage, this.peoplePage, this.policiesPage];

    this.onSearchChange(this.searchBarService.getSearchParams()); // Get search parameters on initial page landing
    this.searchChangeSub = this.searchBarService.searchChange.debounceTime(300).distinctUntilChanged().subscribe(searchParams => {
      this.onSearchChange(searchParams);
    });
  }

  ngOnDestroy() {
    this.searchChangeSub.unsubscribe();
  }

  onSearchChange(searchBarParams: SearchBarParams) {
    this.analyticsService.trackSearch(searchBarParams.category, searchBarParams.searchText);

    // this.progressBarService.setVisible();
    const categoryId = MenuService.getMenuItemId([searchBarParams.category]);
    const menuItem = this.menuService.getMenuItem(categoryId);

    const observables = [];
    let pagesToUpdate = [];

    switch (menuItem.type) {
      case MenuItemType.All:
        for (const contentTypeId of Object.keys(ContentTypeIds)) {
          if (Number(contentTypeId)) {
            observables.push(this.getContentObservable(searchBarParams.searchText, contentTypeId));
          }
        }
        observables.push(this.getPeopleObservable(searchBarParams));
        observables.push(this.getPoliciesObservable(searchBarParams));
        pagesToUpdate = this.pages;
        break;
      case MenuItemType.Content:
        observables.push(this.getContentObservable(searchBarParams.searchText, menuItem.contentTypeId));
        pagesToUpdate = [this.pages[menuItem.contentTypeId - 1]];
        break;
      case MenuItemType.Person:
        observables.push(this.getPeopleObservable(searchBarParams));
        pagesToUpdate = [this.peoplePage];
        break;
      case MenuItemType.Policy:
        observables.push(this.getPoliciesObservable(searchBarParams));
        pagesToUpdate = [this.policiesPage];
        break;
      default:
        break;
    }

    Observable.forkJoin(
      observables
    ).subscribe(outputs => {

      let totalElements = 0;

      // Populate pages
      for (let i = 0; i < pagesToUpdate.length; i++) {
        const output = outputs[i];
        const page = pagesToUpdate[i];
        Object.assign(page, output);

        totalElements += page.content.length;
      }

      // Clear data for pages that should not be shown
      for (let i = 0; i < this.pages.length; i++) {
        const pageToClear = this.pages[i];

        if (pagesToUpdate.indexOf(pageToClear) < 0) {
          pageToClear.clear();
        }
      }

      this.showEmptyState = totalElements === 0;
      this.updateSearchResultsSummary();
    });
  }

  updateSearchResultsSummary() {
    this.searchResultsSummary = [
      new SearchResultsSummary(this.menuService.nameGuides, this.guidesPage, this.guidesResults),
      new SearchResultsSummary(this.menuService.nameSupport, this.supportPage, this.supportResults),
      new SearchResultsSummary(this.menuService.nameInstrumentsEquipment, this.instrumentsEquipmentPage, this.instrumentsResults),
      new SearchResultsSummary(this.menuService.nameTraining, this.trainingPage, this.trainingResults),
      new SearchResultsSummary(this.menuService.nameSoftware, this.softwarePage, this.softwareResults),
      new SearchResultsSummary(this.menuService.nameFacilitiesSpaces, this.facilitiesSpacesPage, this.facilitiesResults),
      new SearchResultsSummary(this.menuService.namePeople, this.peoplePage, this.peopleResults),
      new SearchResultsSummary(this.menuService.nameKnowledgeArticle, this.knowledgeArticlePage, this.knowledgeArticleResults),
      new SearchResultsSummary(this.menuService.namePolicies, this.policiesPage, this.policiesResults)
    ];
  }

  getContentObservable(searchText: string, contentTypeId) {
    const searchParams = new ContentItemsSearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);
    searchParams.setContentTypes([contentTypeId]);
    return this.apiService.getContentItems(searchParams);
  }

  getPoliciesObservable(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);
    searchParams.setSize(this.maxNumberOfItems);
    return this.apiService.getPolicies(searchParams);
  }

  getPeopleObservable(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);
    searchParams.setSize(this.maxNumberOfItems);
    return this.apiService.getPeople(searchParams);
  }
}
