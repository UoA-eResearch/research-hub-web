import {Routes, RouterModule} from '@angular/router';
import {EducationComponent} from "./education/education.component";
import {GuidesComponent} from "./guides/guides.component";
import {PoliciesComponent} from "./policies/policies.component";
import {ServicesComponent} from "./services/services.component";
import {DetailsComponent} from "./details/details.component";
import {FiltersComponent} from "./filters/filters.component";
import {HomeComponent} from "./home/home.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes:Routes = [
    {path: 'playlist', outlet: 'filters', component: FiltersComponent},
    {path: 'home', component: HomeComponent},
    {path: 'education', component: EducationComponent},
    {path: 'education/details/:id', component: DetailsComponent},
    {path: 'guides', component: GuidesComponent},
    {path: 'guides/details/:id', component: DetailsComponent},
    {path: 'policies', component: PoliciesComponent},
    {path: 'policies/details/:id', component: DetailsComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'services/details/:id', component: DetailsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
