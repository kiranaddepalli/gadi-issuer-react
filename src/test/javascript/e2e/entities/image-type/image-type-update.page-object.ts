import { element, by, ElementFinder } from 'protractor';

export default class ImageTypeUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.imageType.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#image-type-name'));
  mimeTypeInput: ElementFinder = element(by.css('input#image-type-mimeType'));
  orderValueInput: ElementFinder = element(by.css('input#image-type-orderValue'));
  defaultValueInput: ElementFinder = element(by.css('input#image-type-defaultValue'));
  activeInput: ElementFinder = element(by.css('input#image-type-active'));
  createdByInput: ElementFinder = element(by.css('input#image-type-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#image-type-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#image-type-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#image-type-updatedDate'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setMimeTypeInput(mimeType) {
    await this.mimeTypeInput.sendKeys(mimeType);
  }

  async getMimeTypeInput() {
    return this.mimeTypeInput.getAttribute('value');
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
