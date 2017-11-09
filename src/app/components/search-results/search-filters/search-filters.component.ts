import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Tag} from '../mat-tags/mat-tags.component';
import {CategoryIds, OptionsService} from '../../../services/options.service';
import {GetResultsListItem} from 'app/model/ResultsListItemInterface';
import {ApiService, PeopleSearchParams, SearchParams} from 'app/services/api.service';
import {Observable} from 'rxjs/Observable';
import {SearchResultsComponent} from "../search-results.component";


@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchFiltersComponent implements OnInit, OnDestroy {

  private searchCatSub: Subscription;
  private dataSub: Subscription;

  @Input()
  public filtersForm: FormGroup;

  public showPersonFilter = true;
  public showOrgUnitFilter = true;
  public showResearchActivityFilter = true;

  public personTagSource: Tag[] = [];
  public orgUnitTagSource: Tag[] = [];

  constructor(private apiService: ApiService, public optionsService: OptionsService) {
  }

  ngOnInit() {
    this.searchCatSub = this.filtersForm.controls.categoryId.valueChanges.subscribe((categoryId) => {
      this.updateFilterVisibility(categoryId);
    });

    const peopleSearchParams = new PeopleSearchParams();
    peopleSearchParams.setRoleTypes([3]);

    this.dataSub = Observable
      .forkJoin(
        this.apiService.getPeople(peopleSearchParams),
        this.apiService.getOrgUnits(new SearchParams())
      ).subscribe(latestValues => {
        const [peoplePage, orgUnitsPage] = latestValues;

        this.personTagSource = this.toTags(peoplePage.content);
        this.orgUnitTagSource = this.toTags(orgUnitsPage.content);
      });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  toTags(items: GetResultsListItem[]) {
    return items.map(item => {
      return {id: item.getId(), text: item.getTitle(), imageUrl: this.apiService.getAssetUrl(item.getImage())};
    });
  }

  updateFilterVisibility(categoryId: number) {
    const visibilities = SearchResultsComponent.getFilterVisibility(categoryId);
    this.showPersonFilter = visibilities['person'];
    this.showOrgUnitFilter = visibilities['orgUnit'];
    this.showResearchActivityFilter = visibilities['researchActivity'];
  }
}
