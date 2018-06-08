import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyResearchComponent} from './my-research.component';

const routes: Routes = [
  {path: '', component: MyResearchComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
