import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {appRoutingProviders, routing} from './app.routing';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import {AnalyticsService} from './app.analytics.service';
import {SearchBarService} from './search-bar/search-bar.service';
import {ApiService} from './app.api.service';
import {FeedbackComponent} from './feedback/feedback.component';
import {BrowseComponent} from './browse/browse.component';
import {MenuService} from './menu.service';
import {ResultsListComponent} from './results-list/results-list.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { OrgUnitDetailsComponent } from './org-unit-details/org-unit-details.component';
import { FeaturedComponent } from './featured/featured.component';
import { ResearchActivityComponent } from './research-activity/research-activity.component';
import { HeaderComponent } from './header/header.component';
import { GuideDetailsComponent } from './guide-details/guide-details.component';
import { GuideCategoryComponent } from './guide-category/guide-category.component';
import { ResearchActivityToggleComponent } from './research-activity-toggle/research-activity-toggle.component';
import { AutocompleteSearchComponent } from './autocomplete-search/autocomplete-search.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ImageViewDialogComponent } from './image-view-dialog/image-view-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import {ToolbarService} from './toolbar.service';
import {AuthService} from './app.auth.service';
import { RequestVmComponent } from './request-vm/request-vm.component';
import {CanActivateViaAuthGuard} from './app.can-activate-via-auth-guard';


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
    ContentDetailsComponent,
    PersonDetailsComponent,
    MarkdownComponent,
    OrgUnitDetailsComponent,
    FeaturedComponent,
    ResearchActivityComponent,
    HeaderComponent,
    GuideDetailsComponent,
    GuideCategoryComponent,
    ResearchActivityToggleComponent,
    AutocompleteSearchComponent,
    ImageViewComponent,
    ImageViewDialogComponent,
    FilterDialogComponent,
    RequestVmComponent
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatExpansionModule,
    routing
  ],
  entryComponents: [ImageViewDialogComponent, FilterDialogComponent],
  providers: [appRoutingProviders, AnalyticsService, SearchBarService, ApiService, MenuService, AuthService,
    ToolbarService, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
