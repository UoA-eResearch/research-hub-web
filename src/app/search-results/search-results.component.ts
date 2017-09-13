import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from "ng2-breadcrumb/ng2-breadcrumb";
import {SearchBarService} from "../search-bar/search-bar.service";
import {Subscription} from "rxjs/Subscription";
import {ContentTypeIds, MenuItemType, MenuService} from "../menu.service";
import {ApiService, ContentItemsSearchParams, PeopleSearchParams, SearchParams} from "../app.api.service";
import {Person} from "../model/Person";
import {Content} from "../model/Content";
import {Page} from "../model/Page";
import {Policy} from "../model/Policy";
import {AnalyticsService} from "../app.analytics.service";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup} from "@angular/forms";
import {OrgUnit} from "../model/OrgUnit";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {FilterDialogComponent} from "../filter-dialog/filter-dialog.component";
import {MdDialog} from "@angular/material";


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private searchChangeSub: Subscription;
  private routeParamsSub: Subscription;
  private searchCatSub: Subscription;
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
  private contentPages: any[];
  private allPages: any[] = [];
  private showEmptyState = false;
  private showProgressBar = true;
  private people: Person[] = [];
  private orgUnits: OrgUnit[] = [];
  private categories = [];

  private filtersForm: FormGroup;
  private categoryFormControl: FormControl = new FormControl();
  private personFormControl: FormControl = new FormControl();
  private orgUnitFormControl: FormControl = new FormControl();
  private researchActivitiesFormControl: FormControl = new FormControl();
  private loadedRoute = false;

  private showPersonFilter = true;
  private showOrgUnitFilter = true;
  private showResearchActivityFilter = true;
  private rightColSize = 67;

  private static parseParamArray(str: string) {
    let nums = [];

    if (str) {
      if (str.includes(',')) {
        nums = str.split(',');
      } else {
        nums = [str];
      }

      nums = nums.reduce((result, value) => {
        const num = Number(value);

        if (num) {
          result.push(num);
        }

        return result;
      }, []);
    }

    return nums;
  }

  constructor(private breadcrumbService: BreadcrumbService, protected searchBarService: SearchBarService,
              protected menuService: MenuService, private apiService: ApiService,
              private analyticsService: AnalyticsService, private titleService: Title, private route: ActivatedRoute,
              private location: Location, public dialog: MdDialog) {
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
    // Populate menuItems for search-bar bar
    this.categories = this.menuService.getMenuItem('/').menuItems;

    this.filtersForm = new FormGroup({
      category: this.categoryFormControl,
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

    this.routeParamsSub = this.route
      .queryParams
      .subscribe(params => {
        if (!this.loadedRoute) {
          // These need to be set initially so that the combineLatest observable will fire
          const category = params['category'] || this.searchBarService.category;
          const searchText = typeof params['searchText'] === 'string' ? params['searchText'] : this.searchBarService.searchText;
          const person = params['person'] || '';
          const orgUnit = params['orgUnit'] || '';
          const researchActivities = SearchResultsComponent.parseParamArray(params['researchActivities']);

          this.updateFilterVisibility(category);
          this.searchBarService.setSearchText(searchText);
          this.searchBarService.setCategory(category);
          this.personFormControl.setValue(person);
          this.orgUnitFormControl.setValue(orgUnit);
          this.researchActivitiesFormControl.setValue(researchActivities);

          this.loadedRoute = true;
        }
      });

    this.searchCatSub = this.searchBarService.searchCategoryChange.subscribe((category) => {
      this.updateFilterVisibility(category);
    });
  }

  updateFilterVisibility(category: string) {
    if (category === 'people') {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = false;
      this.rightColSize = 67;
    } else if (category === 'policies') {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = false;
      this.showResearchActivityFilter = false;
      this.rightColSize = 100;
    } else {
      this.showPersonFilter = true;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = true;
      this.rightColSize = 67;
    }
  }

  updateUrl(category: string, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    let url = '/search';
    const params = [];

    if (category) {
      params.push('category=' + category);
    }

    if (searchText) {
      params.push('searchText=' + searchText);
    }

    if (personId && this.showPersonFilter) {
      params.push('person=' + personId);
    }

    if (orgUnitId && this.showOrgUnitFilter) {
      params.push('orgUnit=' + orgUnitId);
    }

    if (researchActivityIds && researchActivityIds.length > 0 && this.showResearchActivityFilter) {
      params.push('researchActivities=' + researchActivityIds.join(','));
    }

    const paramsStr = params.join('&');
    if (paramsStr) {
      url += '?' + paramsStr;
    }

    this.location.replaceState(encodeURI(url)); // Update url without reloading page
  }

  ngOnDestroy() {
    this.searchChangeSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
    this.searchCatSub.unsubscribe();
  }

  onSearchChange(category: string, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    this.analyticsService.trackSearch(category, searchText);
    this.updateUrl(category, searchText, personId, orgUnitId, researchActivityIds); // Update url displayed to user

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
      this.showProgressBar = false;
      observable.unsubscribe();
    });
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '100%',
      height: '100%',
      data: { name: 'hello', animal: 'hello' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
