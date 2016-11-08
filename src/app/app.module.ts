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
import {EdudetailsComponent} from "./details/edudetails.component";
import {GuidedetailsComponent} from "./details/guidedetails.component";
import {PolicydetailsComponent} from "./details/policydetails.component";
import {ServicesdetailsComponent} from "./details/servicesdetails.component";
import {HomeComponent} from "./home/home.component";
import { JsonpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {ShowcaseComponent} from "./showcase/showcase.component";

@NgModule({
    declarations: [
        AppComponent,
        EducationComponent,
        GuidesComponent,
        PoliciesComponent,
        ServicesComponent,
        DetailsComponent,
        EdudetailsComponent,
        GuidedetailsComponent,
        PolicydetailsComponent,
        ServicesdetailsComponent,
        LifecycleComponent,
        ShowcaseComponent,
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
