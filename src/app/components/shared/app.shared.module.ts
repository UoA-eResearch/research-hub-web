import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.material.module';
import {MarkdownComponent} from './markdown/markdown.component';
import {ListItemToRouterLinkPipe} from 'app/pipes/list-item-to-router-link.pipe';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    MarkdownComponent,
    ListItemToRouterLinkPipe
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownComponent,
    ListItemToRouterLinkPipe
  ],
  providers: [

  ],
})
export class SharedModule {
}
