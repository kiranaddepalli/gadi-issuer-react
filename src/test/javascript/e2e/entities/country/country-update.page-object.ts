import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#country-name'));
  identifierInput: ElementFinder = element(by.css('input#country-identifier'));
  orderValueInput: ElementFinder = element(by.css('input#country-orderValue'));
  defaultValueInput: ElementFinder = element(by.css('input#country-defaultValue'));
  activeInput: ElementFinder = element(by.css('input#country-active'));
  createdByInput: ElementFinder = element(by.css('input#country-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#country-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#country-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#country-updatedDate'));
  stateSelect: ElementFinder = element(by.css('select#country-state'));

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

  async stateSelectLastOption() {
    await this.stateSelect.all(by.tagName('option')).last().click();
  }

  async stateSelectOption(option) {
    await this.stateSelect.sendKeys(option);
  }

  getStateSelect() {
    return this.stateSelect;
  }

  async getStateSelectedOption() {
    return this.stateSelect.element(by.css('option:checked')).getText();
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
