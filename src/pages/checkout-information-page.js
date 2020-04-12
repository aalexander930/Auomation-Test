const BasePage = require('./base-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { REMOVE_TOP_ITEM_CSS, CART_ITEM_CSS } = require('../common/locators');


class CheckoutInformationPage extends BasePage {
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

  async fillInFirstName(firstName) {
    await this.inputWhenClickableById('first-name', firstName, this.waitTimeout);
  }

  async fillInLastName(lastName) {
    await this.inputWhenClickableById('last-name', lastName, this.waitTimeout);
  }

  async fillInPostalCode(postalCode) {
    await this.inputWhenClickableById('postal-code', postalCode, this.waitTimeout);
  }

  async submitCompleteForm(firstName, lastName, postalCode) {
    await this.fillInFirstName(firstName);
    await this.fillInLastName(lastName);
    await this.fillInPostalCode(postalCode);
    await this.clickWhenClickableByCss('.btn_primary', this.waitTimeout);
  }

  async submitFormNoPostalCode(firstName, lastName) {
    await this.fillInFirstName(firstName);
    await this.fillInLastName(lastName);
    await this.clickWhenClickableByCss('.btn_primary', this.waitTimeout);
  }


}
module.exports = CheckoutInformationPage;
