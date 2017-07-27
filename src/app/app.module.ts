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
  MdToolbarModule
} from "@angular/material";
import {BreadcrumbService, Ng2BreadcrumbModule} from "ng2-breadcrumb/ng2-breadcrumb";


import {appRoutingProviders, routing} from "./app.routing";

import {AppComponent} from "./app.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";
import {AnalyticsService} from "./app.analytics.service";
import {SearchService} from "./app.search.service";
import {ApiService} from "./app.api.service";
import {FeedbackComponent} from "./feedback/feedback.component";
import {ResultsComponent} from "./results/results.component";
import {NavigationService} from "./navigation.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    SearchComponent,
    FeedbackComponent,
    ResultsComponent
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
    routing
  ],
  providers: [appRoutingProviders, AnalyticsService, SearchService, ApiService, BreadcrumbService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
