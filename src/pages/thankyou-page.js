const BasePage = require('./base-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { REMOVE_TOP_ITEM_CSS, CART_ITEM_CSS } = require('../common/locators');


class ThankyouPage extends BasePage {
  constructor(
    webdriver,
    driver,
    waitTimeout = 20000,
  ) {
    super(webdriver, driver, waitTimeout);
    this.webdriver = webdriver;
    this.driver = driver;
    this.waitTimeout = waitTimeout;
  }

  async clickRemoveTopItem() {
    await this.clickWhenClickableByCss(REMOVE_TOP_ITEM_CSS);
  }

  async countItems() {
    const findThem = await cartPage.waitForElementsByCss(CART_ITEM_CSS);
    const selectionCount = findThem.length;
    console.log('There are ' + selectionCount + ' item(s) in the cart');
  }

}
module.exports = ThankyouPage;
