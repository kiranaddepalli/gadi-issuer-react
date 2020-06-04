import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import StateComponentsPage, { StateDeleteDialog } from './state.page-object';
import StateUpdatePage from './state-update.page-object';
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

describe('State e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stateComponentsPage: StateComponentsPage;
  let stateUpdatePage: StateUpdatePage;
  let stateDeleteDialog: StateDeleteDialog;
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

  it('should load States', async () => {
    await navBarPage.getEntityPage('state');
    stateComponentsPage = new StateComponentsPage();
    expect(await stateComponentsPage.title.getText()).to.match(/States/);

    expect(await stateComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([stateComponentsPage.noRecords, stateComponentsPage.table]);

    beforeRecordsCount = (await isVisible(stateComponentsPage.noRecords)) ? 0 : await getRecordsCount(stateComponentsPage.table);
  });

  it('should load create State page', async () => {
    await stateComponentsPage.createButton.click();
    stateUpdatePage = new StateUpdatePage();
    expect(await stateUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.state.home.createOrEditLabel/);
    await stateUpdatePage.cancel();
  });

  it('should create and save States', async () => {
    await stateComponentsPage.createButton.click();
    await stateUpdatePage.setNameInput('name');
    expect(await stateUpdatePage.getNameInput()).to.match(/name/);
    await stateUpdatePage.setIdentifierInput('identifier');
    expect(await stateUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await stateUpdatePage.setOrderValueInput('5');
    expect(await stateUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await stateUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await stateUpdatePage.getDefaultValueInput().click();
      expect(await stateUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await stateUpdatePage.getDefaultValueInput().click();
      expect(await stateUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await stateUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await stateUpdatePage.getActiveInput().click();
      expect(await stateUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await stateUpdatePage.getActiveInput().click();
      expect(await stateUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await stateUpdatePage.setCreatedByInput('createdBy');
    expect(await stateUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await stateUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await stateUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await stateUpdatePage.setUpdatedByInput('updatedBy');
    expect(await stateUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await stateUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await stateUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(stateUpdatePage.saveButton);
    await stateUpdatePage.save();
    await waitUntilHidden(stateUpdatePage.saveButton);
    expect(await isVisible(stateUpdatePage.saveButton)).to.be.false;

    expect(await stateComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(stateComponentsPage.table);

    await waitUntilCount(stateComponentsPage.records, beforeRecordsCount + 1);
    expect(await stateComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last State', async () => {
    const deleteButton = stateComponentsPage.getDeleteButton(stateComponentsPage.records.last());
    await click(deleteButton);

    stateDeleteDialog = new StateDeleteDialog();
    await waitUntilDisplayed(stateDeleteDialog.deleteModal);
    expect(await stateDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.state.delete.question/);
    await stateDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(stateDeleteDialog.deleteModal);

    expect(await isVisible(stateDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([stateComponentsPage.noRecords, stateComponentsPage.table]);

    const afterCount = (await isVisible(stateComponentsPage.noRecords)) ? 0 : await getRecordsCount(stateComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
