import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Tag} from '../mat-tags/mat-tags.component';
import {OptionsService, RoleTypeId} from '../../../services/options.service';
import {ResearchHubApiService, PeopleParams, Params} from 'app/services/research-hub-api.service';
import {Observable} from 'rxjs/Observable';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {SearchResultsComponent} from '../search-results.component';
import {ListItem} from '../../../model/ListItem';
import {OrgUnit} from '../../../model/OrgUnit';

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

  /**
  * Determines whether we should show certain widgets in a small size.
  */
  @Input()
  public compact : boolean = false;

  public showPersonFilter = true;
  public showOrgUnitFilter = true;
  public showResearchActivityFilter = true;

  public personTagSource: Tag[] = [];
  public orgUnitTagSource: Tag[] = [];

  constructor(private apiService: ResearchHubApiService, public optionsService: OptionsService) {
  }

  ngOnInit() {
    this.updateFilterVisibility(this.filtersForm.controls.categoryId.value); // Set inital filter visibility based on current category id

    // Update filter visibility when categoryId changes
    this.searchCatSub = this.filtersForm.controls.categoryId.valueChanges.subscribe((categoryId) => {
      this.updateFilterVisibility(categoryId);
    });

    const peopleParams = new PeopleParams();
    peopleParams.setRoleTypes([RoleTypeId.UserSupport]);

    this.dataSub = forkJoin(
        this.apiService.getPeople(peopleParams),
        this.apiService.getOrgUnits(new Params())
      ).subscribe(latestValues => {
        const [peoplePage, orgUnitPage] = latestValues;

        this.personTagSource = this.listItemToTags(peoplePage.content);
        this.orgUnitTagSource = this.orgUnitToTags(orgUnitPage.content);
      });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  listItemToTags(items: ListItem[]) {
    return items.map(item => {
      return {id: item.id, text: item.title, imageUrl: this.apiService.getAssetUrl(item.image)};
    });
  }

  orgUnitToTags(items: OrgUnit[]) {
    return items.map(item => {
      return {id: item.id, text: item.name, imageUrl: this.apiService.getAssetUrl(item.image)};
    });
  }

  setCategory(value){
    this.filtersForm.controls.categoryId.setValue(value);
  }

  updateFilterVisibility(categoryId: number) {
    const visibilities = SearchResultsComponent.getFilterVisibility(categoryId),
    controls = this.filtersForm.controls;
    if (visibilities['person']){
      controls.personTags.enable();
    } else {
      controls.personTags.disable();
    }
    if (visibilities['orgUnit']){
      controls.orgUnitTags.enable();
    } else {
      controls.orgUnitTags.disable();
    }
    if (visibilities['researchActivity']){
      controls.researchActivityIds.enable();
    } else {
      controls.researchActivityIds.disable();
    }
    //this.showPersonFilter = visibilities['person'];
    //this.showOrgUnitFilter = visibilities['orgUnit'];
    //this.showResearchActivityFilter = visibilities['researchActivity'];
  }
}
