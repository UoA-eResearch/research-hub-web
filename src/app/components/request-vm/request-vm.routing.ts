import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RequestVmComponent} from './request-vm.component';

const routes: Routes = [
  {path: '', component: RequestVmComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
