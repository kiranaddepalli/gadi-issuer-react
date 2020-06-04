import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CredentialTypeComponentsPage, { CredentialTypeDeleteDialog } from './credential-type.page-object';
import CredentialTypeUpdatePage from './credential-type-update.page-object';
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

describe('CredentialType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let credentialTypeComponentsPage: CredentialTypeComponentsPage;
  let credentialTypeUpdatePage: CredentialTypeUpdatePage;
  let credentialTypeDeleteDialog: CredentialTypeDeleteDialog;
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

  it('should load CredentialTypes', async () => {
    await navBarPage.getEntityPage('credential-type');
    credentialTypeComponentsPage = new CredentialTypeComponentsPage();
    expect(await credentialTypeComponentsPage.title.getText()).to.match(/Credential Types/);

    expect(await credentialTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([credentialTypeComponentsPage.noRecords, credentialTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(credentialTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(credentialTypeComponentsPage.table);
  });

  it('should load create CredentialType page', async () => {
    await credentialTypeComponentsPage.createButton.click();
    credentialTypeUpdatePage = new CredentialTypeUpdatePage();
    expect(await credentialTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.credentialType.home.createOrEditLabel/);
    await credentialTypeUpdatePage.cancel();
  });

  it('should create and save CredentialTypes', async () => {
    await credentialTypeComponentsPage.createButton.click();
    await credentialTypeUpdatePage.setNameInput('name');
    expect(await credentialTypeUpdatePage.getNameInput()).to.match(/name/);
    await credentialTypeUpdatePage.setIdentifierInput('identifier');
    expect(await credentialTypeUpdatePage.getIdentifierInput()).to.match(/identifier/);
    const selectedActive = await credentialTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await credentialTypeUpdatePage.getActiveInput().click();
      expect(await credentialTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await credentialTypeUpdatePage.getActiveInput().click();
      expect(await credentialTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await credentialTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await credentialTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await credentialTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await credentialTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await credentialTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await credentialTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await credentialTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await credentialTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(credentialTypeUpdatePage.saveButton);
    await credentialTypeUpdatePage.save();
    await waitUntilHidden(credentialTypeUpdatePage.saveButton);
    expect(await isVisible(credentialTypeUpdatePage.saveButton)).to.be.false;

    expect(await credentialTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(credentialTypeComponentsPage.table);

    await waitUntilCount(credentialTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await credentialTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last CredentialType', async () => {
    const deleteButton = credentialTypeComponentsPage.getDeleteButton(credentialTypeComponentsPage.records.last());
    await click(deleteButton);

    credentialTypeDeleteDialog = new CredentialTypeDeleteDialog();
    await waitUntilDisplayed(credentialTypeDeleteDialog.deleteModal);
    expect(await credentialTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.credentialType.delete.question/);
    await credentialTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(credentialTypeDeleteDialog.deleteModal);

    expect(await isVisible(credentialTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([credentialTypeComponentsPage.noRecords, credentialTypeComponentsPage.table]);

    const afterCount = (await isVisible(credentialTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(credentialTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
