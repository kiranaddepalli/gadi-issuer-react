import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmailTypeComponentsPage, { EmailTypeDeleteDialog } from './email-type.page-object';
import EmailTypeUpdatePage from './email-type-update.page-object';
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

describe('EmailType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emailTypeComponentsPage: EmailTypeComponentsPage;
  let emailTypeUpdatePage: EmailTypeUpdatePage;
  let emailTypeDeleteDialog: EmailTypeDeleteDialog;
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

  it('should load EmailTypes', async () => {
    await navBarPage.getEntityPage('email-type');
    emailTypeComponentsPage = new EmailTypeComponentsPage();
    expect(await emailTypeComponentsPage.title.getText()).to.match(/Email Types/);

    expect(await emailTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([emailTypeComponentsPage.noRecords, emailTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(emailTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(emailTypeComponentsPage.table);
  });

  it('should load create EmailType page', async () => {
    await emailTypeComponentsPage.createButton.click();
    emailTypeUpdatePage = new EmailTypeUpdatePage();
    expect(await emailTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.emailType.home.createOrEditLabel/);
    await emailTypeUpdatePage.cancel();
  });

  it('should create and save EmailTypes', async () => {
    await emailTypeComponentsPage.createButton.click();
    await emailTypeUpdatePage.setNameInput('name');
    expect(await emailTypeUpdatePage.getNameInput()).to.match(/name/);
    await emailTypeUpdatePage.setIdentifierInput('identifier');
    expect(await emailTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await emailTypeUpdatePage.setOrderValueInput('5');
    expect(await emailTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await emailTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await emailTypeUpdatePage.getDefaultValueInput().click();
      expect(await emailTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await emailTypeUpdatePage.getDefaultValueInput().click();
      expect(await emailTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await emailTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await emailTypeUpdatePage.getActiveInput().click();
      expect(await emailTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await emailTypeUpdatePage.getActiveInput().click();
      expect(await emailTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await emailTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await emailTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await emailTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await emailTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await emailTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await emailTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await emailTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await emailTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(emailTypeUpdatePage.saveButton);
    await emailTypeUpdatePage.save();
    await waitUntilHidden(emailTypeUpdatePage.saveButton);
    expect(await isVisible(emailTypeUpdatePage.saveButton)).to.be.false;

    expect(await emailTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(emailTypeComponentsPage.table);

    await waitUntilCount(emailTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await emailTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last EmailType', async () => {
    const deleteButton = emailTypeComponentsPage.getDeleteButton(emailTypeComponentsPage.records.last());
    await click(deleteButton);

    emailTypeDeleteDialog = new EmailTypeDeleteDialog();
    await waitUntilDisplayed(emailTypeDeleteDialog.deleteModal);
    expect(await emailTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.emailType.delete.question/);
    await emailTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(emailTypeDeleteDialog.deleteModal);

    expect(await isVisible(emailTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([emailTypeComponentsPage.noRecords, emailTypeComponentsPage.table]);

    const afterCount = (await isVisible(emailTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(emailTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
