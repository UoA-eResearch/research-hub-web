import { TestBed, inject } from '@angular/core/testing';

import { SearchResultsComponentService } from './search-results-component.service';

describe('SearchResultsComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResultsComponentService]
    });
  });

  it('should be created', inject([SearchResultsComponentService], (service: SearchResultsComponentService) => {
    expect(service).toBeTruthy();
  }));
});
