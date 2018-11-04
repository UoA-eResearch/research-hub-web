import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsComponent } from './search-results.component';
import { SearchResultsModule } from './search-results.module';
import { ServicesModule } from 'app/services/services.module';
import { SearchBarService } from '../search-bar/search-bar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Location,LocationStrategy } from '@angular/common';
import { SpyLocation, MockLocationStrategy } from '@angular/common/testing';
import { AppComponentService } from 'app/app.component.service';
import { SearchFiltersService } from './search-filters/search-filters.service';
import { ResearchHubApiService } from 'app/services/research-hub-api.service';
import { SearchResultsComponentService } from './search-results-component.service';
import { Observable } from 'rxjs';

class SearchResultsComponentStubService {
  public results$ : Observable<any> = Observable.of([]);
  public resultsLoading$ : Observable<boolean> = Observable.of(false);
  public searchWithParams(params: any){
    return;
  }

  initialiseSubjects(){
    return;
  }
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockRoute : ActivatedRoute = {} as ActivatedRoute;
  function expectToHandleNulls(fn,expectedValue,thisArg){
    const undefinedArgs = [],
    nullArgs = [];
    // Create an array of undefined and null values for all arguments.
    for (var i = 0; i < fn.length; i++){
      undefinedArgs.push(undefined);
      nullArgs.push(null);
    }
    expect(fn.apply(thisArg,undefinedArgs)).toBe(expectedValue,'successful and return expected value.');
    expect(fn.apply(thisArg,nullArgs)).toBe(expectedValue,'successful and return expected value.');
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ServicesModule, RouterModule ],
      providers: [ SearchBarService,
                   AppComponentService,
                   SearchFiltersService,
                   ResearchHubApiService,
                   {provide: SearchResultsComponentService, useClass:SearchResultsComponentStubService},
                   {provide: ActivatedRoute, useValue: mockRoute},
                   {provide: Location, useClass: SpyLocation},
                   {provide: LocationStrategy, useClass: MockLocationStrategy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#fromTags should handle null tags', () => {
    expectToHandleNulls(component.fromTags, [], component);
  });

  it('#setFiltersIfUndefined should handle null tags', ()=> {
    expectToHandleNulls(component.setFiltersTextIfUndefined, [], component);
  });
});
