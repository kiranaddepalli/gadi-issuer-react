import { element, by, ElementFinder } from 'protractor';

export default class PhoneNumberUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.phoneNumber.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  countryCodeInput: ElementFinder = element(by.css('input#phone-number-countryCode'));
  areaCodeInput: ElementFinder = element(by.css('input#phone-number-areaCode'));
  phoneNumberInput: ElementFinder = element(by.css('input#phone-number-phoneNumber'));
  extensionInput: ElementFinder = element(by.css('input#phone-number-extension'));
  activeInput: ElementFinder = element(by.css('input#phone-number-active'));
  createdByInput: ElementFinder = element(by.css('input#phone-number-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#phone-number-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#phone-number-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#phone-number-updatedDate'));
  phoneTypeSelect: ElementFinder = element(by.css('select#phone-number-phoneType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCountryCodeInput(countryCode) {
    await this.countryCodeInput.sendKeys(countryCode);
  }

  async getCountryCodeInput() {
    return this.countryCodeInput.getAttribute('value');
  }

  async setAreaCodeInput(areaCode) {
    await this.areaCodeInput.sendKeys(areaCode);
  }

  async getAreaCodeInput() {
    return this.areaCodeInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setExtensionInput(extension) {
    await this.extensionInput.sendKeys(extension);
  }

  async getExtensionInput() {
    return this.extensionInput.getAttribute('value');
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

  async phoneTypeSelectLastOption() {
    await this.phoneTypeSelect.all(by.tagName('option')).last().click();
  }

  async phoneTypeSelectOption(option) {
    await this.phoneTypeSelect.sendKeys(option);
  }

  getPhoneTypeSelect() {
    return this.phoneTypeSelect;
  }

  async getPhoneTypeSelectedOption() {
    return this.phoneTypeSelect.element(by.css('option:checked')).getText();
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
