import { element, by, ElementFinder } from 'protractor';

export default class AddressUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.address.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressLine1Input: ElementFinder = element(by.css('input#address-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#address-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#address-city'));
  zipcodeInput: ElementFinder = element(by.css('input#address-zipcode'));
  latitudeInput: ElementFinder = element(by.css('input#address-latitude'));
  longitudeInput: ElementFinder = element(by.css('input#address-longitude'));
  activeInput: ElementFinder = element(by.css('input#address-active'));
  createdByInput: ElementFinder = element(by.css('input#address-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#address-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#address-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#address-updatedDate'));
  stateSelect: ElementFinder = element(by.css('select#address-state'));
  addressTypeSelect: ElementFinder = element(by.css('select#address-addressType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressLine1Input(addressLine1) {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2) {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setZipcodeInput(zipcode) {
    await this.zipcodeInput.sendKeys(zipcode);
  }

  async getZipcodeInput() {
    return this.zipcodeInput.getAttribute('value');
  }

  async setLatitudeInput(latitude) {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput() {
    return this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude) {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput() {
    return this.longitudeInput.getAttribute('value');
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

  async addressTypeSelectLastOption() {
    await this.addressTypeSelect.all(by.tagName('option')).last().click();
  }

  async addressTypeSelectOption(option) {
    await this.addressTypeSelect.sendKeys(option);
  }

  getAddressTypeSelect() {
    return this.addressTypeSelect;
  }

  async getAddressTypeSelectedOption() {
    return this.addressTypeSelect.element(by.css('option:checked')).getText();
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
