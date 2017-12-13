import {Routes} from '@angular/router';
import {CanActivateViaAuthGuard} from './routing.can-activate-via-auth-guard';


export const appRoutes: Routes = [
  {path: 'home',  loadChildren: 'app/components/home/home.module#HomeModule'},
  {path: 'search', loadChildren: 'app/components/search-results/search-results.module#SearchResultsModule'},
  ///:category/:searchText/:people/:orgUnits/:researchActivities
  {path: 'feedback', loadChildren: 'app/components/feedback/feedback.module#FeedbackModule'},
  {path: 'about', loadChildren: 'app/components/about/about.module#AboutModule'},
  {path: 'contact', loadChildren: 'app/components/contact/contact.module#ContactModule'},

  {path: 'orgUnit/:orgUnitId', loadChildren: 'app/components/org-unit-details/org-unit-details.module#OrgUnitDetailsModule'},
  {path: 'person/:personId', loadChildren: 'app/components/person-details/person-details.module#PersonDetailsModule'},
  {path: 'content/:contentId',  loadChildren: 'app/components/content-details/content-details.module#ContentDetailsModule'},
  {path: 'guideCategory/:guideCategoryId', loadChildren: 'app/components/guide-category/guide-category.module#GuideCategoryModule'},

  {path: 'requestVm', loadChildren: 'app/components/request-vm/request-vm.module#RequestVmModule', canActivate: [CanActivateViaAuthGuard]},
  {path: 'requestData', loadChildren: 'app/components/request-data/request-data.module#RequestDataModule', canActivate: [CanActivateViaAuthGuard]},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
