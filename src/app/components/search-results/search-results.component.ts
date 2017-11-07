import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchBarService} from 'app/components/search-bar/search-bar.service';
import {Subscription} from 'rxjs/Subscription';
import {OptionsService, CategoryIds} from 'app/services/options.service';
import {ApiService, ContentItemsSearchParams, PeopleSearchParams, SearchParams} from 'app/services/api.service';
import {Person} from 'app/model/Person';
import {Page} from 'app/model/Page';
import {AnalyticsService} from 'app/services/analytics.service';
import {Title} from '@angular/platform-browser';

import {FormControl, FormGroup} from '@angular/forms';
import {OrgUnit} from 'app/model/OrgUnit';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ToolbarService} from 'app/services/toolbar.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private buttonClickSub: Subscription;
  private searchChangeSub: Subscription;
  private routeParamsSub: Subscription;
  private searchCatSub: Subscription;

  private maxNumberOfItems = 1000;

  public filtersForm: FormGroup;
  private categoryFormControl: FormControl = new FormControl();
  private personFormControl: FormControl = new FormControl();
  private orgUnitFormControl: FormControl = new FormControl();
  private researchActivitiesFormControl: FormControl = new FormControl();
  private loadedRoute = false;

  private noResultsSummary = '';
  private resultsSummary = '';

  public resultsPage: Page<any>;

  public showEmptyState = false;
  public showProgressBar = true;
  public showPersonFilter = true;
  public showOrgUnitFilter = true;
  public showResearchActivityFilter = true;

  public people: Person[] = [];
  public orgUnits: OrgUnit[] = [];
  public category = undefined;
  public searchText = undefined;

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

  constructor(private searchBarService: SearchBarService,
              public optionsService: OptionsService, public apiService: ApiService,
              private analyticsService: AnalyticsService, private titleService: Title, private route: ActivatedRoute,
              private location: Location, public dialog: MatDialog, private toolbarService: ToolbarService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Research Hub: Search Results');

    // Setup pages
    this.resultsPage = new Page<any>();

    // Setup filters
    this.filtersForm = new FormGroup({
      category: this.categoryFormControl,
      person: this.personFormControl,
      orgUnit: this.orgUnitFormControl,
      researchActivities: this.researchActivitiesFormControl
    });

    // // Subscribe to search changes
    this.searchChangeSub = Observable
      .combineLatest(
        this.searchBarService.searchTextChange.debounceTime(250).distinctUntilChanged(),
        this.categoryFormControl.valueChanges,
        this.personFormControl.valueChanges,
        this.orgUnitFormControl.valueChanges,
        this.researchActivitiesFormControl.valueChanges
      )
      .debounceTime(100)
      .subscribe(latestValues => {
        this.showProgressBar = true;
        const [searchText, category, person, orgUnit, researchActivities] = latestValues;

        if (category !== this.searchBarService.category) {
          this.searchBarService.setCategory(category);
        }

        this.onSearchChange(category, searchText, person, orgUnit, researchActivities);
      });
    //
    const peopleSearchParams = new PeopleSearchParams();
    peopleSearchParams.setRoleTypes([3]);

    this.routeParamsSub = Observable
      .combineLatest(
        this.route.queryParams,
        this.apiService.getPeople(peopleSearchParams),
        this.apiService.getOrgUnits(new SearchParams())
      )
      .subscribe(latestValues => {
        if (!this.loadedRoute) {
          const [params, peoplePage, orgUnitsPage] = latestValues;

          this.people = peoplePage.content;
          this.orgUnits = orgUnitsPage.content;

          // These need to be set initially so that the combineLatest observable will fire
          const category = params['category'] || this.searchBarService.category;
          const searchText = typeof params['searchText'] === 'string' ? params['searchText'] : this.searchBarService.searchText;
          const person = Number(params['person']) || '';
          const orgUnit = Number(params['orgUnit']) || '';
          const researchActivities = SearchResultsComponent.parseParamArray(params['researchActivities']);

          this.updateFilterVisibility(category);
          this.searchBarService.setSearchText(searchText);
          this.searchBarService.setCategory(category);

          this.filtersForm.patchValue({
            category: category,
            person: person,
            orgUnit: orgUnit,
            researchActivities: researchActivities
          });

          this.loadedRoute = true;
        }
      });

    this.searchCatSub = this.searchBarService.searchCategoryChange.subscribe((category) => {
      if (category !== this.categoryFormControl.value) {
        this.categoryFormControl.setValue(category);
      }

      this.updateFilterVisibility(category);
    });

    this.buttonClickSub = this.toolbarService.buttonClickChange.subscribe((buttonName) => {
      if (buttonName === 'filter') {
        this.openDialog();
      }
    });
  }

  updateFilterVisibility(categoryId: number) {
    if (categoryId === CategoryIds.Person) {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = false;
    } else if (categoryId === CategoryIds.Policies) {
      this.showPersonFilter = false;
      this.showOrgUnitFilter = false;
      this.showResearchActivityFilter = false;
    } else {
      this.showPersonFilter = true;
      this.showOrgUnitFilter = true;
      this.showResearchActivityFilter = true;
    }
  }

  updateResultsSummary(categoryId: number, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    // let summary = 'Refined by ';
    const statements = [];

    if (categoryId) {
      statements.push('in <span class="search-results-text">' + this.optionsService.categoryOptions[categoryId - 1]['name'] + '</span>');
    }

    if (personId && this.showPersonFilter) {
      const person = this.people.find((p) => {
        return p.id === personId;
      });
      statements.push('supported by <span class="search-results-text">' + person.getTitle() + '</span>');
    }

    if (orgUnitId && this.showOrgUnitFilter) {
      const orgUnit = this.orgUnits.find((o) => {
        return o.id === orgUnitId;
      });
      statements.push('owned by the <span class="search-results-text">' + orgUnit.getTitle() + '</span>');
    }

    if (researchActivityIds && researchActivityIds.length > 0 && this.showResearchActivityFilter) {
      const activities = [];

      for (const researchActivityId of researchActivityIds) {
        activities.push('<span class="search-results-text">' + this.optionsService.researchActivityOptions[researchActivityId - 1]['name'] + '</span>');
      }

      let researchPhaseText = 'applicable to the ' + activities.join(', ') + ' research phase';

      if (researchActivityIds.length > 1) {
        researchPhaseText += 's';
      }

      statements.push(researchPhaseText);
    }

    let searchTextSummary = '';
    if (searchText) {
      searchTextSummary = 'for <span class="search-results-text">"' + searchText + '"</span> ';
    }

    const summary = searchTextSummary + statements.join(', ');
    this.noResultsSummary = 'Sorry - your search ' + summary + ' did not match anything on the Research Hub.';
    this.resultsSummary = 'Showing results ' + summary + '.';
  }

  updateUrl(categoryId: number, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    let url = '/search';
    const params = [];

    if (categoryId) {
      params.push('category=' + categoryId);
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
    this.buttonClickSub.unsubscribe();
  }

  onSearchChange(categoryId: number, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    // TODO: get string category
    const friendlyCategoryId = '';
    this.analyticsService.trackSearch(friendlyCategoryId, searchText);
    this.updateResultsSummary(categoryId, searchText, personId, orgUnitId, researchActivityIds);
    this.updateUrl(categoryId, searchText, personId, orgUnitId, researchActivityIds); // Update url displayed to user
    // const searchForPeople = !personId && (!researchActivityIds || researchActivityIds.length === 0);
    const searchObservable = this.getSearchObservable(categoryId, searchText, personId, orgUnitId, researchActivityIds).subscribe(page => {
      this.resultsPage = page;
      this.showEmptyState = page.totalElements === 0;
      this.showProgressBar = false;
      searchObservable.unsubscribe();
    });
  }

  getSearchObservable(categoryId: number, searchText: string, personId: number, orgUnitId: number, researchActivityIds: number[]) {
    // TODO: update
    const searchParams = new ContentItemsSearchParams();
    searchParams.setSearchText(searchText);
    searchParams.setSize(this.maxNumberOfItems);
    // searchParams.setContentTypes(contentTypeIds);

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

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        people: this.people,
        orgUnits: this.orgUnits,
        categoryOptions: this.optionsService.categoryOptions,
        filtersFormValue: this.filtersForm.getRawValue()}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filtersForm.patchValue(result);
    });
  }
}
