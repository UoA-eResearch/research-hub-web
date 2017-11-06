import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {AnalyticsService} from './app.analytics.service';
import {ApiService} from './app.api.service';
import {MenuService} from './app.menu.service';
import {ToolbarService} from './app.toolbar.service';
import {AuthService} from './app.auth.service';
import {LayoutService} from './app.layout.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AnalyticsService,
    ApiService,
    MenuService,
    AuthService,
    ToolbarService,
    LayoutService
  ],
  exports: []
})
export class ServicesModule {
}
