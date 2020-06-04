import { element, by, ElementFinder } from 'protractor';

export default class ExperienceUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.experience.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#experience-name'));
  identifierInput: ElementFinder = element(by.css('input#experience-identifier'));
  issuerIdentifierInput: ElementFinder = element(by.css('input#experience-issuerIdentifier'));
  issueDateInput: ElementFinder = element(by.css('input#experience-issueDate'));
  expirationDateInput: ElementFinder = element(by.css('input#experience-expirationDate'));
  titleInput: ElementFinder = element(by.css('input#experience-title'));
  startInput: ElementFinder = element(by.css('input#experience-start'));
  endInput: ElementFinder = element(by.css('input#experience-end'));
  activeInput: ElementFinder = element(by.css('input#experience-active'));
  createdByInput: ElementFinder = element(by.css('input#experience-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#experience-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#experience-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#experience-updatedDate'));

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

  async setIssuerIdentifierInput(issuerIdentifier) {
    await this.issuerIdentifierInput.sendKeys(issuerIdentifier);
  }

  async getIssuerIdentifierInput() {
    return this.issuerIdentifierInput.getAttribute('value');
  }

  async setIssueDateInput(issueDate) {
    await this.issueDateInput.sendKeys(issueDate);
  }

  async getIssueDateInput() {
    return this.issueDateInput.getAttribute('value');
  }

  async setExpirationDateInput(expirationDate) {
    await this.expirationDateInput.sendKeys(expirationDate);
  }

  async getExpirationDateInput() {
    return this.expirationDateInput.getAttribute('value');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setStartInput(start) {
    await this.startInput.sendKeys(start);
  }

  async getStartInput() {
    return this.startInput.getAttribute('value');
  }

  async setEndInput(end) {
    await this.endInput.sendKeys(end);
  }

  async getEndInput() {
    return this.endInput.getAttribute('value');
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
