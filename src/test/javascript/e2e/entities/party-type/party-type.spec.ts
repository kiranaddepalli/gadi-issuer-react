import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PartyTypeComponentsPage, { PartyTypeDeleteDialog } from './party-type.page-object';
import PartyTypeUpdatePage from './party-type-update.page-object';
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

describe('PartyType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyTypeComponentsPage: PartyTypeComponentsPage;
  let partyTypeUpdatePage: PartyTypeUpdatePage;
  let partyTypeDeleteDialog: PartyTypeDeleteDialog;
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

  it('should load PartyTypes', async () => {
    await navBarPage.getEntityPage('party-type');
    partyTypeComponentsPage = new PartyTypeComponentsPage();
    expect(await partyTypeComponentsPage.title.getText()).to.match(/Party Types/);

    expect(await partyTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([partyTypeComponentsPage.noRecords, partyTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(partyTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(partyTypeComponentsPage.table);
  });

  it('should load create PartyType page', async () => {
    await partyTypeComponentsPage.createButton.click();
    partyTypeUpdatePage = new PartyTypeUpdatePage();
    expect(await partyTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.partyType.home.createOrEditLabel/);
    await partyTypeUpdatePage.cancel();
  });

  it('should create and save PartyTypes', async () => {
    await partyTypeComponentsPage.createButton.click();
    await partyTypeUpdatePage.setNameInput('name');
    expect(await partyTypeUpdatePage.getNameInput()).to.match(/name/);
    await partyTypeUpdatePage.setIdentifierInput('identifier');
    expect(await partyTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await partyTypeUpdatePage.setOrderValueInput('5');
    expect(await partyTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await partyTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await partyTypeUpdatePage.getDefaultValueInput().click();
      expect(await partyTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await partyTypeUpdatePage.getDefaultValueInput().click();
      expect(await partyTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await partyTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await partyTypeUpdatePage.getActiveInput().click();
      expect(await partyTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await partyTypeUpdatePage.getActiveInput().click();
      expect(await partyTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await partyTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await partyTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await partyTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await partyTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await partyTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await partyTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(partyTypeUpdatePage.saveButton);
    await partyTypeUpdatePage.save();
    await waitUntilHidden(partyTypeUpdatePage.saveButton);
    expect(await isVisible(partyTypeUpdatePage.saveButton)).to.be.false;

    expect(await partyTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(partyTypeComponentsPage.table);

    await waitUntilCount(partyTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await partyTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PartyType', async () => {
    const deleteButton = partyTypeComponentsPage.getDeleteButton(partyTypeComponentsPage.records.last());
    await click(deleteButton);

    partyTypeDeleteDialog = new PartyTypeDeleteDialog();
    await waitUntilDisplayed(partyTypeDeleteDialog.deleteModal);
    expect(await partyTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.partyType.delete.question/);
    await partyTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(partyTypeDeleteDialog.deleteModal);

    expect(await isVisible(partyTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([partyTypeComponentsPage.noRecords, partyTypeComponentsPage.table]);

    const afterCount = (await isVisible(partyTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(partyTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
