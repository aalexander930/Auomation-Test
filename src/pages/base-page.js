const { By, until, WebElement } = require('selenium-webdriver');
const { expect } = require('chai');

class BasePage {
  constructor(
    webdriver,
    driver,
    waitTimeout = 10000,
  ) {
    this.webdriver = webdriver;
    this.driver = driver;
    this.waitTimeout = waitTimeout;
  }

  async goToUrl(url, wait) {
    try {
      await this.driver.get(url);
      await this.wait(wait);
      return this;
    } catch (err) {
      throw new Error(`WebDriver returned error: '${err}', going to url: '${url}'.`).stack;
    }
  }

  async verifyUrl(url, wait) {
    try {
      const current = await this.driver.getCurrentUrl();
      // const result = current == url;
      const result = expect(url).to.include(current);
      // console.log(current);
      // console.log(result);
      return result;
    } catch (err) {
      throw new Error(err).stack;
    }
  }

  async getPageTitle() {
    try {
      const title = await this.driver.getTitle();
      console.log("Title is: " + title);
      return title;
    } catch (err) {
      throw new Error(err).stack;
      }
  }

  async waitForElementsByCss(cssName, waitTimeout = 10000) {
    const selector = this.webdriver.By.css(cssName);
    const result = await this.waitForElements(selector, cssName, waitTimeout);
    return result;
  }

  async waitForElements(selector, elementsName, waitTimeout) {
    let result;
    await this.driver.wait(() =>
      this.driver.findElements(selector)
        .then(
          (elements) => {
            result = elements;
            return true;
          },
          (err) => {
            if (err.name === 'NoSuchElementsError') {
              return false;
            }
            return true;
          },
    ), waitTimeout, `Unable to find elements: ${elementsName}`);
    return result;
  }

  async waitForElement(selector, elementName, waitTimeout) {
    let result;
    await this.driver.wait(() =>
      this.driver.findElement(selector)

      // await driver.wait(until.elementLocated(By.id('foo')), 10000);
        .then(
          (element) => {
            result = element;
            return true;
          },
          (err) => {
            if (err.name === 'NoSuchElementError') {
              return false;
            }
            return true;
          },
        ), waitTimeout, `Unable to find element: ${elementName}`);
    return result;
  }

  async waitForElementByName(elementName, waitTimeout = 10000) {
    const selector = this.webdriver.By.name(elementName);
    const result = await this.waitForElement(selector, elementName, waitTimeout);
    return result;
  }

  async waitForElementById(elementName, waitTimeout = 10000) {
    const selector = this.webdriver.By.id(elementName);
    const result = await this.waitForElement(selector, elementName, waitTimeout);
    return result;
  }

  async waitForElementByCss(elementName, waitTimeout = 10000) {
    const selector = this.webdriver.By.css(elementName);
    const result = await this.waitForElement(selector, elementName, waitTimeout);
    return result;
  }

  async wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async clickWhenClickable(element, waitTimeout = 10000) {
    await this.driver.wait(this.webdriver.until.elementIsEnabled(element), waitTimeout);
    await this.driver.wait(this.webdriver.until.elementIsVisible(element), waitTimeout);
    await element.click();
  }

  async clickWhenClickableByName(elementName, waitTimeout = 10000) {
    const element = await this.waitForElementByName(elementName, waitTimeout);
    await this.clickWhenClickable(element, waitTimeout);
  }

  async clickWhenClickableById(elementName, waitTimeout = 10000) {
    const element = await this.waitForElementById(elementName, waitTimeout);
    await this.clickWhenClickable(element, waitTimeout);
  }

  async clickWhenClickableByCss(elementName, waitTimeout = 10000) {
    const element = await this.waitForElementByCss(elementName, waitTimeout);
    await this.clickWhenClickable(element, waitTimeout);
  }

  async inputWhenClickable(element, input, waitTimeout = 10000) {
    await this.driver.wait(this.webdriver.until.elementIsVisible(element), waitTimeout);
    await this.driver.wait(this.webdriver.until.elementIsEnabled(element), waitTimeout);
    await element.sendKeys(input);
  }

  async inputWhenClickableById(elementName, input, waitTimeout = 10000) {
    const element = await this.waitForElementById(elementName, waitTimeout);
    await this.inputWhenClickable(element, input, waitTimeout);
  }

}

module.exports = BasePage;
