import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routing';
import {CanActivateViaAuthGuard} from './routing.can-activate-via-auth-guard';


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanActivateViaAuthGuard
  ]
})
export class RoutingModule {
}
