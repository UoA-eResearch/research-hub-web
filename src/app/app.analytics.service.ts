import { Injectable } from '@angular/core';
declare const ga: any;
declare const trackingCode: 'UA-77710107-3';

@Injectable()
export class AnalyticsService {

  trackPageView(pageName) {
    ga('set', 'page', pageName);
    ga('send', 'pageview');
  }

  trackSearch(category, text) {
    ga('send', 'pageview', '/search?q=' + text + '&sc=' + category);
  }

  trackFeedback() {
    ga('send', {
      hitType: 'event',
      eventCategory: 'Feedback',
      eventAction: 'Feedback',
      eventLabel: 'Feedback'
    });
  }
}
