import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AddressComponentsPage, { AddressDeleteDialog } from './address.page-object';
import AddressUpdatePage from './address-update.page-object';
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

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressComponentsPage: AddressComponentsPage;
  let addressUpdatePage: AddressUpdatePage;
  let addressDeleteDialog: AddressDeleteDialog;
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

  it('should load Addresses', async () => {
    await navBarPage.getEntityPage('address');
    addressComponentsPage = new AddressComponentsPage();
    expect(await addressComponentsPage.title.getText()).to.match(/Addresses/);

    expect(await addressComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([addressComponentsPage.noRecords, addressComponentsPage.table]);

    beforeRecordsCount = (await isVisible(addressComponentsPage.noRecords)) ? 0 : await getRecordsCount(addressComponentsPage.table);
  });

  it('should load create Address page', async () => {
    await addressComponentsPage.createButton.click();
    addressUpdatePage = new AddressUpdatePage();
    expect(await addressUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.address.home.createOrEditLabel/);
    await addressUpdatePage.cancel();
  });

  it('should create and save Addresses', async () => {
    await addressComponentsPage.createButton.click();
    await addressUpdatePage.setAddressLine1Input('addressLine1');
    expect(await addressUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
    await addressUpdatePage.setAddressLine2Input('addressLine2');
    expect(await addressUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
    await addressUpdatePage.setCityInput('city');
    expect(await addressUpdatePage.getCityInput()).to.match(/city/);
    await addressUpdatePage.setZipcodeInput('zipcode');
    expect(await addressUpdatePage.getZipcodeInput()).to.match(/zipcode/);
    await addressUpdatePage.setLatitudeInput('5');
    expect(await addressUpdatePage.getLatitudeInput()).to.eq('5');
    await addressUpdatePage.setLongitudeInput('5');
    expect(await addressUpdatePage.getLongitudeInput()).to.eq('5');
    const selectedActive = await addressUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await addressUpdatePage.getActiveInput().click();
      expect(await addressUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await addressUpdatePage.getActiveInput().click();
      expect(await addressUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await addressUpdatePage.setCreatedByInput('createdBy');
    expect(await addressUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await addressUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await addressUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await addressUpdatePage.setUpdatedByInput('updatedBy');
    expect(await addressUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await addressUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await addressUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await addressUpdatePage.stateSelectLastOption();
    await addressUpdatePage.addressTypeSelectLastOption();
    await waitUntilDisplayed(addressUpdatePage.saveButton);
    await addressUpdatePage.save();
    await waitUntilHidden(addressUpdatePage.saveButton);
    expect(await isVisible(addressUpdatePage.saveButton)).to.be.false;

    expect(await addressComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(addressComponentsPage.table);

    await waitUntilCount(addressComponentsPage.records, beforeRecordsCount + 1);
    expect(await addressComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Address', async () => {
    const deleteButton = addressComponentsPage.getDeleteButton(addressComponentsPage.records.last());
    await click(deleteButton);

    addressDeleteDialog = new AddressDeleteDialog();
    await waitUntilDisplayed(addressDeleteDialog.deleteModal);
    expect(await addressDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.address.delete.question/);
    await addressDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(addressDeleteDialog.deleteModal);

    expect(await isVisible(addressDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([addressComponentsPage.noRecords, addressComponentsPage.table]);

    const afterCount = (await isVisible(addressComponentsPage.noRecords)) ? 0 : await getRecordsCount(addressComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
