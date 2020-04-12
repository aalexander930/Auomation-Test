const {Builder, By, Key, until} = require('selenium-webdriver');
const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
// const BasePage = require('../src/pages/base-page');
const LoginPage = require('../src/pages/login-page');


describe('Example', function() {
  let driver, basePage, loginPage;
  this.timeout(6000);

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(webdriver, driver);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should get title', async () => {
    await loginPage.goToLoginPage();
    const title = await loginPage.getPageTitle();
    await expect(title).to.include('Swag Labs');
  });
});
