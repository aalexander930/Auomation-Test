const {Builder, By, Key, until} = require('selenium-webdriver');
const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
const LoginPage = require('../src/pages/login-page');
const ProductPage = require('../src/pages/product-page');

describe('Login Tests', function() {
  let driver, loginPage;
  this.timeout(20000);

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(webdriver, driver);
    productPage = new ProductPage(webdriver, driver);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should log in with standard user', async () => {
    await loginPage.goToLoginPage(); // navigates to log in url
    await loginPage.signInStandardUser(); // inputs standard user credentials, clicks login button, and logs in
    await productPage.verifyLoggedIn(); // asserts that test is on products page url
    // await loginPage.wait(2000);

  });
});
