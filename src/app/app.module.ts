import 'hammerjs';
import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {RoutingModule} from './routing/routing.module';
import {SharedModule} from './components/shared/app.shared.module';
import {ServicesModule} from './services/services.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServicesModule,
    SharedModule,
    RoutingModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
