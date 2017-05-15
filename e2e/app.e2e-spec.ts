import { Angular4TreeComponentPage } from './app.po';

describe('angular4-tree-component App', function() {
  let page: Angular4TreeComponentPage;

  beforeEach(() => {
    page = new Angular4TreeComponentPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
