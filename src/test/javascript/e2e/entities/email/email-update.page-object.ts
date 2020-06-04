import { element, by, ElementFinder } from 'protractor';

export default class EmailUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.email.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  addressInput: ElementFinder = element(by.css('input#email-address'));
  activeInput: ElementFinder = element(by.css('input#email-active'));
  createdByInput: ElementFinder = element(by.css('input#email-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#email-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#email-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#email-updatedDate'));
  emailTypeSelect: ElementFinder = element(by.css('select#email-emailType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return this.addressInput.getAttribute('value');
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

  async emailTypeSelectLastOption() {
    await this.emailTypeSelect.all(by.tagName('option')).last().click();
  }

  async emailTypeSelectOption(option) {
    await this.emailTypeSelect.sendKeys(option);
  }

  getEmailTypeSelect() {
    return this.emailTypeSelect;
  }

  async getEmailTypeSelectedOption() {
    return this.emailTypeSelect.element(by.css('option:checked')).getText();
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
