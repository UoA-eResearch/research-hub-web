import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../app.material.module';

import {HeaderComponent} from './header/header.component';
import {MarkdownComponent} from './markdown/markdown.component';
import {SearchBarService} from './search-bar/search-bar.service';
import {SearchBarComponent} from './search-bar/search-bar.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    SearchBarComponent,
    MarkdownComponent,
    HeaderComponent,
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SearchBarComponent,
    MarkdownComponent,
    HeaderComponent
  ],
  providers: [
    SearchBarService
  ],
})
export class SharedModule {
}
