import {Routes, RouterModule} from '@angular/router';
import {EducationComponent} from "./education/education.component";
import {GuidesComponent} from "./guides/guides.component";
import {PoliciesComponent} from "./policies/policies.component";
import {ServicesComponent} from "./services/services.component";
import {ModuleWithProviders} from "@angular/core";

const appRoutes:Routes = [
    {path: 'education', component: EducationComponent, data: {title: 'Education'}},
    {path: 'guides', component: GuidesComponent, data: {title: 'Guides'}},
    {path: 'policies', component: PoliciesComponent, data: {title: 'Policies'}},
    {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
    {path: '', redirectTo: '/services', pathMatch: 'full' },
    {path: '**', redirectTo: '/services', pathMatch: 'full'}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
