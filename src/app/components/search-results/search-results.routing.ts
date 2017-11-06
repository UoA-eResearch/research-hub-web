import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchResultsComponent} from './search-results.component';

const routes: Routes = [
  {path: '', component: SearchResultsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
