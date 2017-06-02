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
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import {SharedDataService} from "./app.sharedData.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    ResultsComponent,
    ProductComponent,
    SearchComponent
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
  providers: [appRoutingProviders, SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
