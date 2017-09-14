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
import {OrgUnitDetailsComponent} from "./org-unit-details/org-unit-details.component";
import {BrowseResultsComponent} from "./browse-results/browse-results.component";
import {GuideDetailsComponent} from "./guide-details/guide-details.component";
import {GuideCategoryComponent} from "./guide-category/guide-category.component";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchResultsComponent}, ///:category/:searchText/:people/:orgUnits/:researchActivities
  {path: 'feedback', component: FeedbackComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},

  {path: 'browse', component: BrowseComponent},
  {path: 'browse/:contentTypeId', component: BrowseResultsComponent},

  {path: 'orgUnit/:id', component: OrgUnitDetailsComponent},
  {path: 'person/:id', component: PersonDetailsComponent},
  {path: 'content/:id', component: ContentDetailsComponent},
  {path: 'guide/:id', component: GuideDetailsComponent},

  {path: 'orgUnit', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'person', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'content', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'guide', redirectTo: '/browse', pathMatch: 'full'},

  {path: 'browse/person/:id', component: PersonDetailsComponent},
  {path: 'browse/guide/:id', component: GuideDetailsComponent},
  {path: 'browse/guide/:id/:guideCategoryId', component: GuideCategoryComponent},
  {path: 'browse/support/:id', component: ContentDetailsComponent},
  {path: 'browse/instrumentsEquipment/:id', component: ContentDetailsComponent},
  {path: 'browse/training/:id', component: ContentDetailsComponent},
  {path: 'browse/software/:id', component: ContentDetailsComponent},
  {path: 'browse/facilitiesSpaces/:id', component: ContentDetailsComponent},
  {path: 'browse/knowledgeArticle/:id', component: ContentDetailsComponent},

  {path: 'search/person/:id', component: PersonDetailsComponent},
  {path: 'search/guide/:id', component: GuideDetailsComponent},
  {path: 'search/guide/:id/:guideCategoryId', component: GuideCategoryComponent},
  {path: 'search/content/:id', component: ContentDetailsComponent},

  {path: 'search/person', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/guide', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/content', redirectTo: '/search', pathMatch: 'full'},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
