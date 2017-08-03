import { Injectable } from '@angular/core';
declare const ga: any;
declare const trackingCode: 'UA-77710107-3';

@Injectable()
export class AnalyticsService {

  trackPageView(url, title) {
    ga('set', 'page', url);
    ga('set', 'title', title);
    ga('send', 'pageview');
  }

  trackSearch(category, text) {
    const searchUrl = '/search?q=' + text + '&sc=' + category;
    ga('set', 'page', searchUrl);
    ga('send', 'pageview', );
  }

  trackOutboundLink(url) {
    ga('set', 'eventCategory', 'Outbound Link');
    ga('set', 'eventAction', 'click');
    ga('set', 'eventLabel', url);
    ga('send', 'event');
  }
}
