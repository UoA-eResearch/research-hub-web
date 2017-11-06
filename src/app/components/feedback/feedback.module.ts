import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './feedback.routing';

import {SharedModule} from 'app/app.shared.module';
import {FeedbackComponent} from './feedback.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    FeedbackComponent
  ]
})
export class FeedbackModule {
}
