import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './my-research.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {MyResearchComponent} from './my-research.component';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    MyResearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    routing,
    MatTabsModule
  ]
})
export class MyResearchModule {
}
