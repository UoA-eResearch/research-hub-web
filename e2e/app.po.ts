import { browser, by, element } from 'protractor';

export class ResearchHubPage {
  navigateTo(url = 'https://research-hub.auckland.ac.nz') {
    return browser.driver.get(url);
  }

  getWelcomeMessage() {
    return browser.driver.findElement(by.css('app-root h1')).getText();
  }
}
