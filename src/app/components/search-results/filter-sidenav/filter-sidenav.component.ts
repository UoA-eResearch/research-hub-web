import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {SearchFiltersService} from '../search-filters/search-filters.service';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss']
})
export class FilterSidenavComponent implements OnInit {

  private filtersForm : FormGroup;

  constructor(searchFiltersService: SearchFiltersService) {
    this.filtersForm = searchFiltersService.filtersForm;
  }

  ngOnInit() {
  }

}
