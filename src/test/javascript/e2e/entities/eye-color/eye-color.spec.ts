import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EyeColorComponentsPage, { EyeColorDeleteDialog } from './eye-color.page-object';
import EyeColorUpdatePage from './eye-color-update.page-object';
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

describe('EyeColor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eyeColorComponentsPage: EyeColorComponentsPage;
  let eyeColorUpdatePage: EyeColorUpdatePage;
  let eyeColorDeleteDialog: EyeColorDeleteDialog;
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

  it('should load EyeColors', async () => {
    await navBarPage.getEntityPage('eye-color');
    eyeColorComponentsPage = new EyeColorComponentsPage();
    expect(await eyeColorComponentsPage.title.getText()).to.match(/Eye Colors/);

    expect(await eyeColorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([eyeColorComponentsPage.noRecords, eyeColorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(eyeColorComponentsPage.noRecords)) ? 0 : await getRecordsCount(eyeColorComponentsPage.table);
  });

  it('should load create EyeColor page', async () => {
    await eyeColorComponentsPage.createButton.click();
    eyeColorUpdatePage = new EyeColorUpdatePage();
    expect(await eyeColorUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.eyeColor.home.createOrEditLabel/);
    await eyeColorUpdatePage.cancel();
  });

  it('should create and save EyeColors', async () => {
    await eyeColorComponentsPage.createButton.click();
    await eyeColorUpdatePage.setNameInput('name');
    expect(await eyeColorUpdatePage.getNameInput()).to.match(/name/);
    await eyeColorUpdatePage.setIdentifierInput('identifier');
    expect(await eyeColorUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await eyeColorUpdatePage.setOrderValueInput('5');
    expect(await eyeColorUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await eyeColorUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await eyeColorUpdatePage.getDefaultValueInput().click();
      expect(await eyeColorUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await eyeColorUpdatePage.getDefaultValueInput().click();
      expect(await eyeColorUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await eyeColorUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await eyeColorUpdatePage.getActiveInput().click();
      expect(await eyeColorUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await eyeColorUpdatePage.getActiveInput().click();
      expect(await eyeColorUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await eyeColorUpdatePage.setCreatedByInput('createdBy');
    expect(await eyeColorUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await eyeColorUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eyeColorUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await eyeColorUpdatePage.setUpdatedByInput('updatedBy');
    expect(await eyeColorUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await eyeColorUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await eyeColorUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(eyeColorUpdatePage.saveButton);
    await eyeColorUpdatePage.save();
    await waitUntilHidden(eyeColorUpdatePage.saveButton);
    expect(await isVisible(eyeColorUpdatePage.saveButton)).to.be.false;

    expect(await eyeColorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(eyeColorComponentsPage.table);

    await waitUntilCount(eyeColorComponentsPage.records, beforeRecordsCount + 1);
    expect(await eyeColorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last EyeColor', async () => {
    const deleteButton = eyeColorComponentsPage.getDeleteButton(eyeColorComponentsPage.records.last());
    await click(deleteButton);

    eyeColorDeleteDialog = new EyeColorDeleteDialog();
    await waitUntilDisplayed(eyeColorDeleteDialog.deleteModal);
    expect(await eyeColorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.eyeColor.delete.question/);
    await eyeColorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(eyeColorDeleteDialog.deleteModal);

    expect(await isVisible(eyeColorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([eyeColorComponentsPage.noRecords, eyeColorComponentsPage.table]);

    const afterCount = (await isVisible(eyeColorComponentsPage.noRecords)) ? 0 : await getRecordsCount(eyeColorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
