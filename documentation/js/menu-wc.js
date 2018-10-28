'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">research-hub-web documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AboutModule.html" data-type="entity-link">AboutModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AboutModule-a394925d172b53a3673e1af86abe880d"' : 'data-target="#xs-components-links-module-AboutModule-a394925d172b53a3673e1af86abe880d"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AboutModule-a394925d172b53a3673e1af86abe880d"' : 'id="xs-components-links-module-AboutModule-a394925d172b53a3673e1af86abe880d"' }>
                                        <li class="link">
                                            <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-b158825411cd707260c67f610c9128ac"' : 'data-target="#xs-components-links-module-AppModule-b158825411cd707260c67f610c9128ac"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-b158825411cd707260c67f610c9128ac"' : 'id="xs-components-links-module-AppModule-b158825411cd707260c67f610c9128ac"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SearchBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchBarComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-AppModule-b158825411cd707260c67f610c9128ac"' : 'data-target="#xs-injectables-links-module-AppModule-b158825411cd707260c67f610c9128ac"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-AppModule-b158825411cd707260c67f610c9128ac"' : 'id="xs-injectables-links-module-AppModule-b158825411cd707260c67f610c9128ac"' }>
                                        <li class="link">
                                            <a href="injectables/AppComponentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AppComponentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HeaderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>HeaderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchBarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SearchBarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SearchFiltersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SearchFiltersService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContactModule.html" data-type="entity-link">ContactModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContactModule-aa7e59f33c6e0c43a5da6d6c8c9ba554"' : 'data-target="#xs-components-links-module-ContactModule-aa7e59f33c6e0c43a5da6d6c8c9ba554"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContactModule-aa7e59f33c6e0c43a5da6d6c8c9ba554"' : 'id="xs-components-links-module-ContactModule-aa7e59f33c6e0c43a5da6d6c8c9ba554"' }>
                                        <li class="link">
                                            <a href="components/ContactComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImageViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ImageViewDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ImageViewDialogComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ContentDetailsModule.html" data-type="entity-link">ContentDetailsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ContentDetailsModule-7082b6878714f227620f197e6efe5695"' : 'data-target="#xs-components-links-module-ContentDetailsModule-7082b6878714f227620f197e6efe5695"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ContentDetailsModule-7082b6878714f227620f197e6efe5695"' : 'id="xs-components-links-module-ContentDetailsModule-7082b6878714f227620f197e6efe5695"' }>
                                        <li class="link">
                                            <a href="components/ContentDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentDetailsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/FeedbackModule.html" data-type="entity-link">FeedbackModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-FeedbackModule-748cd2af920f003510df340cd5736684"' : 'data-target="#xs-components-links-module-FeedbackModule-748cd2af920f003510df340cd5736684"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-FeedbackModule-748cd2af920f003510df340cd5736684"' : 'id="xs-components-links-module-FeedbackModule-748cd2af920f003510df340cd5736684"' }>
                                        <li class="link">
                                            <a href="components/FeedbackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeedbackComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/GuideCategoryModule.html" data-type="entity-link">GuideCategoryModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-GuideCategoryModule-aaa4a27cc9e924f44a08e24f21e92d56"' : 'data-target="#xs-components-links-module-GuideCategoryModule-aaa4a27cc9e924f44a08e24f21e92d56"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-GuideCategoryModule-aaa4a27cc9e924f44a08e24f21e92d56"' : 'id="xs-components-links-module-GuideCategoryModule-aaa4a27cc9e924f44a08e24f21e92d56"' }>
                                        <li class="link">
                                            <a href="components/GuideCategoryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">GuideCategoryComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomeModule-23519cc990901afd4ceb133bd77ec1f7"' : 'data-target="#xs-components-links-module-HomeModule-23519cc990901afd4ceb133bd77ec1f7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomeModule-23519cc990901afd4ceb133bd77ec1f7"' : 'id="xs-components-links-module-HomeModule-23519cc990901afd4ceb133bd77ec1f7"' }>
                                        <li class="link">
                                            <a href="components/BrowseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">BrowseComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeaturedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeaturedComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResearchActivityComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResearchActivityComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/OrgUnitDetailsModule.html" data-type="entity-link">OrgUnitDetailsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-OrgUnitDetailsModule-9f305f522b246fcff6b4b57cee14e9df"' : 'data-target="#xs-components-links-module-OrgUnitDetailsModule-9f305f522b246fcff6b4b57cee14e9df"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-OrgUnitDetailsModule-9f305f522b246fcff6b4b57cee14e9df"' : 'id="xs-components-links-module-OrgUnitDetailsModule-9f305f522b246fcff6b4b57cee14e9df"' }>
                                        <li class="link">
                                            <a href="components/OrgUnitDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrgUnitDetailsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/PersonDetailsModule.html" data-type="entity-link">PersonDetailsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-PersonDetailsModule-d20141f4ea96b8f126478ad172f8d611"' : 'data-target="#xs-components-links-module-PersonDetailsModule-d20141f4ea96b8f126478ad172f8d611"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-PersonDetailsModule-d20141f4ea96b8f126478ad172f8d611"' : 'id="xs-components-links-module-PersonDetailsModule-d20141f4ea96b8f126478ad172f8d611"' }>
                                        <li class="link">
                                            <a href="components/PersonDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersonDetailsComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/RequestStorageModule.html" data-type="entity-link">RequestStorageModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-RequestStorageModule-3faa39b98f5bedf47aba535e6f86a216"' : 'data-target="#xs-components-links-module-RequestStorageModule-3faa39b98f5bedf47aba535e6f86a216"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-RequestStorageModule-3faa39b98f5bedf47aba535e6f86a216"' : 'id="xs-components-links-module-RequestStorageModule-3faa39b98f5bedf47aba535e6f86a216"' }>
                                        <li class="link">
                                            <a href="components/RequestStorageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestStorageComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/RequestVmModule.html" data-type="entity-link">RequestVmModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-RequestVmModule-154002c8a6f1737eb3bd0da814b38aa7"' : 'data-target="#xs-components-links-module-RequestVmModule-154002c8a6f1737eb3bd0da814b38aa7"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-RequestVmModule-154002c8a6f1737eb3bd0da814b38aa7"' : 'id="xs-components-links-module-RequestVmModule-154002c8a6f1737eb3bd0da814b38aa7"' }>
                                        <li class="link">
                                            <a href="components/RequestVmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">RequestVmComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/RoutingModule.html" data-type="entity-link">RoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/SearchResultsModule.html" data-type="entity-link">SearchResultsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' : 'data-target="#xs-components-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' : 'id="xs-components-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' }>
                                        <li class="link">
                                            <a href="components/CategoryListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryListComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FilterDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FilterSidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterSidenavComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MatTagsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MatTagsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/OrderbySwitcherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderbySwitcherComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ResearchActivityInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResearchActivityInputComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SearchFiltersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchFiltersComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SearchResultsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchResultsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ViewSwitcherComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ViewSwitcherComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' : 'data-target="#xs-injectables-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' : 'id="xs-injectables-links-module-SearchResultsModule-d84845192ccd7d5d457dd1e3a7f643bb"' }>
                                        <li class="link">
                                            <a href="injectables/SearchResultsComponentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>SearchResultsComponentService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ServicesModule.html" data-type="entity-link">ServicesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#injectables-links-module-ServicesModule-f778336d8bd961272ec6be1affd00ca7"' : 'data-target="#xs-injectables-links-module-ServicesModule-f778336d8bd961272ec6be1affd00ca7"' }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-f778336d8bd961272ec6be1affd00ca7"' : 'id="xs-injectables-links-module-ServicesModule-f778336d8bd961272ec6be1affd00ca7"' }>
                                        <li class="link">
                                            <a href="injectables/AnalyticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AnalyticsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CerApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>CerApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LayoutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>LayoutService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>OptionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ResearchHubApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules"}>ResearchHubApiService</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' : 'data-target="#xs-components-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' : 'id="xs-components-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' }>
                                        <li class="link">
                                            <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ErrorDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorDialogComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/MarkdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">MarkdownComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' : 'data-target="#xs-pipes-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' : 'id="xs-pipes-links-module-SharedModule-c1dbe74d7b7ddf30274f2d67adb715ed"' }>
                                        <li class="link">
                                            <a href="pipes/ListItemToRouterLinkPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListItemToRouterLinkPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/UserStudyModule.html" data-type="entity-link">UserStudyModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-UserStudyModule-25f0976fcbffe6850e0ecf1add0ef7d5"' : 'data-target="#xs-components-links-module-UserStudyModule-25f0976fcbffe6850e0ecf1add0ef7d5"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-UserStudyModule-25f0976fcbffe6850e0ecf1add0ef7d5"' : 'id="xs-components-links-module-UserStudyModule-25f0976fcbffe6850e0ecf1add0ef7d5"' }>
                                        <li class="link">
                                            <a href="components/UserStudyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserStudyComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ContentItemsParams.html" data-type="entity-link">ContentItemsParams</a>
                    </li>
                    <li class="link">
                        <a href="classes/Params.html" data-type="entity-link">Params</a>
                    </li>
                    <li class="link">
                        <a href="classes/PeopleParams.html" data-type="entity-link">PeopleParams</a>
                    </li>
                    <li class="link">
                        <a href="classes/SearchBarParams.html" data-type="entity-link">SearchBarParams</a>
                    </li>
                    <li class="link">
                        <a href="classes/SearchResultsParams.html" data-type="entity-link">SearchResultsParams</a>
                    </li>
                    <li class="link">
                        <a href="classes/User.html" data-type="entity-link">User</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/CanActivateViaAuthGuard.html" data-type="entity-link">CanActivateViaAuthGuard</a>
                </li>
                <li class="link">
                    <a href="guards/ConfirmDeactivateGuard.html" data-type="entity-link">ConfirmDeactivateGuard</a>
                </li>
            </ul>
            </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                ${ isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"' }>
                <span class="icon ion-md-information-circle-outline"></span>
                <span>Interfaces</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                    <li class="link">
                        <a href="interfaces/CanComponentDeactivate.html" data-type="entity-link">CanComponentDeactivate</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Content.html" data-type="entity-link">Content</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ContentType.html" data-type="entity-link">ContentType</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/GuideCategory.html" data-type="entity-link">GuideCategory</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ItemRef.html" data-type="entity-link">ItemRef</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/ListItem.html" data-type="entity-link">ListItem</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/OrgUnit.html" data-type="entity-link">OrgUnit</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Page.html" data-type="entity-link">Page</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Person.html" data-type="entity-link">Person</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Person-1.html" data-type="entity-link">Person</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Policy.html" data-type="entity-link">Policy</a>
                    </li>
                    <li class="link">
                        <a href="interfaces/Tag.html" data-type="entity-link">Tag</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                    </li>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
