const {Builder, By, Key, until} = require('selenium-webdriver');
const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
const { TOP_LEFT_ITEM_CSS, TOP_RIGHT_ITEM_CSS, MIDDLE_LEFT_ITEM_CSS, MIDDLE_RIGHT_ITEM_CSS, BOTTOM_LEFT_ITEM_CSS, BOTTOM_RIGHT_ITEM_CSS, PRODUCT_CART_BUTTON_CSS, CHECKOUT_BUTTON_CSS } = require('../src/common/locators');
const { THANK_YOU_PAGE, CHECKOUT_INFO_PAGE }  = require('../src/common/urls');
const LoginPage = require('../src/pages/login-page');
const ProductPage = require('../src/pages/product-page');
const CartPage = require('../src/pages/cart-page');
const CheckoutInformationPage = require('../src/pages/checkout-information-page');
const CheckoutOverviewPage = require('../src/pages/checkout-overview-page');
const ThankyouPage = require('../src/pages/thankyou-page');


describe('Full purchase flow', function() {
  let driver, loginPage;
  this.timeout(50000);

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(webdriver, driver);
    productPage = new ProductPage(webdriver, driver);
    cartPage = new CartPage(webdriver, driver);
    checkoutInformationPage = new CheckoutInformationPage(webdriver, driver);
    checkoutOverviewPage = new CheckoutOverviewPage(webdriver, driver);
    thankyouPage = new ThankyouPage(webdriver, driver);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('should add items to cart then complete a full purchase flow', async () => {
    await loginPage.fullLogIn();
    await productPage.quickAddThreeItems();
    await productPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutInformationPage.submitCompleteForm('Anthony','Alexander','12345', this.waitTimeout);
    await checkoutOverviewPage.confirmPurchase();

    await thankyouPage.verifyUrl(THANK_YOU_PAGE, this.waitTimeout);
  });

  it('should add items to cart, checkout, but leave one field blank and return error', async () => {
    await loginPage.fullLogIn();
    await productPage.quickAddThreeItems();
    await productPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutInformationPage.submitFormNoPostalCode('Anthony','Alexander', this.waitTimeout);
    await checkoutInformationPage.verifyUrl(CHECKOUT_INFO_PAGE, this.waitTimeout); //
  });
});
