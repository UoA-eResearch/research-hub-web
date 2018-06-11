import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectComponent} from './project.component';

const routes: Routes = [
  {path: '', component: ProjectComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
