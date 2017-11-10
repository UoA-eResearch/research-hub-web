import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.material.module';
import {MarkdownComponent} from './markdown/markdown.component';
import {ListItemRouterLinkPipe} from 'app/pipes/list-item-router-link.pipe';


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
    ListItemRouterLinkPipe
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MarkdownComponent,
    ListItemRouterLinkPipe
  ],
  providers: [

  ],
})
export class SharedModule {
}
