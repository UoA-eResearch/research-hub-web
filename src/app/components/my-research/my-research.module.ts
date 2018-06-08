import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './my-research.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {MyResearchComponent} from './my-research.component';


@NgModule({
  declarations: [
    MyResearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ]
})
export class MyResearchModule {
}
