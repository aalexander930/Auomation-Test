const {Builder, By, Key, until} = require('selenium-webdriver');
const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
const LoginPage = require('../src/pages/login-page');
const ProductPage = require('../src/pages/product-page');

describe('Log out Test', function() {
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

  it('should log in with standard user then log out', async () => {
    await loginPage.fullLogIn(); // does full log in of standard_user
    await productPage.openMenu(); // clicks on the burger button to open the menu
    await productPage.clickLogOutButton(); // selects log out from the menu
    await loginPage.verifyLoggedOut(); // verifies that we are back at the log in page (url), no longer in product page
  });
});
