import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {ResultsComponent} from './results/results.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {ProductDetailsComponent} from './product-details/product-details.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'results/:searchText', component: ResultsComponent},
  {path: 'details/:id/:name', component: ProductDetailsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
