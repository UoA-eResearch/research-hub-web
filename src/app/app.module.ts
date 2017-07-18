import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdInputModule, MdGridListModule, MdButtonModule, MdCheckboxModule, MdSidenavModule, MdToolbarModule,
  MdIconModule, MdListModule, MdSelectModule, MdCardModule
} from '@angular/material';

import {routing, appRoutingProviders} from './app.routing';

import {AppComponent} from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { ProductOverviewComponent } from './product-overview/product-overview.component';
import { SearchComponent } from './search/search.component';
import {SharedDataService} from './app.sharedData.service';
import {AnalyticsService} from './app.analytics.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {SearchService} from './app.search.service';
import {ApiService} from './app.api.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ResultsComponent,
    ProductOverviewComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    ReactiveFormsModule,
    MdSelectModule,
    MdGridListModule,
    MdIconModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdInputModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    routing
  ],
  providers: [appRoutingProviders, SharedDataService, AnalyticsService, SearchService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
