import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PhoneNumberComponentsPage, { PhoneNumberDeleteDialog } from './phone-number.page-object';
import PhoneNumberUpdatePage from './phone-number-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('PhoneNumber e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let phoneNumberComponentsPage: PhoneNumberComponentsPage;
  let phoneNumberUpdatePage: PhoneNumberUpdatePage;
  let phoneNumberDeleteDialog: PhoneNumberDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load PhoneNumbers', async () => {
    await navBarPage.getEntityPage('phone-number');
    phoneNumberComponentsPage = new PhoneNumberComponentsPage();
    expect(await phoneNumberComponentsPage.title.getText()).to.match(/Phone Numbers/);

    expect(await phoneNumberComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([phoneNumberComponentsPage.noRecords, phoneNumberComponentsPage.table]);

    beforeRecordsCount = (await isVisible(phoneNumberComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(phoneNumberComponentsPage.table);
  });

  it('should load create PhoneNumber page', async () => {
    await phoneNumberComponentsPage.createButton.click();
    phoneNumberUpdatePage = new PhoneNumberUpdatePage();
    expect(await phoneNumberUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.phoneNumber.home.createOrEditLabel/);
    await phoneNumberUpdatePage.cancel();
  });

  it('should create and save PhoneNumbers', async () => {
    await phoneNumberComponentsPage.createButton.click();
    await phoneNumberUpdatePage.setCountryCodeInput('5');
    expect(await phoneNumberUpdatePage.getCountryCodeInput()).to.eq('5');
    await phoneNumberUpdatePage.setAreaCodeInput('5');
    expect(await phoneNumberUpdatePage.getAreaCodeInput()).to.eq('5');
    await phoneNumberUpdatePage.setPhoneNumberInput('phoneNumber');
    expect(await phoneNumberUpdatePage.getPhoneNumberInput()).to.match(/phoneNumber/);
    await phoneNumberUpdatePage.setExtensionInput('5');
    expect(await phoneNumberUpdatePage.getExtensionInput()).to.eq('5');
    const selectedActive = await phoneNumberUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await phoneNumberUpdatePage.getActiveInput().click();
      expect(await phoneNumberUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await phoneNumberUpdatePage.getActiveInput().click();
      expect(await phoneNumberUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await phoneNumberUpdatePage.setCreatedByInput('createdBy');
    expect(await phoneNumberUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await phoneNumberUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await phoneNumberUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await phoneNumberUpdatePage.setUpdatedByInput('updatedBy');
    expect(await phoneNumberUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await phoneNumberUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await phoneNumberUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await phoneNumberUpdatePage.phoneTypeSelectLastOption();
    await waitUntilDisplayed(phoneNumberUpdatePage.saveButton);
    await phoneNumberUpdatePage.save();
    await waitUntilHidden(phoneNumberUpdatePage.saveButton);
    expect(await isVisible(phoneNumberUpdatePage.saveButton)).to.be.false;

    expect(await phoneNumberComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(phoneNumberComponentsPage.table);

    await waitUntilCount(phoneNumberComponentsPage.records, beforeRecordsCount + 1);
    expect(await phoneNumberComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PhoneNumber', async () => {
    const deleteButton = phoneNumberComponentsPage.getDeleteButton(phoneNumberComponentsPage.records.last());
    await click(deleteButton);

    phoneNumberDeleteDialog = new PhoneNumberDeleteDialog();
    await waitUntilDisplayed(phoneNumberDeleteDialog.deleteModal);
    expect(await phoneNumberDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.phoneNumber.delete.question/);
    await phoneNumberDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(phoneNumberDeleteDialog.deleteModal);

    expect(await isVisible(phoneNumberDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([phoneNumberComponentsPage.noRecords, phoneNumberComponentsPage.table]);

    const afterCount = (await isVisible(phoneNumberComponentsPage.noRecords)) ? 0 : await getRecordsCount(phoneNumberComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
