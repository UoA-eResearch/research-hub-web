import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {ResearchActivityInputComponent} from './research-activity-input/research-activity-input.component';
import {MatTagsComponent} from './mat-tags/mat-tags.component';
import {SearchFiltersComponent} from './search-filters/search-filters.component';
import {SearchResultLinkDirective} from './search-result-link/search-result-link.directive';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    SearchResultsComponent,
    ResearchActivityInputComponent,
    FilterDialogComponent,
    MatTagsComponent,
    SearchFiltersComponent,
    SearchResultLinkDirective
  ],
  entryComponents: [
    FilterDialogComponent
  ]
})
export class SearchResultsModule {
}
