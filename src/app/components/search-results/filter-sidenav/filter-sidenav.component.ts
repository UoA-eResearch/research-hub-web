import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {SearchFiltersService} from '../search-filters/search-filters.service';
import {AppComponentService} from '../../../app.component.service';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss']
})
export class FilterSidenavComponent implements OnInit {

  private filtersForm : FormGroup;

  constructor(searchFiltersService: SearchFiltersService,
              private appComponentService: AppComponentService) {
    this.filtersForm = searchFiltersService.filtersForm;
  }

  closeSidenav(){
    this.appComponentService.setContentSidenavVisibility(false);
  }

  ngOnInit() {
  }

}
