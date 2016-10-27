import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {EducationComponent} from "./education/education.component";
import {GuidesComponent} from "./guides/guides.component";
import {PoliciesComponent} from "./policies/policies.component";
import {ServicesComponent} from "./services/services.component";
import {EdudetailsComponent} from "./details/edudetails.component";
import {GuidedetailsComponent} from "./details/guidedetails.component";
import {PolicydetailsComponent} from "./details/policydetails.component";
import {ServicesdetailsComponent} from "./details/servicesdetails.component";
import {HomeComponent} from "./home/home.component";
import { JsonpModule } from '@angular/http';

import {routing, appRoutingProviders} from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        EducationComponent,
        GuidesComponent,
        PoliciesComponent,
        ServicesComponent,
        EdudetailsComponent,
        GuidedetailsComponent,
        PolicydetailsComponent,
        ServicesdetailsComponent,
        HomeComponent
    ],
    imports: [
        JsonpModule,
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
