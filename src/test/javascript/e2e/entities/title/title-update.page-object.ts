import { element, by, ElementFinder } from 'protractor';

export default class TitleUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.title.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#title-name'));
  identifierInput: ElementFinder = element(by.css('input#title-identifier'));
  orderValueInput: ElementFinder = element(by.css('input#title-orderValue'));
  defaultValueInput: ElementFinder = element(by.css('input#title-defaultValue'));
  activeInput: ElementFinder = element(by.css('input#title-active'));
  createdByInput: ElementFinder = element(by.css('input#title-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#title-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#title-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#title-updatedDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setIdentifierInput(identifier) {
    await this.identifierInput.sendKeys(identifier);
  }

  async getIdentifierInput() {
    return this.identifierInput.getAttribute('value');
  }

  async setOrderValueInput(orderValue) {
    await this.orderValueInput.sendKeys(orderValue);
  }

  async getOrderValueInput() {
    return this.orderValueInput.getAttribute('value');
  }

  getDefaultValueInput() {
    return this.defaultValueInput;
  }
  getActiveInput() {
    return this.activeInput;
  }
  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return this.createdByInput.getAttribute('value');
  }

  async setCreatedDateInput(createdDate) {
    await this.createdDateInput.sendKeys(createdDate);
  }

  async getCreatedDateInput() {
    return this.createdDateInput.getAttribute('value');
  }

  async setUpdatedByInput(updatedBy) {
    await this.updatedByInput.sendKeys(updatedBy);
  }

  async getUpdatedByInput() {
    return this.updatedByInput.getAttribute('value');
  }

  async setUpdatedDateInput(updatedDate) {
    await this.updatedDateInput.sendKeys(updatedDate);
  }

  async getUpdatedDateInput() {
    return this.updatedDateInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
