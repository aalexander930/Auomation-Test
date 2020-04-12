const BasePage = require('./base-page');
const { By, until, WebElement } = require('selenium-webdriver');
const { LOGIN_PAGE, PRODUCT_PAGE } = require('../common/urls');
const {USERNAME_FIELD_ID, PASSWORD_FIELD_ID, LOGIN_BUTTON_CSS, STANDARD_USER, LOCKED_OUT_USER, PASSWORD} = require('../common/locators');

class LoginPage extends BasePage {
  constructor(
    webdriver,
    driver,
    waitTimeout = 10000,
  ) {
    super(webdriver, driver, waitTimeout);
    this.webdriver = webdriver;
    this.driver = driver;
    this.waitTimeout = waitTimeout;
  }

  async goToLoginPage() {
    await this.goToUrl(LOGIN_PAGE);
    return this;
  }


  async enterUserName(username) {
    await this.inputWhenClickableById(USERNAME_FIELD_ID, username, this.waitTimeout);
  }

  async enterPassword(password) {
    await this.inputWhenClickableById(PASSWORD_FIELD_ID, password, this.waitTimeout);
  }

  async clickLoginButton() {
    await this.clickWhenClickableByCss('.btn_action', this.waitTimeout);
  }

  async signInStandardUser() {
    await this.enterUserName(STANDARD_USER);
    await this.enterPassword(PASSWORD);
    await this.clickLoginButton();
  }

  async verifyLoggedOut() {
    await this.verifyUrl(LOGIN_PAGE);
    return this;
  }

  async fullLogIn() {
    await this.goToLoginPage();
    await this.signInStandardUser();
    // await this.verifyLoggedIn(); I don't think I need to assert every time.
  }


}

module.exports = LoginPage;
