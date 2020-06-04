import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PassportComponentsPage, { PassportDeleteDialog } from './passport.page-object';
import PassportUpdatePage from './passport-update.page-object';
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

describe('Passport e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let passportComponentsPage: PassportComponentsPage;
  let passportUpdatePage: PassportUpdatePage;
  let passportDeleteDialog: PassportDeleteDialog;
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

  it('should load Passports', async () => {
    await navBarPage.getEntityPage('passport');
    passportComponentsPage = new PassportComponentsPage();
    expect(await passportComponentsPage.title.getText()).to.match(/Passports/);

    expect(await passportComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([passportComponentsPage.noRecords, passportComponentsPage.table]);

    beforeRecordsCount = (await isVisible(passportComponentsPage.noRecords)) ? 0 : await getRecordsCount(passportComponentsPage.table);
  });

  it('should load create Passport page', async () => {
    await passportComponentsPage.createButton.click();
    passportUpdatePage = new PassportUpdatePage();
    expect(await passportUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.passport.home.createOrEditLabel/);
    await passportUpdatePage.cancel();
  });

  it('should create and save Passports', async () => {
    await passportComponentsPage.createButton.click();
    await passportUpdatePage.setNameInput('name');
    expect(await passportUpdatePage.getNameInput()).to.match(/name/);
    await passportUpdatePage.setIdentifierInput('identifier');
    expect(await passportUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await passportUpdatePage.setIssuerIdentifierInput('issuerIdentifier');
    expect(await passportUpdatePage.getIssuerIdentifierInput()).to.match(/issuerIdentifier/);
    await passportUpdatePage.setIssueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await passportUpdatePage.getIssueDateInput()).to.contain('2001-01-01T02:30');
    await passportUpdatePage.setExpirationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await passportUpdatePage.getExpirationDateInput()).to.contain('2001-01-01T02:30');
    await passportUpdatePage.setClassCodeInput('classCode');
    expect(await passportUpdatePage.getClassCodeInput()).to.match(/classCode/);
    await passportUpdatePage.setBirthDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await passportUpdatePage.getBirthDateInput()).to.contain('2001-01-01T02:30');
    await passportUpdatePage.setHeightFeetInput('5');
    expect(await passportUpdatePage.getHeightFeetInput()).to.eq('5');
    await passportUpdatePage.setHeightInchesInput('5');
    expect(await passportUpdatePage.getHeightInchesInput()).to.eq('5');
    const selectedActive = await passportUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await passportUpdatePage.getActiveInput().click();
      expect(await passportUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await passportUpdatePage.getActiveInput().click();
      expect(await passportUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await passportUpdatePage.setCreatedByInput('createdBy');
    expect(await passportUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await passportUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await passportUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await passportUpdatePage.setUpdatedByInput('updatedBy');
    expect(await passportUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await passportUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await passportUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await passportUpdatePage.genderSelectLastOption();
    await passportUpdatePage.nationalitySelectLastOption();
    await passportUpdatePage.holderImageSelectLastOption();
    await waitUntilDisplayed(passportUpdatePage.saveButton);
    await passportUpdatePage.save();
    await waitUntilHidden(passportUpdatePage.saveButton);
    expect(await isVisible(passportUpdatePage.saveButton)).to.be.false;

    expect(await passportComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(passportComponentsPage.table);

    await waitUntilCount(passportComponentsPage.records, beforeRecordsCount + 1);
    expect(await passportComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Passport', async () => {
    const deleteButton = passportComponentsPage.getDeleteButton(passportComponentsPage.records.last());
    await click(deleteButton);

    passportDeleteDialog = new PassportDeleteDialog();
    await waitUntilDisplayed(passportDeleteDialog.deleteModal);
    expect(await passportDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.passport.delete.question/);
    await passportDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(passportDeleteDialog.deleteModal);

    expect(await isVisible(passportDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([passportComponentsPage.noRecords, passportComponentsPage.table]);

    const afterCount = (await isVisible(passportComponentsPage.noRecords)) ? 0 : await getRecordsCount(passportComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
