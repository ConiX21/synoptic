import { NerysSynopticPage } from './app.po';

describe('nerys-synoptic App', function() {
  let page: NerysSynopticPage;

  beforeEach(() => {
    page = new NerysSynopticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
