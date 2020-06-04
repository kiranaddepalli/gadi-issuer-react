import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PartyRoleComponentsPage, { PartyRoleDeleteDialog } from './party-role.page-object';
import PartyRoleUpdatePage from './party-role-update.page-object';
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

describe('PartyRole e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyRoleComponentsPage: PartyRoleComponentsPage;
  let partyRoleUpdatePage: PartyRoleUpdatePage;
  let partyRoleDeleteDialog: PartyRoleDeleteDialog;
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

  it('should load PartyRoles', async () => {
    await navBarPage.getEntityPage('party-role');
    partyRoleComponentsPage = new PartyRoleComponentsPage();
    expect(await partyRoleComponentsPage.title.getText()).to.match(/Party Roles/);

    expect(await partyRoleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([partyRoleComponentsPage.noRecords, partyRoleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(partyRoleComponentsPage.noRecords)) ? 0 : await getRecordsCount(partyRoleComponentsPage.table);
  });

  it('should load create PartyRole page', async () => {
    await partyRoleComponentsPage.createButton.click();
    partyRoleUpdatePage = new PartyRoleUpdatePage();
    expect(await partyRoleUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.partyRole.home.createOrEditLabel/);
    await partyRoleUpdatePage.cancel();
  });

  it('should create and save PartyRoles', async () => {
    await partyRoleComponentsPage.createButton.click();
    await partyRoleUpdatePage.setNameInput('name');
    expect(await partyRoleUpdatePage.getNameInput()).to.match(/name/);
    await partyRoleUpdatePage.setIdentifierInput('identifier');
    expect(await partyRoleUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await partyRoleUpdatePage.setOrderValueInput('5');
    expect(await partyRoleUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await partyRoleUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await partyRoleUpdatePage.getDefaultValueInput().click();
      expect(await partyRoleUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await partyRoleUpdatePage.getDefaultValueInput().click();
      expect(await partyRoleUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await partyRoleUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await partyRoleUpdatePage.getActiveInput().click();
      expect(await partyRoleUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await partyRoleUpdatePage.getActiveInput().click();
      expect(await partyRoleUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await partyRoleUpdatePage.setCreatedByInput('createdBy');
    expect(await partyRoleUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await partyRoleUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyRoleUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await partyRoleUpdatePage.setUpdatedByInput('updatedBy');
    expect(await partyRoleUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await partyRoleUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyRoleUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(partyRoleUpdatePage.saveButton);
    await partyRoleUpdatePage.save();
    await waitUntilHidden(partyRoleUpdatePage.saveButton);
    expect(await isVisible(partyRoleUpdatePage.saveButton)).to.be.false;

    expect(await partyRoleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(partyRoleComponentsPage.table);

    await waitUntilCount(partyRoleComponentsPage.records, beforeRecordsCount + 1);
    expect(await partyRoleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PartyRole', async () => {
    const deleteButton = partyRoleComponentsPage.getDeleteButton(partyRoleComponentsPage.records.last());
    await click(deleteButton);

    partyRoleDeleteDialog = new PartyRoleDeleteDialog();
    await waitUntilDisplayed(partyRoleDeleteDialog.deleteModal);
    expect(await partyRoleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.partyRole.delete.question/);
    await partyRoleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(partyRoleDeleteDialog.deleteModal);

    expect(await isVisible(partyRoleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([partyRoleComponentsPage.noRecords, partyRoleComponentsPage.table]);

    const afterCount = (await isVisible(partyRoleComponentsPage.noRecords)) ? 0 : await getRecordsCount(partyRoleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
