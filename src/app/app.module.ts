import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {HomeComponent} from "./home/home.component";
import { JsonpModule } from '@angular/http';
import {routing, appRoutingProviders} from './app.routing';
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {ShowcaseComponent} from "./showcase/showcase.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {StarsComponent} from "./stars/stars.component";
import {ProductOverviewComponent} from "./productOverview/productOverview.component";
import {ProductListComponent} from "./productList/productList.component";
import {ProductDetailsComponent} from "./productDetails/productDetails.component";
import {ComingSoonComponent} from "./comingSoon/comingSoon.component";

@NgModule({
    declarations: [
        AppComponent,
        LifecycleComponent,
        ProductOverviewComponent,
        ProductListComponent,
        ProductDetailsComponent,
        ShowcaseComponent,
        HomeComponent,
        SpinnerComponent,
        StarsComponent,
        ComingSoonComponent
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
