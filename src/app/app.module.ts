import "hammerjs";
import "rxjs/Rx";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdPaginatorModule,
  MdSelectModule,
  MdSidenavModule,
  MdToolbarModule,
  MdProgressBarModule
} from "@angular/material";
import {BreadcrumbService, Ng2BreadcrumbModule} from "ng2-breadcrumb/ng2-breadcrumb";


import {appRoutingProviders, routing} from "./app.routing";

import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {HomeComponent} from "./home/home.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {AnalyticsService} from "./app.analytics.service";
import {SearchBarService} from "./search-bar/search-bar.service";
import {ApiService} from "./app.api.service";
import {FeedbackComponent} from "./feedback/feedback.component";
import {BrowseComponent} from "./browse/browse.component";
import {NavigationService} from "./navigation.service";
import { ResultsListComponent } from './results-list/results-list.component';
import {SearchResultsComponent} from "./search-results/search-results.component";
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    SearchBarComponent,
    FeedbackComponent,
    SearchResultsComponent,
    BrowseComponent,
    ResultsListComponent,
    FeedbackFormComponent
  ],
  imports: [
    Ng2BreadcrumbModule,
    ReactiveFormsModule,
    MdPaginatorModule,
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
    MdProgressBarModule,
    routing
  ],
  providers: [appRoutingProviders, AnalyticsService, SearchBarService, ApiService, BreadcrumbService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
