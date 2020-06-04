import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmailComponentsPage, { EmailDeleteDialog } from './email.page-object';
import EmailUpdatePage from './email-update.page-object';
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

describe('Email e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emailComponentsPage: EmailComponentsPage;
  let emailUpdatePage: EmailUpdatePage;
  let emailDeleteDialog: EmailDeleteDialog;
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

  it('should load Emails', async () => {
    await navBarPage.getEntityPage('email');
    emailComponentsPage = new EmailComponentsPage();
    expect(await emailComponentsPage.title.getText()).to.match(/Emails/);

    expect(await emailComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([emailComponentsPage.noRecords, emailComponentsPage.table]);

    beforeRecordsCount = (await isVisible(emailComponentsPage.noRecords)) ? 0 : await getRecordsCount(emailComponentsPage.table);
  });

  it('should load create Email page', async () => {
    await emailComponentsPage.createButton.click();
    emailUpdatePage = new EmailUpdatePage();
    expect(await emailUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.email.home.createOrEditLabel/);
    await emailUpdatePage.cancel();
  });

  it('should create and save Emails', async () => {
    await emailComponentsPage.createButton.click();
    await emailUpdatePage.setAddressInput('5');
    expect(await emailUpdatePage.getAddressInput()).to.eq('5');
    const selectedActive = await emailUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await emailUpdatePage.getActiveInput().click();
      expect(await emailUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await emailUpdatePage.getActiveInput().click();
      expect(await emailUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await emailUpdatePage.setCreatedByInput('createdBy');
    expect(await emailUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await emailUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await emailUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await emailUpdatePage.setUpdatedByInput('updatedBy');
    expect(await emailUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await emailUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await emailUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await emailUpdatePage.emailTypeSelectLastOption();
    await waitUntilDisplayed(emailUpdatePage.saveButton);
    await emailUpdatePage.save();
    await waitUntilHidden(emailUpdatePage.saveButton);
    expect(await isVisible(emailUpdatePage.saveButton)).to.be.false;

    expect(await emailComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(emailComponentsPage.table);

    await waitUntilCount(emailComponentsPage.records, beforeRecordsCount + 1);
    expect(await emailComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Email', async () => {
    const deleteButton = emailComponentsPage.getDeleteButton(emailComponentsPage.records.last());
    await click(deleteButton);

    emailDeleteDialog = new EmailDeleteDialog();
    await waitUntilDisplayed(emailDeleteDialog.deleteModal);
    expect(await emailDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.email.delete.question/);
    await emailDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(emailDeleteDialog.deleteModal);

    expect(await isVisible(emailDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([emailComponentsPage.noRecords, emailComponentsPage.table]);

    const afterCount = (await isVisible(emailComponentsPage.noRecords)) ? 0 : await getRecordsCount(emailComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
