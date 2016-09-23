import { ResearchHubPage } from './app.po';

describe('research-hub App', function() {
  let page: ResearchHubPage;

  beforeEach(() => {
    page = new ResearchHubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
