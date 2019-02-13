import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
declare const ga: any;

class UserExperienceEvent {
    eventLabel: string;
    eventActions: string[];

    constructor(eventLabel: string, ...eventActions: string[]) {
        this.eventLabel = eventLabel;
        this.eventActions = eventActions;
    }
}

@Injectable()
export class AnalyticsService {

  eventCategoryContent = 'Content';
  eventCategoryGuide = 'Guide';
  eventCategoryGuideCategory = 'GuideCategory';
  eventCategoryPerson = 'Person';
  eventCategoryOrgUnit = 'OrgUnit';
  eventCategoryIntegratedService = 'IntegratedService';
  eventCategoryPolicy = 'Policy';
  eventCategoryUserExperience = 'User Experience';

  eventActionView = 'view';
  eventActionClick = 'click';
  eventActionGo = 'go';

  // This array holds the list of recognized Google Analytics UX events
  readonly UX_EVENTS: UserExperienceEvent[] = [];

  constructor () {
    this.initialize();

    // Register known Google Analytics UX events
    this.UX_EVENTS.push(new UserExperienceEvent('Have you seen', 'click'))
    this.UX_EVENTS.push(new UserExperienceEvent('Card view', 'click', 'showCardView'));
  }

  // This method needs to be called first to initalise Google Analytics
  private initialize() {
    if (typeof ga === 'undefined') { return; }
    ga('create', environment.analyticsCode, 'auto');
  }

  trackUserExperience(eventLabel: string, eventAction: string) {
    if(this.isKnownEvent(eventLabel, eventAction)) {
      // Send the Google Analytics UX event
      // this.trackEvent(this.eventCategoryUserExperience, eventAction, eventLabel);
    } else {
      console.error('This is not a known Google Analytics event');
    }
  }

  isKnownEvent(eventLabel: string, eventAction: string) {
    return this.UX_EVENTS
        .filter(x => x.eventLabel === eventLabel)
        .filter(x => x.eventActions.indexOf(eventAction) != -1)
        .length != 0;
  }

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

  trackActionExternal(eventCategory: string, name: string, url: string) {
    this.trackEvent(eventCategory, this.eventActionGo, name);
    this.trackOutboundLink(url);
  }

  trackIntegratedService(name: string, url: string) {
    this.trackEvent(this.eventCategoryIntegratedService, this.eventActionView, name);
    this.trackPageView(url, name);
  }

  trackActionIntegrated(name: string) {
    this.trackEvent(this.eventCategoryIntegratedService, this.eventActionGo, name);
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
    if (typeof ga === 'undefined') { return; }
    ga('set', 'page', url);
    ga('set', 'title', title);
    ga('send', 'pageview');
  }

  trackEvent(eventCategory, eventAction, eventLabel) {
    if (typeof ga === 'undefined') { return; }
    ga('set', 'eventCategory', eventCategory);
    ga('set', 'eventAction', eventAction);
    ga('set', 'eventLabel', eventLabel);
    ga('send', 'event');
  }
}
