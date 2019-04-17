import { ResearchHubPage } from './app.po';
import { browser, by, element } from 'protractor';

let page: ResearchHubPage;

describe('ResearchHub\'s Basic Functionality', () => {

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  /**
   * Visits the home page and checks it contains the heading 'Welcome to the ResearchHub'.
   */
  it('can display welcome message', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      expect(page.getWelcomeMessage()).toEqual('Welcome to the ResearchHub');
    });
  });

  /**
   * Visits the home page -> Clicks one of the 'Category' tiles -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('can browse by category', () => {
    page.navigateTo(browser.baseUrl).then(() => {
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

  /**
   * Directly navigates to the search results page and checks the presence of the search results page title 'Results'.
   */
  it('can directly navigate to search results page', () => {
    page.navigateTo(browser.baseUrl + '/#/search').then(() => {
      expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
    });
  });

  /**
   * Navigates to the home page -> Types 'vm' in the home page search bar -> Checks that the search results page has
   * been successfully navigated to by checking the presence of the search results page title 'Results'.
   */
  it('displays search results after typing in homepage search bar', () => {
    page.navigateTo(browser.baseUrl).then(() => {
      browser.driver.findElement(by.css('input')).sendKeys('vm').then(() => {
        browser.waitForAngular().then(() => {
          expect(browser.driver.findElement(by.className('search-results-title')).getText()).toEqual('Results');
        });
      });
    });
  });

  /**
   * Visits the home page -> Types 'biblioinformatics' in the home page search bar -> Clicks the first search result
   * item -> Checks that its title = 'BiblioInformatics'.
   */
  it('displays correct search results that can be navigated to', () => {
    page.navigateTo(browser.baseUrl).then(() => {
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