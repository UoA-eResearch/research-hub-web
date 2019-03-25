import { ResearchHubPage } from './app.po';
import { browser, by, element } from 'protractor';

let page: ResearchHubPage;

describe('ResearchHub\'s Basic Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  it('can display welcome message', () => {
    page.navigateTo().then(() => {
      expect(page.getWelcomeMessage()).toEqual('Welcome to the ResearchHub');
    });
  });

  it('can browse by category', () => {
    page.navigateTo().then(() => {
      browser.driver.findElement(by.className('tile-text')).click().then(() => {
        browser.waitForAngular().then(() => {
          expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
        });
      });
    });
  });
});

describe('ResearchHub\'s Search Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  it('can display search results page', () => {
    page.navigateTo('https://research-hub.auckland.ac.nz/#/search').then(() => {
      expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
    });
  });

});