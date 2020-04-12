const BasePage = require('./base-page');
// const ItemPage = require('./item-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { PRODUCT_PAGE , TOP_LEFT_ITEM_CSS, TOP_RIGHT_ITEM_CSS, MIDDLE_LEFT_ITEM_CSS, MIDDLE_RIGHT_ITEM_CSS, BOTTOM_LEFT_ITEM_CSS, BOTTOM_RIGHT_ITEM_CSS, PRODUCT_CART_BUTTON_CSS, CHECKOUT_BUTTON_CSS } = require('../common/locators');
const { MENU_BUTTON_CSS, LOGOUT_BUTTON_ID } = require('../common/locators');


class ProductPage extends BasePage {
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

  async verifyLoggedIn() {
    await this.verifyUrl(PRODUCT_PAGE);
    return this;
  }

  async openMenu() {
    await this.clickWhenClickableByCss(MENU_BUTTON_CSS, this.waitTimeout);
  }

  async clickLogOutButton() {
    await this.clickWhenClickableById(LOGOUT_BUTTON_ID, this.waitTimeout);
  }

  async logOut() {
    await this.openMenu();
    await this.clickLogOutButton();
  }

  async selectItem(item) {
    item = item.toLowerCase();
    let id;
    if (item === 'backpack') {
      id = 4;
    } else if (item === 'bike light') {
      id = 0;
    } else if (item === 'bolt tshirt') {
      id = 1;
    } else if (item === 'fleece jacket') {
      id = 5;
    } else if (item === 'onesie') {
      id = 2;
    } else if (item === 'red tshirt') {
      id = 3;
    } else {
      console.log('Try inputting a different item name.');
    }
    // await this.clickWhenClickableById("item_" + id + "_title_link");
    await this.clickWhenClickableById(`item_${id}_title_link`);
    
    // return result;
  }

  async addToCartAndBack(item) {
    await this.selectItem(item);
    await itemPage.clickAddToCart();
    await itemPage.clickBackButton();
  }

  async addToCartAndCheckout(item) {
    await this.selectItem(item);
    await itemPage.clickAddToCart();
    await itemPage.clickGoToCart();
  }

  async quickAddThreeItems() {
    await this.clickWhenClickableByCss(TOP_LEFT_ITEM_CSS, this.waitTimeout);
    await this.clickWhenClickableByCss(TOP_RIGHT_ITEM_CSS, this.waitTimeout);
    await this.clickWhenClickableByCss(MIDDLE_RIGHT_ITEM_CSS, this.waitTimeout);
  }

  async goToCart() {
    await this.clickWhenClickableByCss(PRODUCT_CART_BUTTON_CSS, this.waitTimeout);
  }

}

module.exports = ProductPage;
