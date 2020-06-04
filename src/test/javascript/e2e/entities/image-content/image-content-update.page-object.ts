import { element, by, ElementFinder } from 'protractor';

export default class ImageContentUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.imageContent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#image-content-name'));
  externalInput: ElementFinder = element(by.css('input#image-content-external'));
  imageUrlInput: ElementFinder = element(by.css('input#image-content-imageUrl'));
  sizeInput: ElementFinder = element(by.css('input#image-content-size'));
  keywordsInput: ElementFinder = element(by.css('input#image-content-keywords'));
  contentInput: ElementFinder = element(by.css('input#file_content'));
  activeInput: ElementFinder = element(by.css('input#image-content-active'));
  createdByInput: ElementFinder = element(by.css('input#image-content-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#image-content-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#image-content-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#image-content-updatedDate'));
  imageTypeSelect: ElementFinder = element(by.css('select#image-content-imageType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  getExternalInput() {
    return this.externalInput;
  }
  async setImageUrlInput(imageUrl) {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput() {
    return this.imageUrlInput.getAttribute('value');
  }

  async setSizeInput(size) {
    await this.sizeInput.sendKeys(size);
  }

  async getSizeInput() {
    return this.sizeInput.getAttribute('value');
  }

  async setKeywordsInput(keywords) {
    await this.keywordsInput.sendKeys(keywords);
  }

  async getKeywordsInput() {
    return this.keywordsInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
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

  async imageTypeSelectLastOption() {
    await this.imageTypeSelect.all(by.tagName('option')).last().click();
  }

  async imageTypeSelectOption(option) {
    await this.imageTypeSelect.sendKeys(option);
  }

  getImageTypeSelect() {
    return this.imageTypeSelect;
  }

  async getImageTypeSelectedOption() {
    return this.imageTypeSelect.element(by.css('option:checked')).getText();
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
