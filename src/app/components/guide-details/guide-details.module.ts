import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './guide-details.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {GuideDetailsComponent} from './guide-details.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    GuideDetailsComponent
  ]
})
export class GuideDetailsModule {
}
