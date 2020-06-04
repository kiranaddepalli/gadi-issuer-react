import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import HairColorComponentsPage, { HairColorDeleteDialog } from './hair-color.page-object';
import HairColorUpdatePage from './hair-color-update.page-object';
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

describe('HairColor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let hairColorComponentsPage: HairColorComponentsPage;
  let hairColorUpdatePage: HairColorUpdatePage;
  let hairColorDeleteDialog: HairColorDeleteDialog;
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

  it('should load HairColors', async () => {
    await navBarPage.getEntityPage('hair-color');
    hairColorComponentsPage = new HairColorComponentsPage();
    expect(await hairColorComponentsPage.title.getText()).to.match(/Hair Colors/);

    expect(await hairColorComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([hairColorComponentsPage.noRecords, hairColorComponentsPage.table]);

    beforeRecordsCount = (await isVisible(hairColorComponentsPage.noRecords)) ? 0 : await getRecordsCount(hairColorComponentsPage.table);
  });

  it('should load create HairColor page', async () => {
    await hairColorComponentsPage.createButton.click();
    hairColorUpdatePage = new HairColorUpdatePage();
    expect(await hairColorUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.hairColor.home.createOrEditLabel/);
    await hairColorUpdatePage.cancel();
  });

  it('should create and save HairColors', async () => {
    await hairColorComponentsPage.createButton.click();
    await hairColorUpdatePage.setNameInput('name');
    expect(await hairColorUpdatePage.getNameInput()).to.match(/name/);
    await hairColorUpdatePage.setIdentifierInput('identifier');
    expect(await hairColorUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await hairColorUpdatePage.setOrderValueInput('5');
    expect(await hairColorUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await hairColorUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await hairColorUpdatePage.getDefaultValueInput().click();
      expect(await hairColorUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await hairColorUpdatePage.getDefaultValueInput().click();
      expect(await hairColorUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await hairColorUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await hairColorUpdatePage.getActiveInput().click();
      expect(await hairColorUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await hairColorUpdatePage.getActiveInput().click();
      expect(await hairColorUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await hairColorUpdatePage.setCreatedByInput('createdBy');
    expect(await hairColorUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await hairColorUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await hairColorUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await hairColorUpdatePage.setUpdatedByInput('updatedBy');
    expect(await hairColorUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await hairColorUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await hairColorUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(hairColorUpdatePage.saveButton);
    await hairColorUpdatePage.save();
    await waitUntilHidden(hairColorUpdatePage.saveButton);
    expect(await isVisible(hairColorUpdatePage.saveButton)).to.be.false;

    expect(await hairColorComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(hairColorComponentsPage.table);

    await waitUntilCount(hairColorComponentsPage.records, beforeRecordsCount + 1);
    expect(await hairColorComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last HairColor', async () => {
    const deleteButton = hairColorComponentsPage.getDeleteButton(hairColorComponentsPage.records.last());
    await click(deleteButton);

    hairColorDeleteDialog = new HairColorDeleteDialog();
    await waitUntilDisplayed(hairColorDeleteDialog.deleteModal);
    expect(await hairColorDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.hairColor.delete.question/);
    await hairColorDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(hairColorDeleteDialog.deleteModal);

    expect(await isVisible(hairColorDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([hairColorComponentsPage.noRecords, hairColorComponentsPage.table]);

    const afterCount = (await isVisible(hairColorComponentsPage.noRecords)) ? 0 : await getRecordsCount(hairColorComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
