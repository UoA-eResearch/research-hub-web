import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarParams, SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {ContentTypeIds, MenuItem, MenuItemType, MenuService} from "../menu.service";
import {ApiService, ContentItemsSearchParams, PeopleSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {ProgressBarService} from "../app.progress-bar.service";
import {Page} from "../model/Page";
import {Policy} from "../model/Policy";
import {AnalyticsService} from "../app.analytics.service";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup} from "@angular/forms";
import {OrgUnit} from "../model/OrgUnit";


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
  private searchChangeImmediateSub: Subscription;
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
  private contentPages: any[];
  private allPages: any[] = [];
  private showEmptyState = false;
  private showProgressBar = true;
  private people: Person[] = [];
  private orgUnits: OrgUnit[] = [];

  private filtersForm: FormGroup;
  private personFormControl: FormControl = new FormControl();
  private orgUnitFormControl: FormControl = new FormControl();
  private researchActivitiesFormControl: FormControl = new FormControl();


  constructor(private breadcrumbService: BreadcrumbService, protected searchBarService: SearchBarService,
              protected menuService: MenuService, private apiService: ApiService,
              private progressBarService: ProgressBarService, private analyticsService: AnalyticsService,
              private titleService: Title) {
    this.breadcrumbService.addFriendlyNameForRoute('/search', 'Search Results');
  }

  ngOnInit() {
    this.titleService.setTitle('Research Hub: Search Results');

    // Setup pages
    this.supportPage = new Page<Content>();
    this.instrumentsEquipmentPage = new Page<Content>();
    this.trainingPage = new Page<Content>();
    this.softwarePage = new Page<Content>();
    this.facilitiesSpacesPage = new Page<Content>();
    this.knowledgeArticlePage = new Page<Content>();
    this.guidesPage = new Page<Content>();
    this.peoplePage = new Page<Person>();
    this.policiesPage = new Page<Policy>();
    this.contentPages = [this.supportPage, this.instrumentsEquipmentPage, this.trainingPage, this.softwarePage,
      this.facilitiesSpacesPage, this.knowledgeArticlePage, this.guidesPage];
    this.allPages.push(...this.contentPages);
    this.allPages.push(this.peoplePage);
    this.allPages.push(this.policiesPage);

    // Setup filters
    this.filtersForm = new FormGroup({
      person: this.personFormControl,
      orgUnit: this.orgUnitFormControl,
      researchActivities: this.researchActivitiesFormControl
    });

    this.apiService.getPeople(new PeopleSearchParams()).subscribe(data => {
      this.people = data.content;
    });

    this.apiService.getOrgUnits(new SearchParams()).subscribe(data => {
      this.orgUnits = data.content;
    });

    // Subscribe to search changes
    this.searchChangeSub = Observable
      .combineLatest(
        this.searchBarService.searchChange.debounceTime(250).distinctUntilChanged(),
        this.personFormControl.valueChanges,
        this.orgUnitFormControl.valueChanges,
        this.researchActivitiesFormControl.valueChanges
      ).subscribe(latestValues => {
        this.showProgressBar = true;
        const [searchBarParams, person, orgUnit, researchActivities] = latestValues;
        this.onSearchChange(searchBarParams.category, searchBarParams.searchText, person, orgUnit, researchActivities);
      });

    // These need to be set initially so that the combineLatest observable will fire
    this.searchBarService.setSearchText('');
    this.personFormControl.setValue('');
    this.orgUnitFormControl.setValue('');
    this.researchActivitiesFormControl.setValue('');
  }

  ngOnDestroy() {
    this.searchChangeSub.unsubscribe();
  }

  onSearchChange(category: string, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    this.analyticsService.trackSearch(category, searchText);

    const categoryId = MenuService.getMenuItemId([category]);
    const menuItem = this.menuService.getMenuItem(categoryId);

    const observables = [];
    let pagesToUpdate = [];

    switch (menuItem.type) {
      case MenuItemType.All:
        pagesToUpdate.push(...this.contentPages);

        for (const contentTypeId of Object.keys(ContentTypeIds)) {
          if (Number(contentTypeId)) {
            observables.push(this.getContentObservable(
              searchText,
              Number(contentTypeId),
              personId,
              orgUnitId,
              researchActivityIds));
          }
        }

        const searchForPeople = !personId && (!researchActivityIds || researchActivityIds.length === 0);

        if (searchForPeople) {
          observables.push(this.getPeopleObservable(searchText, orgUnitId));
          pagesToUpdate.push(this.peoplePage);
        }

        if (!orgUnitId && searchForPeople) {
          observables.push(this.getPoliciesObservable(searchText));
          pagesToUpdate.push(this.policiesPage);
        }

        break;
      case MenuItemType.Content:
        observables.push(this.getContentObservable(searchText, menuItem.contentTypeId, personId,
          orgUnitId, researchActivityIds));
        pagesToUpdate = [this.contentPages[menuItem.contentTypeId - 1]];
        break;
      case MenuItemType.Person:
        observables.push(this.getPeopleObservable(searchText, orgUnitId));
        pagesToUpdate = [this.peoplePage];
        break;
      case MenuItemType.Policy:
        observables.push(this.getPoliciesObservable(searchText));
        pagesToUpdate = [this.policiesPage];
        break;
      default:
        break;
    }

    const observable = Observable.forkJoin(
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
      for (let i = 0; i < this.allPages.length; i++) {
        const pageToClear = this.allPages[i];

        if (pagesToUpdate.indexOf(pageToClear) < 0) {
          pageToClear.clear();
        }
      }

      this.showEmptyState = totalElements === 0;
      this.updateSearchResultsSummary();
      this.showProgressBar = false;
      observable.unsubscribe();
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

  getContentObservable(searchText: string, contentTypeId: number, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    const searchParams = new ContentItemsSearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);
    searchParams.setContentTypes([contentTypeId]);

    if (personId) {
      searchParams.setPeople([personId]);
    }

    if (orgUnitId) {
      searchParams.setOrgUnits([orgUnitId]);
    }

    if (researchActivityIds && researchActivityIds.length > 0) {
      searchParams.setResearchPhases(researchActivityIds);
    }

    return this.apiService.getContentItems(searchParams);
  }

  getPoliciesObservable(searchText: string) {
    const searchParams = new SearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);
    return this.apiService.getPolicies(searchParams);
  }

  getPeopleObservable(searchText: string, orgUnitId: number) {
    const searchParams = new PeopleSearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);

    if (orgUnitId) {
      searchParams.setOrgUnits([orgUnitId]);
    }

    return this.apiService.getPeople(searchParams);
  }
}
