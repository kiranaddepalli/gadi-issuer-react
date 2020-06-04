import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TenureTypeComponentsPage, { TenureTypeDeleteDialog } from './tenure-type.page-object';
import TenureTypeUpdatePage from './tenure-type-update.page-object';
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

describe('TenureType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tenureTypeComponentsPage: TenureTypeComponentsPage;
  let tenureTypeUpdatePage: TenureTypeUpdatePage;
  let tenureTypeDeleteDialog: TenureTypeDeleteDialog;
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

  it('should load TenureTypes', async () => {
    await navBarPage.getEntityPage('tenure-type');
    tenureTypeComponentsPage = new TenureTypeComponentsPage();
    expect(await tenureTypeComponentsPage.title.getText()).to.match(/Tenure Types/);

    expect(await tenureTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([tenureTypeComponentsPage.noRecords, tenureTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(tenureTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(tenureTypeComponentsPage.table);
  });

  it('should load create TenureType page', async () => {
    await tenureTypeComponentsPage.createButton.click();
    tenureTypeUpdatePage = new TenureTypeUpdatePage();
    expect(await tenureTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.tenureType.home.createOrEditLabel/);
    await tenureTypeUpdatePage.cancel();
  });

  it('should create and save TenureTypes', async () => {
    await tenureTypeComponentsPage.createButton.click();
    await tenureTypeUpdatePage.setNameInput('name');
    expect(await tenureTypeUpdatePage.getNameInput()).to.match(/name/);
    await tenureTypeUpdatePage.setIdentifierInput('identifier');
    expect(await tenureTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await tenureTypeUpdatePage.setOrderValueInput('5');
    expect(await tenureTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await tenureTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await tenureTypeUpdatePage.getDefaultValueInput().click();
      expect(await tenureTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await tenureTypeUpdatePage.getDefaultValueInput().click();
      expect(await tenureTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await tenureTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await tenureTypeUpdatePage.getActiveInput().click();
      expect(await tenureTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await tenureTypeUpdatePage.getActiveInput().click();
      expect(await tenureTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await tenureTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await tenureTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await tenureTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await tenureTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await tenureTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await tenureTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await tenureTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await tenureTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(tenureTypeUpdatePage.saveButton);
    await tenureTypeUpdatePage.save();
    await waitUntilHidden(tenureTypeUpdatePage.saveButton);
    expect(await isVisible(tenureTypeUpdatePage.saveButton)).to.be.false;

    expect(await tenureTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(tenureTypeComponentsPage.table);

    await waitUntilCount(tenureTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await tenureTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last TenureType', async () => {
    const deleteButton = tenureTypeComponentsPage.getDeleteButton(tenureTypeComponentsPage.records.last());
    await click(deleteButton);

    tenureTypeDeleteDialog = new TenureTypeDeleteDialog();
    await waitUntilDisplayed(tenureTypeDeleteDialog.deleteModal);
    expect(await tenureTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.tenureType.delete.question/);
    await tenureTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tenureTypeDeleteDialog.deleteModal);

    expect(await isVisible(tenureTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([tenureTypeComponentsPage.noRecords, tenureTypeComponentsPage.table]);

    const afterCount = (await isVisible(tenureTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(tenureTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
