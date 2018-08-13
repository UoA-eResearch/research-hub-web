import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './search-results.routing';
import {SharedModule} from 'app/components/shared/app.shared.module';
import {SearchResultsComponent} from './search-results.component';
import {FilterDialogComponent} from './filter-dialog/filter-dialog.component';
import {SearchFiltersModule} from './search-filters/search-filters.module';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';
import { OrderbySwitcherComponent } from './orderby-switcher/orderby-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchFiltersModule,
    routing
  ],
  declarations: [
    SearchResultsComponent,
    ViewSwitcherComponent,
    OrderbySwitcherComponent
  ],
  entryComponents: [
    FilterDialogComponent
  ]
})
export class SearchResultsModule {
}
