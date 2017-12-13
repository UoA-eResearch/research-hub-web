import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './request-data.routing';

import {SharedModule} from 'app/components/shared/app.shared.module';
import {RequestDataComponent} from './request-data.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    RequestDataComponent
  ]
})
export class RequestDataModule {
}
