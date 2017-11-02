import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {ContactComponent} from "./contact/contact.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ContentDetailsComponent} from "./content-details/content-details.component";
import {PersonDetailsComponent} from "./person-details/person-details.component";
import {OrgUnitDetailsComponent} from "./org-unit-details/org-unit-details.component";
import {GuideDetailsComponent} from "./guide-details/guide-details.component";
import {GuideCategoryComponent} from "./guide-category/guide-category.component";
import {RequestVmComponent} from "./request-vm/request-vm.component";
import {CanActivateViaAuthGuard} from "./app.can-activate-via-auth-guard";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchResultsComponent}, ///:category/:searchText/:people/:orgUnits/:researchActivities
  {path: 'feedback', component: FeedbackComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},

  {path: 'orgUnit/:orgUnitId', component: OrgUnitDetailsComponent},
  {path: 'person/:personId', component: PersonDetailsComponent},
  {path: 'content/:contentId', component: ContentDetailsComponent},
  {path: 'guide/:guideId', component: GuideDetailsComponent},
  {path: 'guideCategory/:guideCategoryId', component: GuideCategoryComponent},

  {path: 'requestVm', component: RequestVmComponent, canActivate: [CanActivateViaAuthGuard]},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
