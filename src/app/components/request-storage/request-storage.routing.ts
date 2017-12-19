import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestStorageComponent} from './request-storage.component';

const routes: Routes = [
  {path: '', component: RequestStorageComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
