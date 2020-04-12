const BasePage = require('./base-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { REMOVE_TOP_ITEM_CSS, CART_ITEM_CSS } = require('../common/locators');


class CheckoutOverviewPage extends BasePage {
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

  async confirmPurchase() {
    await this.clickWhenClickableByCss('.btn_action', this.waitTimeout);
  }

}
module.exports = CheckoutOverviewPage;
