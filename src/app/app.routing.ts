import {Routes, RouterModule} from '@angular/router';
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
import {ModuleWithProviders} from "@angular/core";
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {ShowcaseComponent} from "./showcase/showcase.component";

const appRoutes:Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'lifecycle', component: LifecycleComponent},
    {path: 'showcase', component: ShowcaseComponent},
    {path: 'education', component: EducationComponent},
    {path: 'education/edudetails/:id', component: EdudetailsComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: 'guides', component: GuidesComponent},
    {path: 'guides/guidedetails/:id', component: GuidedetailsComponent},
    {path: 'policies', component: PoliciesComponent},
    {path: 'policies/policydetails/:id', component: PolicydetailsComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'services/servicesdetails/:id', component: ServicesdetailsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
