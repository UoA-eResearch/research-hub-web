import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {LifecycleComponent} from "./lifecycle/lifecycle.component";
import {ShowcaseComponent} from "./showcase/showcase.component";
import {ProductListComponent} from "./productList/productList.component";
import {ProductDetailsComponent} from "./productDetails/productDetails.component";
import {ComingSoonComponent} from "./comingSoon/comingSoon.component";

const appRoutes:Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'guides', component: ComingSoonComponent},
    {path: 'policies', component: ComingSoonComponent},
    {path: 'showcase', component: ComingSoonComponent},
    {path: 'lifecycle', component: LifecycleComponent},
    {path: 'lifecycle/:lifeCycleId', component: LifecycleComponent},
    {path: 'showcase', component: ShowcaseComponent},
    {path: 'productList/:type', component: ProductListComponent},
    {path: 'productList/:type/:serviceTypeId', component: ProductListComponent},
    {path: 'productList/:type/productDetails/:id', component: ProductDetailsComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const appRoutingProviders:any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
