import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {EducationComponent} from "./education/education.component";
import {GuidesComponent} from "./guides/guides.component";
import {PoliciesComponent} from "./policies/policies.component";
import {ServicesComponent} from "./services/services.component";
import {DetailsComponent} from "./details/details.component";
import {FiltersComponent} from "./filters/filters.component";
import {HomeComponent} from "./home/home.component";

import {routing, appRoutingProviders} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        EducationComponent,
        GuidesComponent,
        PoliciesComponent,
        ServicesComponent,
        DetailsComponent,
        FiltersComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})
export class AppModule {
}
