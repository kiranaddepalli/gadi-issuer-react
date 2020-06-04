import { element, by, ElementFinder } from 'protractor';

export default class PartyRelationshipUpdatePage {
  pageTitle: ElementFinder = element(by.id('gadiApp.partyRelationship.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  fromPartyInput: ElementFinder = element(by.css('input#party-relationship-fromParty'));
  toPartyInput: ElementFinder = element(by.css('input#party-relationship-toParty'));
  fromDateInput: ElementFinder = element(by.css('input#party-relationship-fromDate'));
  partyRoleSelect: ElementFinder = element(by.css('select#party-relationship-partyRole'));
  fromPartyTypeSelect: ElementFinder = element(by.css('select#party-relationship-fromPartyType'));
  toPartyTypeSelect: ElementFinder = element(by.css('select#party-relationship-toPartyType'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFromPartyInput(fromParty) {
    await this.fromPartyInput.sendKeys(fromParty);
  }

  async getFromPartyInput() {
    return this.fromPartyInput.getAttribute('value');
  }

  async setToPartyInput(toParty) {
    await this.toPartyInput.sendKeys(toParty);
  }

  async getToPartyInput() {
    return this.toPartyInput.getAttribute('value');
  }

  async setFromDateInput(fromDate) {
    await this.fromDateInput.sendKeys(fromDate);
  }

  async getFromDateInput() {
    return this.fromDateInput.getAttribute('value');
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

  async fromPartyTypeSelectLastOption() {
    await this.fromPartyTypeSelect.all(by.tagName('option')).last().click();
  }

  async fromPartyTypeSelectOption(option) {
    await this.fromPartyTypeSelect.sendKeys(option);
  }

  getFromPartyTypeSelect() {
    return this.fromPartyTypeSelect;
  }

  async getFromPartyTypeSelectedOption() {
    return this.fromPartyTypeSelect.element(by.css('option:checked')).getText();
  }

  async toPartyTypeSelectLastOption() {
    await this.toPartyTypeSelect.all(by.tagName('option')).last().click();
  }

  async toPartyTypeSelectOption(option) {
    await this.toPartyTypeSelect.sendKeys(option);
  }

  getToPartyTypeSelect() {
    return this.toPartyTypeSelect;
  }

  async getToPartyTypeSelectedOption() {
    return this.toPartyTypeSelect.element(by.css('option:checked')).getText();
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
