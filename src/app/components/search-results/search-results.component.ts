import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchBarService} from 'app/components/search-bar/search-bar.service';
import {Subscription} from 'rxjs/Subscription';
import {CategoryId, OptionsService, RoleTypeId} from 'app/services/options.service';
import {
  ResearchHubApiService, OrderBy,
  SearchResultsParams
} from 'app/services/research-hub-api.service';
import {Page} from 'app/model/Page';
import {AnalyticsService} from 'app/services/analytics.service';

import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import {Tag} from './mat-tags/mat-tags.component';
import {ListItem} from '../../model/ListItem';
import {AppComponentService} from '../../app.component.service';
import {PageEvent} from '@angular/material/paginator';
import {Subject} from 'rxjs/Subject';
import {MatPaginator} from '@angular/material/paginator';
import {LayoutService} from '../../services/layout.service';

import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('resultsDummyHeader') private resultsDummyHeader: ElementRef;

  public filtersForm: FormGroup;
  public resultsPage: Page<ListItem>;

  private buttonClickSub: Subscription;
  private categoryIdSub: Subscription;
  private searchChangeSub: Subscription;
  private routeParamsSub: Subscription;

  public searchTextIsBlank = true;
  public noResultsSummary = '';
  public resultsSummary = '';
  public showEmptyState = false;
  public sortOptions = [{id: OrderBy.Alphabetical, name: 'Alphabet'}, {id: OrderBy.Relevance, name: 'Relevance'}];
  public pageSizeOptions = [5, 10, 25, 50, 100, 1000];

  public orderBy;
  public pageSize;
  public pageIndex;

  private pageEventChange: Subject<any> = new Subject<any>();
  private orderByChange: Subject<OrderBy> = new Subject<OrderBy>();
  private previousPageEvent: any;
  private previousFiltersFormValues: any;
  private previousSearchText: any;

  // Used for determining number of columns for card-view results
  public cardViewResultsNumberOfColumns = 3;
  private mediaSub: Subscription;

  public showCardView = false;

  public static getFilterVisibility(categoryId: number) {
    return {
      person: categoryId !== CategoryId.Policies && categoryId !== CategoryId.Person,
      orgUnit: categoryId !== CategoryId.Policies,
      researchActivity: categoryId !== CategoryId.Policies && categoryId !== CategoryId.Person
    };
  }

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

  fromTags(tags: Tag[]) {
    return tags.map(tag => tag.id);
  }

  toTags(ids: number[]) {
    return ids.map(id => {
      return {id: id};
    });
  }

  constructor(private searchBarService: SearchBarService,
              public optionsService: OptionsService, public apiService: ResearchHubApiService,
              private analyticsService: AnalyticsService, private route: ActivatedRoute,
              private location: Location, public dialog: MatDialog, private appComponentService: AppComponentService,
              private layoutService: LayoutService, private media: ObservableMedia) {
  }

  // Results cards
  updateCols(mqAlias: string) {
    const cols = this.layoutService.getNumGridColsCardResults(mqAlias);
    this.cardViewResultsNumberOfColumns = Math.min(3, cols);
  }

  ngOnInit() {
    // Results cards
    this.updateCols(this.layoutService.getMQAlias());

    this.mediaSub = this.media.subscribe((change: MediaChange) => {
      this.updateCols(change.mqAlias);
    });

    // Results page
    this.resultsPage = {totalElements: 0} as Page<ListItem>;

    // Filters form
    this.filtersForm = new FormGroup({
      categoryId: new FormControl(),
      personTags: new FormControl([]),
      orgUnitTags: new FormControl([]),
      researchActivityIds: new FormControl()
    });

    // Category changes
    this.categoryIdSub = this.searchBarService.searchCategoryChange.subscribe(category => {
      if (category !== this.filtersForm.controls.categoryId.value) {
        this.filtersForm.controls.categoryId.patchValue(category);
      }
    });

    // Subscribe to search parameter changes
    this.searchChangeSub = Observable
      .combineLatest(
        this.searchBarService.searchTextChange.debounceTime(250).distinctUntilChanged(),
        this.filtersForm.valueChanges.distinctUntilChanged(),
        this.pageEventChange.distinctUntilChanged(),
        this.orderByChange
      )
      .debounceTime(100)
      .subscribe(latestValues => {
        const [searchText, filtersFormValues, pageEvent, orderBy] = latestValues;

        this.searchTextIsBlank = searchText == "";

        if (filtersFormValues.categoryId !== this.searchBarService.category) {
          this.searchBarService.setCategory(filtersFormValues.categoryId);
        }

        if ((this.previousSearchText !== searchText || this.previousFiltersFormValues !== filtersFormValues) && this.previousPageEvent === pageEvent) {
          pageEvent.pageIndex = 0;
          this.paginator.pageIndex = 0;
        }

        this.onSearchChange(filtersFormValues.categoryId, searchText, filtersFormValues.personTags,
          filtersFormValues.orgUnitTags, filtersFormValues.researchActivityIds, pageEvent, orderBy);

        this.previousPageEvent = pageEvent;
        this.previousSearchText = searchText;
        this.previousFiltersFormValues = filtersFormValues;
      });

    // Update filtersForm and searchBar based on route parameters
    this.routeParamsSub =
      this.route.queryParams
      .subscribe(params => {
        // These need to be set initially so that the combineLatest observable will fire
        // Always set category id and search text  from url if you want to change them
        const categoryId = +(params['categoryId'] || CategoryId.All);
        const searchText = typeof params['searchText'] === 'string' ? params['searchText'] : '';
        const personIds = SearchResultsComponent.parseParamArray(params['personIds']);
        const orgUnitIds = SearchResultsComponent.parseParamArray(params['orgUnitIds']);
        const researchActivityIds = SearchResultsComponent.parseParamArray(params['researchActivityIds']);
        this.pageIndex = +(params['pageIndex'] || 0);
        this.pageSize = +(params['pageSize'] || 10);
        this.orderBy = params['orderBy'] || OrderBy.Relevance;
        // this.orderBy = this.searchTextIsBlank ? params['orderBy'] || OrderBy.Alphabetical : params['orderBy'] || OrderBy.Relevance;
        //Issue: Only gets called once

        // Update values in search bar and search filters form
        this.searchBarService.setSearchText(searchText);
        this.searchBarService.setCategory(categoryId);
        this.filtersForm.controls.categoryId.setValue(categoryId);
        this.filtersForm.controls.personTags.setValue(this.toTags(personIds));
        this.filtersForm.controls.orgUnitTags.setValue(this.toTags(orgUnitIds));
        this.filtersForm.controls.researchActivityIds.setValue(researchActivityIds);

        // Send page event order by event to trigger search
        this.pageEventChange.next({pageIndex: this.pageIndex, pageSize: this.pageSize} as PageEvent);
        this.orderByChange.next(this.orderBy);
      });

    this.buttonClickSub = this.searchBarService.filterButtonClickChange.subscribe((buttonName) => {
      this.openDialog();
    });
  }

  onPageChange(event: PageEvent) {
    this.pageEventChange.next({pageSize: event.pageSize, pageIndex: event.pageIndex});
    this.resultsDummyHeader.nativeElement.scrollIntoView();
  }

  onOrderByChange(event: any) {
    this.orderByChange.next(event.value);
  }

  onSearchChange(categoryId: number, searchText: string, personTags: Tag[], orgUnitTags: Tag[], researchActivityIds: number[], pageEvent: any, orderBy: OrderBy) {
    const friendlyCategoryId = this.optionsService.categoryOptions.filter((obj) => {
      return obj.id === categoryId;
    })[0].name;

    this.analyticsService.trackSearch(friendlyCategoryId, searchText);
    this.appComponentService.setProgressBarVisibility(true);

    const personIds = this.fromTags(personTags);
    const orgUnitIds = this.fromTags(orgUnitTags);
    this.updateUrl(categoryId, searchText, personIds, orgUnitIds, researchActivityIds, pageEvent, orderBy);

    const params = new SearchResultsParams();
    params.setObjectType('all');
    params.setSearchText(searchText);
    params.setPage(pageEvent.pageIndex);
    params.setSize(pageEvent.pageSize);
    params.setOrderBy(orderBy);

    if (categoryId !== CategoryId.All) {
      if (categoryId === CategoryId.Policies) {
        params.setObjectType('policy');
      } else if (categoryId === CategoryId.Person) {
        params.setObjectType('person');
        params.setOrgUnits(orgUnitIds);
        params.setRoleTypes([RoleTypeId.UserSupport]);
      } else {
        const contentTypeIds = this.optionsService.contentTypeMap[categoryId];
        params.setObjectType('content');
        params.setContentTypes(contentTypeIds);
        params.setResearchPhases(researchActivityIds);
        params.setPeople(personIds);
        params.setRoleTypes([RoleTypeId.UserSupport]);
        params.setOrgUnits(orgUnitIds);
      }
    } else {
      params.setPeople(personIds);
      params.setRoleTypes([RoleTypeId.UserSupport]);
      params.setOrgUnits(orgUnitIds);
      params.setResearchPhases(researchActivityIds);
    }

    const resultsSub = this.apiService.getSearchResults(params).subscribe(page => {
      this.resultsPage = page;
      this.orderBy = page.sort;
      this.updateResultsSummary(page, categoryId, searchText, personTags, orgUnitTags, researchActivityIds);
      resultsSub.unsubscribe();
      this.appComponentService.setProgressBarVisibility(false);
    });
  }

  updateUrl(categoryId: number, searchText: string, personIds: number[], orgUnitIds: number[], researchActivityIds: number[], pageEvent: any, orderBy: OrderBy) {
    let url = '/search';
    const params = [];
    const visibilities = SearchResultsComponent.getFilterVisibility(categoryId);

    if (categoryId) {
      params.push('categoryId=' + categoryId);
    }

    if (searchText) {
      params.push('searchText=' + searchText);
    }

    if (personIds  && personIds.length && visibilities['person']) {
      params.push('personIds=' + personIds.join(','));
    }

    if (orgUnitIds  && orgUnitIds.length && visibilities['orgUnit']) {
      params.push('orgUnitIds=' + orgUnitIds.join(','));
    }

    if (researchActivityIds && researchActivityIds.length && visibilities['researchActivity']) {
      params.push('researchActivityIds=' + researchActivityIds.join(','));
    }

    if (pageEvent) {
      params.push('pageIndex=' + pageEvent.pageIndex);
      params.push('pageSize=' + pageEvent.pageSize);
    }

    if (orderBy) {
      params.push('orderBy=' + orderBy);
    }

    const paramsStr = params.join('&');
    if (paramsStr) {
      url += '?' + paramsStr;
    }

    this.location.replaceState(encodeURI(url)); // Update url without reloading page
  }

  updateResultsSummary(page: Page<ListItem>, categoryId: number, searchText: string, personTags: Tag[], orgUnitTags: Tag[], researchActivityIds: number[]) {
    const statements = [];
    const visibilities = SearchResultsComponent.getFilterVisibility(categoryId);

    if (categoryId) {
      statements.push('in <span class="search-results-text">' + this.optionsService.categoryOptions[categoryId - 1]['name'] + '</span>');
    }

    if (personTags && personTags.length && visibilities['person']) {
      const people = [];

      for (const tag of personTags) {
        people.push('<span class="search-results-text">' + tag.text + '</span>');
      }

      statements.push('supported by ' + people.join(', '));
    }

    if (orgUnitTags && orgUnitTags.length && visibilities['orgUnit']) {
      const orgUnits = [];

      for (const tag of orgUnitTags) {
        orgUnits.push('<span class="search-results-text">' + tag.text + '</span>');
      }

      statements.push('provided by ' + orgUnits.join(', '));
    }

    if (researchActivityIds && researchActivityIds.length && visibilities['researchActivity']) {
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
    this.noResultsSummary = 'Sorry - your search ' + summary + ', did not match anything on the ResearchHub.';
    this.resultsSummary = 'Page <span class="search-results-text">' + (page.number + 1) + '</span> of <span class="search-results-text">' + page.totalElements + '</span> results ' + summary + '.';
    this.showEmptyState = page.totalElements === 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: '100%',
      width: '100%',
      height: '100%',
      data: {
        rawFormValues: this.filtersForm.getRawValue()
      }
    });

    dialogRef.afterClosed().subscribe(rawFormValues => {
      this.filtersForm.patchValue(rawFormValues);
    });
  }

  trackOutboundLink(result: ListItem) {
    if (result['type'] !== undefined && result['type'] === 'policy') {
      this.analyticsService.trackPolicy(result.title, result.url);
    } else {
      this.analyticsService.trackOutboundLink(result.url);
    }
  }

  ngOnDestroy() {
    this.categoryIdSub.unsubscribe();
    this.searchChangeSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
    this.buttonClickSub.unsubscribe();
  }
}
