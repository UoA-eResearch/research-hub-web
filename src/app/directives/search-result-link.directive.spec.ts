import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { AnalyticsService } from 'app/services/analytics.service';
import { SharedModule } from 'app/components/shared/app.shared.module';
import { CommonModule } from '@angular/common';
import { SearchResultLinkDirective } from './search-result-link.directive';
import { ActivatedRoute } from '@angular/router';
import { routing } from 'app/components/search-results/search-results.routing';
import { SearchResultsModule } from 'app/components/search-results/search-results.module';
import { SearchResultsComponentService } from 'app/components/search-results/search-results-component.service';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <a appSearchResultLink [item]="">Test</a>
  `
})
class TestSearchResultLinkComponent {
}


describe('Directive: SearchResultLink', () => {

    let fixture: ComponentFixture<TestSearchResultLinkComponent>;
    let des: DebugElement;

    const fakeActivatedRoute = {
        snapshot: { data: { } }
    } as ActivatedRoute;

    beforeEach(() => {

        (<any>window).ga = function() {}

        fixture = TestBed.configureTestingModule({
            declarations: [
                TestSearchResultLinkComponent,
            ],
            imports: [
                CommonModule,
                SharedModule,
                SearchResultsModule,
                routing
            ],
            providers: [
                SearchResultsComponentService,
                AnalyticsService,
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ]
        }).createComponent(TestSearchResultLinkComponent);

        fixture.detectChanges(); // Create initial binding

        // all elements with an attached SearchResultLink directive
        des = fixture.debugElement.query(By.directive(SearchResultLinkDirective));
    });

    it('should be created', () => {
        expect(des).toBeTruthy();
    });


});
