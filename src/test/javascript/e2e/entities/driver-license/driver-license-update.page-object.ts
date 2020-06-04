import { element, by, ElementFinder } from 'protractor';

export default class DriverLicenseUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.driverLicense.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#driver-license-name'));
  identifierInput: ElementFinder = element(by.css('input#driver-license-identifier'));
  issuerIdentifierInput: ElementFinder = element(by.css('input#driver-license-issuerIdentifier'));
  issueDateInput: ElementFinder = element(by.css('input#driver-license-issueDate'));
  expirationDateInput: ElementFinder = element(by.css('input#driver-license-expirationDate'));
  classCodeInput: ElementFinder = element(by.css('input#driver-license-classCode'));
  birthDateInput: ElementFinder = element(by.css('input#driver-license-birthDate'));
  heightFeetInput: ElementFinder = element(by.css('input#driver-license-heightFeet'));
  heightInchesInput: ElementFinder = element(by.css('input#driver-license-heightInches'));
  activeInput: ElementFinder = element(by.css('input#driver-license-active'));
  createdByInput: ElementFinder = element(by.css('input#driver-license-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#driver-license-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#driver-license-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#driver-license-updatedDate'));
  addressSelect: ElementFinder = element(by.css('select#driver-license-address'));
  genderSelect: ElementFinder = element(by.css('select#driver-license-gender'));
  eyeColorSelect: ElementFinder = element(by.css('select#driver-license-eyeColor'));
  hairColorSelect: ElementFinder = element(by.css('select#driver-license-hairColor'));
  raceSelect: ElementFinder = element(by.css('select#driver-license-race'));
  issuingStateSelect: ElementFinder = element(by.css('select#driver-license-issuingState'));
  issuingCountrySelect: ElementFinder = element(by.css('select#driver-license-issuingCountry'));
  holderImageSelect: ElementFinder = element(by.css('select#driver-license-holderImage'));

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

  async addressSelectLastOption() {
    await this.addressSelect.all(by.tagName('option')).last().click();
  }

  async addressSelectOption(option) {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect() {
    return this.addressSelect;
  }

  async getAddressSelectedOption() {
    return this.addressSelect.element(by.css('option:checked')).getText();
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

  async eyeColorSelectLastOption() {
    await this.eyeColorSelect.all(by.tagName('option')).last().click();
  }

  async eyeColorSelectOption(option) {
    await this.eyeColorSelect.sendKeys(option);
  }

  getEyeColorSelect() {
    return this.eyeColorSelect;
  }

  async getEyeColorSelectedOption() {
    return this.eyeColorSelect.element(by.css('option:checked')).getText();
  }

  async hairColorSelectLastOption() {
    await this.hairColorSelect.all(by.tagName('option')).last().click();
  }

  async hairColorSelectOption(option) {
    await this.hairColorSelect.sendKeys(option);
  }

  getHairColorSelect() {
    return this.hairColorSelect;
  }

  async getHairColorSelectedOption() {
    return this.hairColorSelect.element(by.css('option:checked')).getText();
  }

  async raceSelectLastOption() {
    await this.raceSelect.all(by.tagName('option')).last().click();
  }

  async raceSelectOption(option) {
    await this.raceSelect.sendKeys(option);
  }

  getRaceSelect() {
    return this.raceSelect;
  }

  async getRaceSelectedOption() {
    return this.raceSelect.element(by.css('option:checked')).getText();
  }

  async issuingStateSelectLastOption() {
    await this.issuingStateSelect.all(by.tagName('option')).last().click();
  }

  async issuingStateSelectOption(option) {
    await this.issuingStateSelect.sendKeys(option);
  }

  getIssuingStateSelect() {
    return this.issuingStateSelect;
  }

  async getIssuingStateSelectedOption() {
    return this.issuingStateSelect.element(by.css('option:checked')).getText();
  }

  async issuingCountrySelectLastOption() {
    await this.issuingCountrySelect.all(by.tagName('option')).last().click();
  }

  async issuingCountrySelectOption(option) {
    await this.issuingCountrySelect.sendKeys(option);
  }

  getIssuingCountrySelect() {
    return this.issuingCountrySelect;
  }

  async getIssuingCountrySelectedOption() {
    return this.issuingCountrySelect.element(by.css('option:checked')).getText();
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
