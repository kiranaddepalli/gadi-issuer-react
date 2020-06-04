import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import OrganizationComponentsPage, { OrganizationDeleteDialog } from './organization.page-object';
import OrganizationUpdatePage from './organization-update.page-object';
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

describe('Organization e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let organizationComponentsPage: OrganizationComponentsPage;
  let organizationUpdatePage: OrganizationUpdatePage;
  let organizationDeleteDialog: OrganizationDeleteDialog;
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

  it('should load Organizations', async () => {
    await navBarPage.getEntityPage('organization');
    organizationComponentsPage = new OrganizationComponentsPage();
    expect(await organizationComponentsPage.title.getText()).to.match(/Organizations/);

    expect(await organizationComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([organizationComponentsPage.noRecords, organizationComponentsPage.table]);

    beforeRecordsCount = (await isVisible(organizationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(organizationComponentsPage.table);
  });

  it('should load create Organization page', async () => {
    await organizationComponentsPage.createButton.click();
    organizationUpdatePage = new OrganizationUpdatePage();
    expect(await organizationUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.organization.home.createOrEditLabel/);
    await organizationUpdatePage.cancel();
  });

  it('should create and save Organizations', async () => {
    await organizationComponentsPage.createButton.click();
    await organizationUpdatePage.setNameInput('name');
    expect(await organizationUpdatePage.getNameInput()).to.match(/name/);
    await organizationUpdatePage.setIdentifierInput('identifier');
    expect(await organizationUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await organizationUpdatePage.setBusinessNameInput('businessName');
    expect(await organizationUpdatePage.getBusinessNameInput()).to.match(/businessName/);
    await organizationUpdatePage.setDbaNameInput('dbaName');
    expect(await organizationUpdatePage.getDbaNameInput()).to.match(/dbaName/);
    await organizationUpdatePage.setFeinInput('fein');
    expect(await organizationUpdatePage.getFeinInput()).to.match(/fein/);
    await organizationUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await organizationUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
    const selectedActive = await organizationUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await organizationUpdatePage.getActiveInput().click();
      expect(await organizationUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await organizationUpdatePage.getActiveInput().click();
      expect(await organizationUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await organizationUpdatePage.setCreatedByInput('createdBy');
    expect(await organizationUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await organizationUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await organizationUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await organizationUpdatePage.setUpdatedByInput('updatedBy');
    expect(await organizationUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await organizationUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await organizationUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await organizationUpdatePage.partyRoleSelectLastOption();
    await organizationUpdatePage.incorporatedStateSelectLastOption();
    await organizationUpdatePage.countrySelectLastOption();
    await organizationUpdatePage.addressSelectLastOption();
    await organizationUpdatePage.mainPhoneSelectLastOption();
    await organizationUpdatePage.secondaryPhoneSelectLastOption();
    await waitUntilDisplayed(organizationUpdatePage.saveButton);
    await organizationUpdatePage.save();
    await waitUntilHidden(organizationUpdatePage.saveButton);
    expect(await isVisible(organizationUpdatePage.saveButton)).to.be.false;

    expect(await organizationComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(organizationComponentsPage.table);

    await waitUntilCount(organizationComponentsPage.records, beforeRecordsCount + 1);
    expect(await organizationComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Organization', async () => {
    const deleteButton = organizationComponentsPage.getDeleteButton(organizationComponentsPage.records.last());
    await click(deleteButton);

    organizationDeleteDialog = new OrganizationDeleteDialog();
    await waitUntilDisplayed(organizationDeleteDialog.deleteModal);
    expect(await organizationDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.organization.delete.question/);
    await organizationDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(organizationDeleteDialog.deleteModal);

    expect(await isVisible(organizationDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([organizationComponentsPage.noRecords, organizationComponentsPage.table]);

    const afterCount = (await isVisible(organizationComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(organizationComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
