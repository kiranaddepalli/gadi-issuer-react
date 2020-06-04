import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExperienceComponentsPage, { ExperienceDeleteDialog } from './experience.page-object';
import ExperienceUpdatePage from './experience-update.page-object';
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

describe('Experience e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let experienceComponentsPage: ExperienceComponentsPage;
  let experienceUpdatePage: ExperienceUpdatePage;
  let experienceDeleteDialog: ExperienceDeleteDialog;
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

  it('should load Experiences', async () => {
    await navBarPage.getEntityPage('experience');
    experienceComponentsPage = new ExperienceComponentsPage();
    expect(await experienceComponentsPage.title.getText()).to.match(/Experiences/);

    expect(await experienceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([experienceComponentsPage.noRecords, experienceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(experienceComponentsPage.noRecords)) ? 0 : await getRecordsCount(experienceComponentsPage.table);
  });

  it('should load create Experience page', async () => {
    await experienceComponentsPage.createButton.click();
    experienceUpdatePage = new ExperienceUpdatePage();
    expect(await experienceUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.experience.home.createOrEditLabel/);
    await experienceUpdatePage.cancel();
  });

  it('should create and save Experiences', async () => {
    await experienceComponentsPage.createButton.click();
    await experienceUpdatePage.setNameInput('name');
    expect(await experienceUpdatePage.getNameInput()).to.match(/name/);
    await experienceUpdatePage.setIdentifierInput('identifier');
    expect(await experienceUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await experienceUpdatePage.setIssuerIdentifierInput('issuerIdentifier');
    expect(await experienceUpdatePage.getIssuerIdentifierInput()).to.match(/issuerIdentifier/);
    await experienceUpdatePage.setIssueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getIssueDateInput()).to.contain('2001-01-01T02:30');
    await experienceUpdatePage.setExpirationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getExpirationDateInput()).to.contain('2001-01-01T02:30');
    await experienceUpdatePage.setTitleInput('title');
    expect(await experienceUpdatePage.getTitleInput()).to.match(/title/);
    await experienceUpdatePage.setStartInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getStartInput()).to.contain('2001-01-01T02:30');
    await experienceUpdatePage.setEndInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getEndInput()).to.contain('2001-01-01T02:30');
    const selectedActive = await experienceUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await experienceUpdatePage.getActiveInput().click();
      expect(await experienceUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await experienceUpdatePage.getActiveInput().click();
      expect(await experienceUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await experienceUpdatePage.setCreatedByInput('createdBy');
    expect(await experienceUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await experienceUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await experienceUpdatePage.setUpdatedByInput('updatedBy');
    expect(await experienceUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await experienceUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await experienceUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(experienceUpdatePage.saveButton);
    await experienceUpdatePage.save();
    await waitUntilHidden(experienceUpdatePage.saveButton);
    expect(await isVisible(experienceUpdatePage.saveButton)).to.be.false;

    expect(await experienceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(experienceComponentsPage.table);

    await waitUntilCount(experienceComponentsPage.records, beforeRecordsCount + 1);
    expect(await experienceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Experience', async () => {
    const deleteButton = experienceComponentsPage.getDeleteButton(experienceComponentsPage.records.last());
    await click(deleteButton);

    experienceDeleteDialog = new ExperienceDeleteDialog();
    await waitUntilDisplayed(experienceDeleteDialog.deleteModal);
    expect(await experienceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.experience.delete.question/);
    await experienceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(experienceDeleteDialog.deleteModal);

    expect(await isVisible(experienceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([experienceComponentsPage.noRecords, experienceComponentsPage.table]);

    const afterCount = (await isVisible(experienceComponentsPage.noRecords)) ? 0 : await getRecordsCount(experienceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
