var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"appRoutes","filename":"src/app/routing/routing.ts","module":"RoutingModule","children":[{"path":"home","loadChildren":"app/components/home/home.module#HomeModule","children":[{"kind":"module","children":[],"module":"HomeModule"}]},{"path":"search","loadChildren":"app/components/search-results/search-results.module#SearchResultsModule","children":[{"kind":"module","children":[],"module":"SearchResultsModule"}]},{"path":"feedback","loadChildren":"app/components/feedback/feedback.module#FeedbackModule","children":[{"kind":"module","children":[],"module":"FeedbackModule"}]},{"path":"userStudy","loadChildren":"app/components/user-study/user-study.module#UserStudyModule","children":[{"kind":"module","children":[],"module":"UserStudyModule"}]},{"path":"about","loadChildren":"app/components/about/about.module#AboutModule","children":[{"kind":"module","children":[],"module":"AboutModule"}]},{"path":"contact","loadChildren":"app/components/contact/contact.module#ContactModule","children":[{"kind":"module","children":[],"module":"ContactModule"}]},{"path":"orgUnit/:orgUnitId","loadChildren":"app/components/org-unit-details/org-unit-details.module#OrgUnitDetailsModule","children":[{"kind":"module","children":[],"module":"OrgUnitDetailsModule"}]},{"path":"person/:personId","loadChildren":"app/components/person-details/person-details.module#PersonDetailsModule","children":[{"kind":"module","children":[],"module":"PersonDetailsModule"}]},{"path":"content/:contentId","loadChildren":"app/components/content-details/content-details.module#ContentDetailsModule","children":[{"kind":"module","children":[],"module":"ContentDetailsModule"}]},{"path":"guideCategory/:guideCategoryId","loadChildren":"app/components/guide-category/guide-category.module#GuideCategoryModule","children":[{"kind":"module","children":[],"module":"GuideCategoryModule"}]},{"path":"requestVm","loadChildren":"app/components/request-vm/request-vm.module#RequestVmModule","canActivate":["CanActivateViaAuthGuard"],"children":[{"kind":"module","children":[],"module":"RequestVmModule"}]},{"path":"requestStorage","loadChildren":"app/components/request-storage/request-storage.module#RequestStorageModule","canActivate":["CanActivateViaAuthGuard"],"children":[{"kind":"module","children":[],"module":"RequestStorageModule"}]},{"path":"","redirectTo":"/home","pathMatch":"full"},{"path":"**","redirectTo":"/home","pathMatch":"full"}],"kind":"module"}]}