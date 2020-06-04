import { element, by, ElementFinder } from 'protractor';

export default class OrganizationUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.organization.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#organization-name'));
  identifierInput: ElementFinder = element(by.css('input#organization-identifier'));
  businessNameInput: ElementFinder = element(by.css('input#organization-businessName'));
  dbaNameInput: ElementFinder = element(by.css('input#organization-dbaName'));
  feinInput: ElementFinder = element(by.css('input#organization-fein'));
  startDateInput: ElementFinder = element(by.css('input#organization-startDate'));
  activeInput: ElementFinder = element(by.css('input#organization-active'));
  createdByInput: ElementFinder = element(by.css('input#organization-createdBy'));
  createdDateInput: ElementFinder = element(by.css('input#organization-createdDate'));
  updatedByInput: ElementFinder = element(by.css('input#organization-updatedBy'));
  updatedDateInput: ElementFinder = element(by.css('input#organization-updatedDate'));
  partyRoleSelect: ElementFinder = element(by.css('select#organization-partyRole'));
  incorporatedStateSelect: ElementFinder = element(by.css('select#organization-incorporatedState'));
  countrySelect: ElementFinder = element(by.css('select#organization-country'));
  addressSelect: ElementFinder = element(by.css('select#organization-address'));
  mainPhoneSelect: ElementFinder = element(by.css('select#organization-mainPhone'));
  secondaryPhoneSelect: ElementFinder = element(by.css('select#organization-secondaryPhone'));

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

  async setBusinessNameInput(businessName) {
    await this.businessNameInput.sendKeys(businessName);
  }

  async getBusinessNameInput() {
    return this.businessNameInput.getAttribute('value');
  }

  async setDbaNameInput(dbaName) {
    await this.dbaNameInput.sendKeys(dbaName);
  }

  async getDbaNameInput() {
    return this.dbaNameInput.getAttribute('value');
  }

  async setFeinInput(fein) {
    await this.feinInput.sendKeys(fein);
  }

  async getFeinInput() {
    return this.feinInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
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

  async partyRoleSelectLastOption() {
    await this.partyRoleSelect.all(by.tagName('option')).last().click();
  }

  async partyRoleSelectOption(option) {
    await this.partyRoleSelect.sendKeys(option);
  }

  getPartyRoleSelect() {
    return this.partyRoleSelect;
  }

  async getPartyRoleSelectedOption() {
    return this.partyRoleSelect.element(by.css('option:checked')).getText();
  }

  async incorporatedStateSelectLastOption() {
    await this.incorporatedStateSelect.all(by.tagName('option')).last().click();
  }

  async incorporatedStateSelectOption(option) {
    await this.incorporatedStateSelect.sendKeys(option);
  }

  getIncorporatedStateSelect() {
    return this.incorporatedStateSelect;
  }

  async getIncorporatedStateSelectedOption() {
    return this.incorporatedStateSelect.element(by.css('option:checked')).getText();
  }

  async countrySelectLastOption() {
    await this.countrySelect.all(by.tagName('option')).last().click();
  }

  async countrySelectOption(option) {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect() {
    return this.countrySelect;
  }

  async getCountrySelectedOption() {
    return this.countrySelect.element(by.css('option:checked')).getText();
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

  async mainPhoneSelectLastOption() {
    await this.mainPhoneSelect.all(by.tagName('option')).last().click();
  }

  async mainPhoneSelectOption(option) {
    await this.mainPhoneSelect.sendKeys(option);
  }

  getMainPhoneSelect() {
    return this.mainPhoneSelect;
  }

  async getMainPhoneSelectedOption() {
    return this.mainPhoneSelect.element(by.css('option:checked')).getText();
  }

  async secondaryPhoneSelectLastOption() {
    await this.secondaryPhoneSelect.all(by.tagName('option')).last().click();
  }

  async secondaryPhoneSelectOption(option) {
    await this.secondaryPhoneSelect.sendKeys(option);
  }

  getSecondaryPhoneSelect() {
    return this.secondaryPhoneSelect;
  }

  async getSecondaryPhoneSelectedOption() {
    return this.secondaryPhoneSelect.element(by.css('option:checked')).getText();
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
