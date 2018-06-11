import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './project.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {ProjectComponent} from './project.component';


@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing,
  ]
})
export class ProjectModule {}
