import { element, by, ElementFinder } from 'protractor';

export default class PersonUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.person.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#person-name'));
  identifierInput: ElementFinder = element(by.css('input#person-identifier'));
  firstNameInput: ElementFinder = element(by.css('input#person-firstName'));
  middleNameInput: ElementFinder = element(by.css('input#person-middleName'));
  lastNameInput: ElementFinder = element(by.css('input#person-lastName'));
  activeInput: ElementFinder = element(by.css('input#person-active'));
  createdByInput: ElementFinder = element(by.css('input#person-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#person-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#person-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#person-updatedDate'));
  addressSelect: ElementFinder = element(by.css('select#person-address'));
  homePhoneSelect: ElementFinder = element(by.css('select#person-homePhone'));
  workPhoneSelect: ElementFinder = element(by.css('select#person-workPhone'));
  mobilePhoneSelect: ElementFinder = element(by.css('select#person-mobilePhone'));
  emailSelect: ElementFinder = element(by.css('select#person-email'));

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

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName) {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput() {
    return this.middleNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
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

  async homePhoneSelectLastOption() {
    await this.homePhoneSelect.all(by.tagName('option')).last().click();
  }

  async homePhoneSelectOption(option) {
    await this.homePhoneSelect.sendKeys(option);
  }

  getHomePhoneSelect() {
    return this.homePhoneSelect;
  }

  async getHomePhoneSelectedOption() {
    return this.homePhoneSelect.element(by.css('option:checked')).getText();
  }

  async workPhoneSelectLastOption() {
    await this.workPhoneSelect.all(by.tagName('option')).last().click();
  }

  async workPhoneSelectOption(option) {
    await this.workPhoneSelect.sendKeys(option);
  }

  getWorkPhoneSelect() {
    return this.workPhoneSelect;
  }

  async getWorkPhoneSelectedOption() {
    return this.workPhoneSelect.element(by.css('option:checked')).getText();
  }

  async mobilePhoneSelectLastOption() {
    await this.mobilePhoneSelect.all(by.tagName('option')).last().click();
  }

  async mobilePhoneSelectOption(option) {
    await this.mobilePhoneSelect.sendKeys(option);
  }

  getMobilePhoneSelect() {
    return this.mobilePhoneSelect;
  }

  async getMobilePhoneSelectedOption() {
    return this.mobilePhoneSelect.element(by.css('option:checked')).getText();
  }

  async emailSelectLastOption() {
    await this.emailSelect.all(by.tagName('option')).last().click();
  }

  async emailSelectOption(option) {
    await this.emailSelect.sendKeys(option);
  }

  getEmailSelect() {
    return this.emailSelect;
  }

  async getEmailSelectedOption() {
    return this.emailSelect.element(by.css('option:checked')).getText();
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
