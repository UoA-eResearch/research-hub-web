import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import {AutocompleteSearchComponent} from './autocomplete-search/autocomplete-search.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {ResultsListComponent} from './results-list/results-list.component';
import {ResearchActivityInputComponent} from './research-activity-input/research-activity-input.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    SearchResultsComponent,
    ResearchActivityInputComponent,
    AutocompleteSearchComponent,
    FilterDialogComponent,
    ResultsListComponent
  ],
  entryComponents: [
    FilterDialogComponent
  ]
})
export class SearchResultsModule {
}
