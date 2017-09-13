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

  {path: 'orgUnits/:id', component: OrgUnitDetailsComponent},
  {path: 'people/:id', component: PersonDetailsComponent},
  {path: 'resources/:id', component: ContentDetailsComponent},
  {path: 'guides/:id', component: GuideDetailsComponent},

  {path: 'orgUnits', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'people', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'resources', redirectTo: '/browse', pathMatch: 'full'},
  {path: 'guides', redirectTo: '/browse', pathMatch: 'full'},

  {path: 'browse/people/:id', component: PersonDetailsComponent},
  {path: 'browse/guides/:id', component: GuideDetailsComponent},
  {path: 'browse/guides/:id/:guideCategoryId', component: GuideCategoryComponent},
  {path: 'browse/support/:id', component: ContentDetailsComponent},
  {path: 'browse/instrumentsEquipment/:id', component: ContentDetailsComponent},
  {path: 'browse/training/:id', component: ContentDetailsComponent},
  {path: 'browse/software/:id', component: ContentDetailsComponent},
  {path: 'browse/facilitiesSpaces/:id', component: ContentDetailsComponent},
  {path: 'browse/knowledgeArticle/:id', component: ContentDetailsComponent},

  {path: 'search/people/:id', component: PersonDetailsComponent},
  {path: 'search/guides/:id', component: GuideDetailsComponent},
  {path: 'search/guides/:id/:guideCategoryId', component: GuideCategoryComponent},
  {path: 'search/support/:id', component: ContentDetailsComponent},
  {path: 'search/instrumentsEquipment/:id', component: ContentDetailsComponent},
  {path: 'search/training/:id', component: ContentDetailsComponent},
  {path: 'search/software/:id', component: ContentDetailsComponent},
  {path: 'search/facilitiesSpaces/:id', component: ContentDetailsComponent},
  {path: 'search/knowledgeArticle/:id', component: ContentDetailsComponent},

  {path: 'search/people', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/guides', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/support', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/instrumentsEquipment', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/training', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/software', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/facilitiesSpaces', redirectTo: '/search', pathMatch: 'full'},
  {path: 'search/knowledgeArticle', redirectTo: '/search', pathMatch: 'full'},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
