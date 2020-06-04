import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AddressTypeComponentsPage, { AddressTypeDeleteDialog } from './address-type.page-object';
import AddressTypeUpdatePage from './address-type-update.page-object';
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

describe('AddressType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressTypeComponentsPage: AddressTypeComponentsPage;
  let addressTypeUpdatePage: AddressTypeUpdatePage;
  let addressTypeDeleteDialog: AddressTypeDeleteDialog;
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

  it('should load AddressTypes', async () => {
    await navBarPage.getEntityPage('address-type');
    addressTypeComponentsPage = new AddressTypeComponentsPage();
    expect(await addressTypeComponentsPage.title.getText()).to.match(/Address Types/);

    expect(await addressTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([addressTypeComponentsPage.noRecords, addressTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(addressTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(addressTypeComponentsPage.table);
  });

  it('should load create AddressType page', async () => {
    await addressTypeComponentsPage.createButton.click();
    addressTypeUpdatePage = new AddressTypeUpdatePage();
    expect(await addressTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.addressType.home.createOrEditLabel/);
    await addressTypeUpdatePage.cancel();
  });

  it('should create and save AddressTypes', async () => {
    await addressTypeComponentsPage.createButton.click();
    await addressTypeUpdatePage.setNameInput('name');
    expect(await addressTypeUpdatePage.getNameInput()).to.match(/name/);
    await addressTypeUpdatePage.setIdentifierInput('identifier');
    expect(await addressTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await addressTypeUpdatePage.setOrderValueInput('5');
    expect(await addressTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await addressTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await addressTypeUpdatePage.getDefaultValueInput().click();
      expect(await addressTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await addressTypeUpdatePage.getDefaultValueInput().click();
      expect(await addressTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await addressTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await addressTypeUpdatePage.getActiveInput().click();
      expect(await addressTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await addressTypeUpdatePage.getActiveInput().click();
      expect(await addressTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await addressTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await addressTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await addressTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await addressTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await addressTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await addressTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await addressTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await addressTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(addressTypeUpdatePage.saveButton);
    await addressTypeUpdatePage.save();
    await waitUntilHidden(addressTypeUpdatePage.saveButton);
    expect(await isVisible(addressTypeUpdatePage.saveButton)).to.be.false;

    expect(await addressTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(addressTypeComponentsPage.table);

    await waitUntilCount(addressTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await addressTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last AddressType', async () => {
    const deleteButton = addressTypeComponentsPage.getDeleteButton(addressTypeComponentsPage.records.last());
    await click(deleteButton);

    addressTypeDeleteDialog = new AddressTypeDeleteDialog();
    await waitUntilDisplayed(addressTypeDeleteDialog.deleteModal);
    expect(await addressTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.addressType.delete.question/);
    await addressTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(addressTypeDeleteDialog.deleteModal);

    expect(await isVisible(addressTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([addressTypeComponentsPage.noRecords, addressTypeComponentsPage.table]);

    const afterCount = (await isVisible(addressTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(addressTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
