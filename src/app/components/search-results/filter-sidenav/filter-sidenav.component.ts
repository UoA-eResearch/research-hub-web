import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {SearchFiltersService, DEFAULT_FILTERS_VALUE} from '../search-filters/search-filters.service';
import {AppComponentService} from '../../../app.component.service';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss']
})
export class FilterSidenavComponent implements OnInit {

  public filtersForm : FormGroup;

  constructor(private searchFiltersService: SearchFiltersService,
              private appComponentService: AppComponentService) {
    this.filtersForm = searchFiltersService.filtersForm;
  }

  clear(){
    this.filtersForm.patchValue(DEFAULT_FILTERS_VALUE);
  }

  done(){
    this.appComponentService.setContentSidenavVisibility(false);
  }

  ngOnInit() {
  }

}
