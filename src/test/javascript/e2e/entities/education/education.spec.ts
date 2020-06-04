import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EducationComponentsPage, { EducationDeleteDialog } from './education.page-object';
import EducationUpdatePage from './education-update.page-object';
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

describe('Education e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let educationComponentsPage: EducationComponentsPage;
  let educationUpdatePage: EducationUpdatePage;
  let educationDeleteDialog: EducationDeleteDialog;
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

  it('should load Educations', async () => {
    await navBarPage.getEntityPage('education');
    educationComponentsPage = new EducationComponentsPage();
    expect(await educationComponentsPage.title.getText()).to.match(/Educations/);

    expect(await educationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([educationComponentsPage.noRecords, educationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(educationComponentsPage.noRecords)) ? 0 : await getRecordsCount(educationComponentsPage.table);
  });

  it('should load create Education page', async () => {
    await educationComponentsPage.createButton.click();
    educationUpdatePage = new EducationUpdatePage();
    expect(await educationUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.education.home.createOrEditLabel/);
    await educationUpdatePage.cancel();
  });

  it('should create and save Educations', async () => {
    await educationComponentsPage.createButton.click();
    await educationUpdatePage.setNameInput('name');
    expect(await educationUpdatePage.getNameInput()).to.match(/name/);
    await educationUpdatePage.setIdentifierInput('identifier');
    expect(await educationUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await educationUpdatePage.setIssuerIdentifierInput('issuerIdentifier');
    expect(await educationUpdatePage.getIssuerIdentifierInput()).to.match(/issuerIdentifier/);
    await educationUpdatePage.setIssueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getIssueDateInput()).to.contain('2001-01-01T02:30');
    await educationUpdatePage.setExpirationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getExpirationDateInput()).to.contain('2001-01-01T02:30');
    const selectedCompleted = await educationUpdatePage.getCompletedInput().isSelected();
    if (selectedCompleted) {
      await educationUpdatePage.getCompletedInput().click();
      expect(await educationUpdatePage.getCompletedInput().isSelected()).to.be.false;
    } else {
      await educationUpdatePage.getCompletedInput().click();
      expect(await educationUpdatePage.getCompletedInput().isSelected()).to.be.true;
    }
    await educationUpdatePage.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getStartInput()).to.contain('2001-01-01T02:30');
    await educationUpdatePage.setEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getEndInput()).to.contain('2001-01-01T02:30');
    const selectedActive = await educationUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await educationUpdatePage.getActiveInput().click();
      expect(await educationUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await educationUpdatePage.getActiveInput().click();
      expect(await educationUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await educationUpdatePage.setCreatedByInput('createdBy');
    expect(await educationUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await educationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await educationUpdatePage.setUpdatedByInput('updatedBy');
    expect(await educationUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await educationUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await educationUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await educationUpdatePage.tenureSelectLastOption();
    await waitUntilDisplayed(educationUpdatePage.saveButton);
    await educationUpdatePage.save();
    await waitUntilHidden(educationUpdatePage.saveButton);
    expect(await isVisible(educationUpdatePage.saveButton)).to.be.false;

    expect(await educationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(educationComponentsPage.table);

    await waitUntilCount(educationComponentsPage.records, beforeRecordsCount + 1);
    expect(await educationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Education', async () => {
    const deleteButton = educationComponentsPage.getDeleteButton(educationComponentsPage.records.last());
    await click(deleteButton);

    educationDeleteDialog = new EducationDeleteDialog();
    await waitUntilDisplayed(educationDeleteDialog.deleteModal);
    expect(await educationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.education.delete.question/);
    await educationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(educationDeleteDialog.deleteModal);

    expect(await isVisible(educationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([educationComponentsPage.noRecords, educationComponentsPage.table]);

    const afterCount = (await isVisible(educationComponentsPage.noRecords)) ? 0 : await getRecordsCount(educationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
