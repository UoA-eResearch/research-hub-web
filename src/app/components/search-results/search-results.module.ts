import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import {AutocompleteSearchComponent} from './autocomplete-search/autocomplete-search.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {ResultsListComponent} from './results-list/results-list.component';
import {ResearchActivityToggleComponent} from './research-activity-toggle/research-activity-toggle.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    SearchResultsComponent,
    ResearchActivityToggleComponent,
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
