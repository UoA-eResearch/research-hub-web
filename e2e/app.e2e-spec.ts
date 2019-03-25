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

  it('can directly navigate to search results page', () => {
    page.navigateTo('https://research-hub.auckland.ac.nz/#/search').then(() => {
      expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
    });
  });

  it('displays search results after typing in homepage search bar', () => {
    page.navigateTo().then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('vm').then(() => {
        browser.waitForAngular().then(() => {
          expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
        });
      });
    });
  });

  /**
   * Visits the home page, types 'biblioinformatics' in the search bar, navigates to the first search result
   * item, and checks that its title = 'BiblioInformatics'
   * TODO: Fix Firefox scroll into view issue
   */
  it('displays correct search results that can be navigated to', () => {
    page.navigateTo().then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('biblioinformatics').then(() => {
        browser.waitForAngular().then(() => {
          browser.driver.findElement(by.css('.results-list .mat-list-item')).click().then(() => {
            browser.waitForAngular().then(() => {
              expect(browser.driver.findElement(by.css('h2')).getText()).toEqual('BiblioInformatics');
            });
          });
        });
      });
    });
  });


});