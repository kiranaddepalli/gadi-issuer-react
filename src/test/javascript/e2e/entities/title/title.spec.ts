import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TitleComponentsPage, { TitleDeleteDialog } from './title.page-object';
import TitleUpdatePage from './title-update.page-object';
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

describe('Title e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let titleComponentsPage: TitleComponentsPage;
  let titleUpdatePage: TitleUpdatePage;
  let titleDeleteDialog: TitleDeleteDialog;
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

  it('should load Titles', async () => {
    await navBarPage.getEntityPage('title');
    titleComponentsPage = new TitleComponentsPage();
    expect(await titleComponentsPage.title.getText()).to.match(/Titles/);

    expect(await titleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([titleComponentsPage.noRecords, titleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(titleComponentsPage.noRecords)) ? 0 : await getRecordsCount(titleComponentsPage.table);
  });

  it('should load create Title page', async () => {
    await titleComponentsPage.createButton.click();
    titleUpdatePage = new TitleUpdatePage();
    expect(await titleUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.title.home.createOrEditLabel/);
    await titleUpdatePage.cancel();
  });

  it('should create and save Titles', async () => {
    await titleComponentsPage.createButton.click();
    await titleUpdatePage.setNameInput('name');
    expect(await titleUpdatePage.getNameInput()).to.match(/name/);
    await titleUpdatePage.setIdentifierInput('identifier');
    expect(await titleUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await titleUpdatePage.setOrderValueInput('5');
    expect(await titleUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await titleUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await titleUpdatePage.getDefaultValueInput().click();
      expect(await titleUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await titleUpdatePage.getDefaultValueInput().click();
      expect(await titleUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await titleUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await titleUpdatePage.getActiveInput().click();
      expect(await titleUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await titleUpdatePage.getActiveInput().click();
      expect(await titleUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await titleUpdatePage.setCreatedByInput('createdBy');
    expect(await titleUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await titleUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await titleUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await titleUpdatePage.setUpdatedByInput('updatedBy');
    expect(await titleUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await titleUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await titleUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(titleUpdatePage.saveButton);
    await titleUpdatePage.save();
    await waitUntilHidden(titleUpdatePage.saveButton);
    expect(await isVisible(titleUpdatePage.saveButton)).to.be.false;

    expect(await titleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(titleComponentsPage.table);

    await waitUntilCount(titleComponentsPage.records, beforeRecordsCount + 1);
    expect(await titleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Title', async () => {
    const deleteButton = titleComponentsPage.getDeleteButton(titleComponentsPage.records.last());
    await click(deleteButton);

    titleDeleteDialog = new TitleDeleteDialog();
    await waitUntilDisplayed(titleDeleteDialog.deleteModal);
    expect(await titleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.title.delete.question/);
    await titleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(titleDeleteDialog.deleteModal);

    expect(await isVisible(titleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([titleComponentsPage.noRecords, titleComponentsPage.table]);

    const afterCount = (await isVisible(titleComponentsPage.noRecords)) ? 0 : await getRecordsCount(titleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
