import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';
import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {SearchFiltersModule} from './search-filters/search-filters.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchFiltersModule,
    routing
  ],
  declarations: [
    SearchResultsComponent
  ],
  entryComponents: [
    FilterDialogComponent
  ]
})
export class SearchResultsModule {
}
