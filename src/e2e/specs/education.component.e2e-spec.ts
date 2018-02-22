import { browser, by, element } from 'protractor';

describe('Education', () => {

  beforeEach(async () => {
    return await browser.get('/education');
  });

  it('should have correct feature heading', async () => {
    const text = await element(by.css('sd-education h2')).getText();
    expect(text).toEqual('Features');
  });

});
