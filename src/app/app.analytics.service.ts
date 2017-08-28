import {Injectable} from '@angular/core';

declare const ga: any;
declare const trackingCode: 'UA-77710107-3';


@Injectable()
export class AnalyticsService {

  eventCategoryContent = 'Content';
  eventCategoryGuide = 'Guide';
  eventCategoryGuideCategory = 'GuideCategory';
  eventCategoryPerson = 'Person';
  eventCategoryOrgUnit = 'OrgUnit';
  eventCategoryPolicy = 'Policy';

  eventActionView = 'view';
  eventActionClick = 'click';
  eventActionGo = 'go';

  trackContent(name: string, url: string) {
    this.trackEvent(this.eventCategoryContent, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackGuide(name: string, url: string) {
    this.trackEvent(this.eventCategoryGuide, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackGuideCategory(name: string, url: string) {
    this.trackEvent(this.eventCategoryGuideCategory, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackPerson(name: string, url: string) {
    this.trackEvent(this.eventCategoryPerson, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackOrgUnit(name: string, url: string) {
    this.trackEvent(this.eventCategoryOrgUnit, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackPolicy(name: string, url: string) {
    this.trackEvent(this.eventCategoryPolicy, this.eventActionView, name);
    this.trackOutboundLink(url);
  }

  trackSearch(category: string, text: string) {
    const searchUrl = '/search?q=' + text + '&sc=' + category;
    this.trackPageView(searchUrl, 'Search Results');
  }

  trackGo(eventCategory: string, name: string, url: string) {
    this.trackEvent(eventCategory, this.eventActionGo, name);
    this.trackOutboundLink(url);
  }

  trackNoSearchResults(category: string, text: string) {
    const search = category + ':' + text;
    this.trackEvent('No search results', 'search', search);
  }

  // Url is the location from which the feedback / study button was clicked
  trackFeedback(url) {
    this.trackEvent('Feedback', this.eventActionClick, url);
  }

  trackJoinUserStudy(url) {
    this.trackEvent('Join User Study', this.eventActionClick, url);
  }

  trackOutboundLink(url: string) {
    this.trackEvent('Outbound Link', this.eventActionClick, url);
  }

  trackPageView(url: string, title: string) {
    ga('set', 'page', url);
    ga('set', 'title', title);
    ga('send', 'pageview');
  }

  trackEvent(eventCategory, eventAction, eventLabel) {
    ga('set', 'eventCategory', eventCategory);
    ga('set', 'eventAction', eventAction);
    ga('set', 'eventLabel', eventLabel);
    ga('send', 'event');
  }
}
