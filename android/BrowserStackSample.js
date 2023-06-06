var wd = require('wd');
var assert = require('assert');
var asserters = wd.asserters;

desiredCaps = {
  'browserstack.user' : 'saiprajwalreddyn_E8gLIQ',
  'browserstack.key' : 'yr9QMYXyW13LoPTiQK5s',
  'build' : 'snookala Pixel3',
  'name': 'single_test',
  'device' : 'Google Pixel 3',
  'app' : 'bs://306eb7a609103f035c6ba181cad9b7ddb3428579',
  'browserstack.debug' : true,
  'browserstack.networkLogs': true
};
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByAccessibilityId('Search Wikipedia', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchElement) {
    return searchElement.click();
  })
  .then(function () {
    return driver.waitForElementById('org.wikipedia.alpha:id/search_src_text', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (searchInput) {
    return searchInput.sendKeys("BrowserStack");
  })
  .then(function () {
    return driver.elementsByClassName('android.widget.TextView');   
  })
  .then(function (search_results) {
    assert(search_results.length > 0);
  })
  .fin(function() { return driver.quit(); })
  .done();
