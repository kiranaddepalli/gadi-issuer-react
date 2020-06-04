import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GenderComponentsPage, { GenderDeleteDialog } from './gender.page-object';
import GenderUpdatePage from './gender-update.page-object';
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

describe('Gender e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genderComponentsPage: GenderComponentsPage;
  let genderUpdatePage: GenderUpdatePage;
  let genderDeleteDialog: GenderDeleteDialog;
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

  it('should load Genders', async () => {
    await navBarPage.getEntityPage('gender');
    genderComponentsPage = new GenderComponentsPage();
    expect(await genderComponentsPage.title.getText()).to.match(/Genders/);

    expect(await genderComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([genderComponentsPage.noRecords, genderComponentsPage.table]);

    beforeRecordsCount = (await isVisible(genderComponentsPage.noRecords)) ? 0 : await getRecordsCount(genderComponentsPage.table);
  });

  it('should load create Gender page', async () => {
    await genderComponentsPage.createButton.click();
    genderUpdatePage = new GenderUpdatePage();
    expect(await genderUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.gender.home.createOrEditLabel/);
    await genderUpdatePage.cancel();
  });

  it('should create and save Genders', async () => {
    await genderComponentsPage.createButton.click();
    await genderUpdatePage.setNameInput('name');
    expect(await genderUpdatePage.getNameInput()).to.match(/name/);
    await genderUpdatePage.setIdentifierInput('identifier');
    expect(await genderUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await genderUpdatePage.setOrderValueInput('5');
    expect(await genderUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await genderUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await genderUpdatePage.getDefaultValueInput().click();
      expect(await genderUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await genderUpdatePage.getDefaultValueInput().click();
      expect(await genderUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await genderUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await genderUpdatePage.getActiveInput().click();
      expect(await genderUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await genderUpdatePage.getActiveInput().click();
      expect(await genderUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await genderUpdatePage.setCreatedByInput('createdBy');
    expect(await genderUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await genderUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await genderUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await genderUpdatePage.setUpdatedByInput('updatedBy');
    expect(await genderUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await genderUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await genderUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(genderUpdatePage.saveButton);
    await genderUpdatePage.save();
    await waitUntilHidden(genderUpdatePage.saveButton);
    expect(await isVisible(genderUpdatePage.saveButton)).to.be.false;

    expect(await genderComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(genderComponentsPage.table);

    await waitUntilCount(genderComponentsPage.records, beforeRecordsCount + 1);
    expect(await genderComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Gender', async () => {
    const deleteButton = genderComponentsPage.getDeleteButton(genderComponentsPage.records.last());
    await click(deleteButton);

    genderDeleteDialog = new GenderDeleteDialog();
    await waitUntilDisplayed(genderDeleteDialog.deleteModal);
    expect(await genderDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.gender.delete.question/);
    await genderDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(genderDeleteDialog.deleteModal);

    expect(await isVisible(genderDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([genderComponentsPage.noRecords, genderComponentsPage.table]);

    const afterCount = (await isVisible(genderComponentsPage.noRecords)) ? 0 : await getRecordsCount(genderComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
