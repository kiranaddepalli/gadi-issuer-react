import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SuffixComponentsPage, { SuffixDeleteDialog } from './suffix.page-object';
import SuffixUpdatePage from './suffix-update.page-object';
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

describe('Suffix e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let suffixComponentsPage: SuffixComponentsPage;
  let suffixUpdatePage: SuffixUpdatePage;
  let suffixDeleteDialog: SuffixDeleteDialog;
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

  it('should load Suffixes', async () => {
    await navBarPage.getEntityPage('suffix');
    suffixComponentsPage = new SuffixComponentsPage();
    expect(await suffixComponentsPage.title.getText()).to.match(/Suffixes/);

    expect(await suffixComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([suffixComponentsPage.noRecords, suffixComponentsPage.table]);

    beforeRecordsCount = (await isVisible(suffixComponentsPage.noRecords)) ? 0 : await getRecordsCount(suffixComponentsPage.table);
  });

  it('should load create Suffix page', async () => {
    await suffixComponentsPage.createButton.click();
    suffixUpdatePage = new SuffixUpdatePage();
    expect(await suffixUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.suffix.home.createOrEditLabel/);
    await suffixUpdatePage.cancel();
  });

  it('should create and save Suffixes', async () => {
    await suffixComponentsPage.createButton.click();
    await suffixUpdatePage.setNameInput('name');
    expect(await suffixUpdatePage.getNameInput()).to.match(/name/);
    await suffixUpdatePage.setIdentifierInput('identifier');
    expect(await suffixUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await suffixUpdatePage.setOrderValueInput('5');
    expect(await suffixUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await suffixUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await suffixUpdatePage.getDefaultValueInput().click();
      expect(await suffixUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await suffixUpdatePage.getDefaultValueInput().click();
      expect(await suffixUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await suffixUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await suffixUpdatePage.getActiveInput().click();
      expect(await suffixUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await suffixUpdatePage.getActiveInput().click();
      expect(await suffixUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await suffixUpdatePage.setCreatedByInput('createdBy');
    expect(await suffixUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await suffixUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await suffixUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await suffixUpdatePage.setUpdatedByInput('updatedBy');
    expect(await suffixUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await suffixUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await suffixUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(suffixUpdatePage.saveButton);
    await suffixUpdatePage.save();
    await waitUntilHidden(suffixUpdatePage.saveButton);
    expect(await isVisible(suffixUpdatePage.saveButton)).to.be.false;

    expect(await suffixComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(suffixComponentsPage.table);

    await waitUntilCount(suffixComponentsPage.records, beforeRecordsCount + 1);
    expect(await suffixComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Suffix', async () => {
    const deleteButton = suffixComponentsPage.getDeleteButton(suffixComponentsPage.records.last());
    await click(deleteButton);

    suffixDeleteDialog = new SuffixDeleteDialog();
    await waitUntilDisplayed(suffixDeleteDialog.deleteModal);
    expect(await suffixDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.suffix.delete.question/);
    await suffixDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(suffixDeleteDialog.deleteModal);

    expect(await isVisible(suffixDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([suffixComponentsPage.noRecords, suffixComponentsPage.table]);

    const afterCount = (await isVisible(suffixComponentsPage.noRecords)) ? 0 : await getRecordsCount(suffixComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
