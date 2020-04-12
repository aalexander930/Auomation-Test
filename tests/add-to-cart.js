const {Builder, By, Key, until} = require('selenium-webdriver');
const { expect } = require('chai');
const { CART_ITEM_CSS } = require('../src/common/locators');
const webdriver = require('selenium-webdriver');
const LoginPage = require('../src/pages/login-page');
const ProductPage = require('../src/pages/product-page');
const ItemPage = require('../src/pages/item-page');
const CartPage = require('../src/pages/cart-page');

describe('Adding to cart', function() {
  let driver, basePage, loginPage;
  this.timeout(30000);

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(webdriver, driver);
    productPage = new ProductPage(webdriver, driver);
    itemPage = new ItemPage(webdriver, driver);
    cartPage = new CartPage(webdriver, driver);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should add 3 items to cart via item pages and verify 3 total items', async () => {
    await loginPage.fullLogIn(); // full login for standard user
    await productPage.addToCartAndBack('backpack'); // click backpack item, go to that page, add to cart, go back to product list
    await productPage.addToCartAndBack('onesie'); // click onesie item, go to that page, add to card, back to product list
    await productPage.addToCartAndCheckout('bike light'); // click bike light item, go to that page, add to cart, go to check out page

    const findItems = await cartPage.waitForElementsByCss(CART_ITEM_CSS); // add locator variable for this
    const selectionCount = findItems.length;
    await expect(selectionCount).to.equal(3); // checks that there are 3 cart class items
  });

  it('should add 3 different items to cart via item pages, remove one item, and verify 2 total items', async () => {
    await loginPage.fullLogIn(); // full login for standard user
    await productPage.addToCartAndBack('red tshirt'); // click backpack item, go to that page, add to cart, go back to product list
    await productPage.addToCartAndBack('fleece jacket'); // click onesie item, go to that page, add to card, back to product list
    await productPage.addToCartAndCheckout('bolt tshirt'); // click bike light item, go to that page, add to cart, go to check out page
    await cartPage.clickRemoveTopItem(); // Removes the top item from cart

    const findItems = await cartPage.waitForElementsByCss(CART_ITEM_CSS); // could turn this assertion into method if desired
    const selectionCount = findItems.length;
    await expect(selectionCount).to.equal(2); // checks that there are 3 cart class items
  });

  // it('should add 4 items to cart via product page, remove item, and verify 3 total items')

});
