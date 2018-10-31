import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSidenavComponent } from './filter-sidenav.component';
import { SearchResultsModule } from '../search-results.module';
import { SearchFiltersService } from '../search-filters/search-filters.service';
import { ResearchHubApiService } from 'app/services/research-hub-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { OptionsService } from 'app/services/options.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/components/shared/app.shared.module';

describe('FilterSidenavComponent', () => {
  let component: FilterSidenavComponent;
  let fixture: ComponentFixture<FilterSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SharedModule,
        SearchResultsModule,
      ],
      providers: [
        SearchFiltersService,
        ResearchHubApiService,
        OptionsService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSidenavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
