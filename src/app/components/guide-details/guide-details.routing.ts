import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuideDetailsComponent} from './guide-details.component';

const routes: Routes = [
  {path: '', component: GuideDetailsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
