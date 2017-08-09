import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {BrowseComponent} from "./browse/browse.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ContentDetailsComponent} from "./content-details/content-details.component";
import {PersonDetailsComponent} from "./person-details/person-details.component";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchResultsComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'browse/:menuItemId', component: BrowseComponent},
  {path: 'browse/:menuItemId/:subcategoryId', component: BrowseComponent},
  {path: 'contentDetails/:id', component: ContentDetailsComponent},
  {path: 'personDetails/:id', component: PersonDetailsComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
