import { element, by, ElementFinder } from 'protractor';

export default class PassportUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.passport.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#passport-name'));
  identifierInput: ElementFinder = element(by.css('input#passport-identifier'));
  issuerIdentifierInput: ElementFinder = element(by.css('input#passport-issuerIdentifier'));
  issueDateInput: ElementFinder = element(by.css('input#passport-issueDate'));
  expirationDateInput: ElementFinder = element(by.css('input#passport-expirationDate'));
  classCodeInput: ElementFinder = element(by.css('input#passport-classCode'));
  birthDateInput: ElementFinder = element(by.css('input#passport-birthDate'));
  heightFeetInput: ElementFinder = element(by.css('input#passport-heightFeet'));
  heightInchesInput: ElementFinder = element(by.css('input#passport-heightInches'));
  activeInput: ElementFinder = element(by.css('input#passport-active'));
  createdByInput: ElementFinder = element(by.css('input#passport-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#passport-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#passport-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#passport-updatedDate'));
  genderSelect: ElementFinder = element(by.css('select#passport-gender'));
  nationalitySelect: ElementFinder = element(by.css('select#passport-nationality'));
  holderImageSelect: ElementFinder = element(by.css('select#passport-holderImage'));

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

  async setClassCodeInput(classCode) {
    await this.classCodeInput.sendKeys(classCode);
  }

  async getClassCodeInput() {
    return this.classCodeInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate) {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput() {
    return this.birthDateInput.getAttribute('value');
  }

  async setHeightFeetInput(heightFeet) {
    await this.heightFeetInput.sendKeys(heightFeet);
  }

  async getHeightFeetInput() {
    return this.heightFeetInput.getAttribute('value');
  }

  async setHeightInchesInput(heightInches) {
    await this.heightInchesInput.sendKeys(heightInches);
  }

  async getHeightInchesInput() {
    return this.heightInchesInput.getAttribute('value');
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

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }

  async genderSelectOption(option) {
    await this.genderSelect.sendKeys(option);
  }

  getGenderSelect() {
    return this.genderSelect;
  }

  async getGenderSelectedOption() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async nationalitySelectLastOption() {
    await this.nationalitySelect.all(by.tagName('option')).last().click();
  }

  async nationalitySelectOption(option) {
    await this.nationalitySelect.sendKeys(option);
  }

  getNationalitySelect() {
    return this.nationalitySelect;
  }

  async getNationalitySelectedOption() {
    return this.nationalitySelect.element(by.css('option:checked')).getText();
  }

  async holderImageSelectLastOption() {
    await this.holderImageSelect.all(by.tagName('option')).last().click();
  }

  async holderImageSelectOption(option) {
    await this.holderImageSelect.sendKeys(option);
  }

  getHolderImageSelect() {
    return this.holderImageSelect;
  }

  async getHolderImageSelectedOption() {
    return this.holderImageSelect.element(by.css('option:checked')).getText();
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
