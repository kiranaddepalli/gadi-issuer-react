import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverLicenseComponentsPage, { DriverLicenseDeleteDialog } from './driver-license.page-object';
import DriverLicenseUpdatePage from './driver-license-update.page-object';
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

describe('DriverLicense e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverLicenseComponentsPage: DriverLicenseComponentsPage;
  let driverLicenseUpdatePage: DriverLicenseUpdatePage;
  let driverLicenseDeleteDialog: DriverLicenseDeleteDialog;
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

  it('should load DriverLicenses', async () => {
    await navBarPage.getEntityPage('driver-license');
    driverLicenseComponentsPage = new DriverLicenseComponentsPage();
    expect(await driverLicenseComponentsPage.title.getText()).to.match(/Driver Licenses/);

    expect(await driverLicenseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverLicenseComponentsPage.noRecords, driverLicenseComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverLicenseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverLicenseComponentsPage.table);
  });

  it('should load create DriverLicense page', async () => {
    await driverLicenseComponentsPage.createButton.click();
    driverLicenseUpdatePage = new DriverLicenseUpdatePage();
    expect(await driverLicenseUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.driverLicense.home.createOrEditLabel/);
    await driverLicenseUpdatePage.cancel();
  });

  it('should create and save DriverLicenses', async () => {
    await driverLicenseComponentsPage.createButton.click();
    await driverLicenseUpdatePage.setNameInput('name');
    expect(await driverLicenseUpdatePage.getNameInput()).to.match(/name/);
    await driverLicenseUpdatePage.setIdentifierInput('identifier');
    expect(await driverLicenseUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await driverLicenseUpdatePage.setIssuerIdentifierInput('issuerIdentifier');
    expect(await driverLicenseUpdatePage.getIssuerIdentifierInput()).to.match(/issuerIdentifier/);
    await driverLicenseUpdatePage.setIssueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await driverLicenseUpdatePage.getIssueDateInput()).to.contain('2001-01-01T02:30');
    await driverLicenseUpdatePage.setExpirationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await driverLicenseUpdatePage.getExpirationDateInput()).to.contain('2001-01-01T02:30');
    await driverLicenseUpdatePage.setClassCodeInput('classCode');
    expect(await driverLicenseUpdatePage.getClassCodeInput()).to.match(/classCode/);
    await driverLicenseUpdatePage.setBirthDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await driverLicenseUpdatePage.getBirthDateInput()).to.contain('2001-01-01T02:30');
    await driverLicenseUpdatePage.setHeightFeetInput('5');
    expect(await driverLicenseUpdatePage.getHeightFeetInput()).to.eq('5');
    await driverLicenseUpdatePage.setHeightInchesInput('5');
    expect(await driverLicenseUpdatePage.getHeightInchesInput()).to.eq('5');
    const selectedActive = await driverLicenseUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await driverLicenseUpdatePage.getActiveInput().click();
      expect(await driverLicenseUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await driverLicenseUpdatePage.getActiveInput().click();
      expect(await driverLicenseUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await driverLicenseUpdatePage.setCreatedByInput('createdBy');
    expect(await driverLicenseUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await driverLicenseUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await driverLicenseUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await driverLicenseUpdatePage.setUpdatedByInput('updatedBy');
    expect(await driverLicenseUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await driverLicenseUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await driverLicenseUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await driverLicenseUpdatePage.addressSelectLastOption();
    await driverLicenseUpdatePage.genderSelectLastOption();
    await driverLicenseUpdatePage.eyeColorSelectLastOption();
    await driverLicenseUpdatePage.hairColorSelectLastOption();
    await driverLicenseUpdatePage.raceSelectLastOption();
    await driverLicenseUpdatePage.issuingStateSelectLastOption();
    await driverLicenseUpdatePage.issuingCountrySelectLastOption();
    await driverLicenseUpdatePage.holderImageSelectLastOption();
    await waitUntilDisplayed(driverLicenseUpdatePage.saveButton);
    await driverLicenseUpdatePage.save();
    await waitUntilHidden(driverLicenseUpdatePage.saveButton);
    expect(await isVisible(driverLicenseUpdatePage.saveButton)).to.be.false;

    expect(await driverLicenseComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverLicenseComponentsPage.table);

    await waitUntilCount(driverLicenseComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverLicenseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last DriverLicense', async () => {
    const deleteButton = driverLicenseComponentsPage.getDeleteButton(driverLicenseComponentsPage.records.last());
    await click(deleteButton);

    driverLicenseDeleteDialog = new DriverLicenseDeleteDialog();
    await waitUntilDisplayed(driverLicenseDeleteDialog.deleteModal);
    expect(await driverLicenseDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.driverLicense.delete.question/);
    await driverLicenseDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverLicenseDeleteDialog.deleteModal);

    expect(await isVisible(driverLicenseDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverLicenseComponentsPage.noRecords, driverLicenseComponentsPage.table]);

    const afterCount = (await isVisible(driverLicenseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(driverLicenseComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
