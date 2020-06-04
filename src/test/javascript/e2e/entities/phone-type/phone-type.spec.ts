import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PhoneTypeComponentsPage, { PhoneTypeDeleteDialog } from './phone-type.page-object';
import PhoneTypeUpdatePage from './phone-type-update.page-object';
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

describe('PhoneType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let phoneTypeComponentsPage: PhoneTypeComponentsPage;
  let phoneTypeUpdatePage: PhoneTypeUpdatePage;
  let phoneTypeDeleteDialog: PhoneTypeDeleteDialog;
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

  it('should load PhoneTypes', async () => {
    await navBarPage.getEntityPage('phone-type');
    phoneTypeComponentsPage = new PhoneTypeComponentsPage();
    expect(await phoneTypeComponentsPage.title.getText()).to.match(/Phone Types/);

    expect(await phoneTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([phoneTypeComponentsPage.noRecords, phoneTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(phoneTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(phoneTypeComponentsPage.table);
  });

  it('should load create PhoneType page', async () => {
    await phoneTypeComponentsPage.createButton.click();
    phoneTypeUpdatePage = new PhoneTypeUpdatePage();
    expect(await phoneTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.phoneType.home.createOrEditLabel/);
    await phoneTypeUpdatePage.cancel();
  });

  it('should create and save PhoneTypes', async () => {
    await phoneTypeComponentsPage.createButton.click();
    await phoneTypeUpdatePage.setNameInput('name');
    expect(await phoneTypeUpdatePage.getNameInput()).to.match(/name/);
    await phoneTypeUpdatePage.setIdentifierInput('identifier');
    expect(await phoneTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await phoneTypeUpdatePage.setOrderValueInput('5');
    expect(await phoneTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await phoneTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await phoneTypeUpdatePage.getDefaultValueInput().click();
      expect(await phoneTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await phoneTypeUpdatePage.getDefaultValueInput().click();
      expect(await phoneTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await phoneTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await phoneTypeUpdatePage.getActiveInput().click();
      expect(await phoneTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await phoneTypeUpdatePage.getActiveInput().click();
      expect(await phoneTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await phoneTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await phoneTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await phoneTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await phoneTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await phoneTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await phoneTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await phoneTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await phoneTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(phoneTypeUpdatePage.saveButton);
    await phoneTypeUpdatePage.save();
    await waitUntilHidden(phoneTypeUpdatePage.saveButton);
    expect(await isVisible(phoneTypeUpdatePage.saveButton)).to.be.false;

    expect(await phoneTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(phoneTypeComponentsPage.table);

    await waitUntilCount(phoneTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await phoneTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PhoneType', async () => {
    const deleteButton = phoneTypeComponentsPage.getDeleteButton(phoneTypeComponentsPage.records.last());
    await click(deleteButton);

    phoneTypeDeleteDialog = new PhoneTypeDeleteDialog();
    await waitUntilDisplayed(phoneTypeDeleteDialog.deleteModal);
    expect(await phoneTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.phoneType.delete.question/);
    await phoneTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(phoneTypeDeleteDialog.deleteModal);

    expect(await isVisible(phoneTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([phoneTypeComponentsPage.noRecords, phoneTypeComponentsPage.table]);

    const afterCount = (await isVisible(phoneTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(phoneTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
