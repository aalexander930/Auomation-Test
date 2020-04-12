const BasePage = require('./base-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { ADD_TO_CART_BUTTON_CSS, BACK_BUTTON_CSS, GO_TO_CART_BUTTON_CSS } = require('../common/locators')

class ItemPage extends BasePage {
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

  async clickAddToCart() {
    await this.clickWhenClickableByCss(ADD_TO_CART_BUTTON_CSS, this.waitTimeout);
  }

  async clickBackButton() {
    await this.clickWhenClickableByCss(BACK_BUTTON_CSS, this.waitTimeout);
  }

  async clickGoToCart() {
    await this.clickWhenClickableByCss(GO_TO_CART_BUTTON_CSS, this.waitTimeout);
  }



}
module.exports = ItemPage;
