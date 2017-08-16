import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarParams, SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ApiService, ContentItemsSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";
import {Page} from "../model/Page";
import {Policy} from "../model/Policy";
import {isUndefined} from "util";


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
  @ViewChild('supportResults') supportResults: ElementRef;
  @ViewChild('instrumentsResults') instrumentsResults: ElementRef;
  @ViewChild('trainingResults') trainingResults: ElementRef;
  @ViewChild('softwareResults') softwareResults: ElementRef;
  @ViewChild('facilitiesResults') facilitiesResults: ElementRef;
  @ViewChild('peopleResults') peopleResults: ElementRef;
  @ViewChild('knowledgeArticleResults') knowledgeArticleResults: ElementRef;
  @ViewChild('policiesResults') policiesResults: ElementRef;

  private searchChangeSub: Subscription;
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

  constructor(private breadcrumbService: BreadcrumbService, protected searchBarService: SearchBarService,
              protected menuService: MenuService, private apiService: ApiService, private progressBarService: ProgressBarService) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  onSearchChange(searchBarParams: SearchBarParams) {
    console.log('SearchResultsComponent: searchChange', searchBarParams);
    this.progressBarService.setVisible();
    const categoryId = MenuService.getMenuItemId([searchBarParams.category]);
    const menuItem = this.menuService.getMenuItem(categoryId);

    this.supportPage = undefined;
    this.instrumentsEquipmentPage = undefined;
    this.trainingPage = undefined;
    this.softwarePage = undefined;
    this.facilitiesSpacesPage = undefined;
    this.peoplePage = undefined;
    this.knowledgeArticlePage = undefined;
    this.policiesPage = undefined;

    console.log('supportResults', this.supportResults.nativeElement);

    switch (menuItem.type) {
      case MenuItemType.All:
        this.getContent(searchBarParams, menuItem);
        this.getPeople(searchBarParams);
        this.getPolicies(searchBarParams);
        break;
      case MenuItemType.Content:
        this.getContent(searchBarParams, menuItem);
        break;
      case MenuItemType.Guide:
        break;
      case MenuItemType.Person:
        this.getPeople(searchBarParams);
        break;
      case MenuItemType.Policy:
        this.getPolicies(searchBarParams);
        break;
      default:
        break;
    }
  }

  getContent(searchBarParams: SearchBarParams, menuItem: MenuItem) {
    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdSupport) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdSupport, page => {
        this.supportPage = page;
        this.updateSearchResultsSummary();
      });
    }

    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdInstrumentsEquipment) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdInstrumentsEquipment, page => {
        this.instrumentsEquipmentPage = page;
        this.updateSearchResultsSummary();
      });
    }

    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdTraining) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdTraining, page => {
        this.trainingPage = page;
        this.updateSearchResultsSummary();
      });
    }

    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdSoftware) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdSoftware, page => {
        this.softwarePage = page;
        this.updateSearchResultsSummary();
      });
    }

    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdFacilitiesSpaces) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdFacilitiesSpaces, page => {
        this.facilitiesSpacesPage = page;
        this.updateSearchResultsSummary();
      });
    }

    if (menuItem.type === MenuItemType.All || menuItem.contentTypeId === this.menuService.contentTypeIdKnowledgeArticle) {
      this.getContentItems(searchBarParams.searchText, this.menuService.contentTypeIdKnowledgeArticle, page => {
        this.knowledgeArticlePage = page;
        this.updateSearchResultsSummary();
      });
    }


  }

  updateSearchResultsSummary() {
    this.searchResultsSummary = [
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

  getContentItems(searchText: string, contentTypeId: number, func) {
    const searchParams = new ContentItemsSearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);
    searchParams.setContentTypes([contentTypeId]);
    this.apiService.getContentItems(searchParams).subscribe(func);
  }

  getPolicies(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);
    searchParams.setSize(this.maxNumberOfItems);

    this.apiService.getPolicies(searchParams).subscribe(
      page => {
        this.policiesPage = page;
        this.updateSearchResultsSummary();
      }
    );
  }

  getPeople(searchBarParams: SearchBarParams) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchBarParams.searchText);
    searchParams.setSize(this.maxNumberOfItems);

    this.apiService.getPeople(searchParams).subscribe(
      page => {
        this.peoplePage = page;
        this.updateSearchResultsSummary();
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
