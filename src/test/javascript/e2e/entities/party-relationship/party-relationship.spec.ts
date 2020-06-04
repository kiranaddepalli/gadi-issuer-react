import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PartyRelationshipComponentsPage, { PartyRelationshipDeleteDialog } from './party-relationship.page-object';
import PartyRelationshipUpdatePage from './party-relationship-update.page-object';
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

describe('PartyRelationship e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyRelationshipComponentsPage: PartyRelationshipComponentsPage;
  let partyRelationshipUpdatePage: PartyRelationshipUpdatePage;
  let partyRelationshipDeleteDialog: PartyRelationshipDeleteDialog;
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

  it('should load PartyRelationships', async () => {
    await navBarPage.getEntityPage('party-relationship');
    partyRelationshipComponentsPage = new PartyRelationshipComponentsPage();
    expect(await partyRelationshipComponentsPage.title.getText()).to.match(/Party Relationships/);

    expect(await partyRelationshipComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([partyRelationshipComponentsPage.noRecords, partyRelationshipComponentsPage.table]);

    beforeRecordsCount = (await isVisible(partyRelationshipComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(partyRelationshipComponentsPage.table);
  });

  it('should load create PartyRelationship page', async () => {
    await partyRelationshipComponentsPage.createButton.click();
    partyRelationshipUpdatePage = new PartyRelationshipUpdatePage();
    expect(await partyRelationshipUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /gadiApp.partyRelationship.home.createOrEditLabel/
    );
    await partyRelationshipUpdatePage.cancel();
  });

  it('should create and save PartyRelationships', async () => {
    await partyRelationshipComponentsPage.createButton.click();
    await partyRelationshipUpdatePage.setFromPartyInput('5');
    expect(await partyRelationshipUpdatePage.getFromPartyInput()).to.eq('5');
    await partyRelationshipUpdatePage.setToPartyInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyRelationshipUpdatePage.getToPartyInput()).to.contain('2001-01-01T02:30');
    await partyRelationshipUpdatePage.setFromDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await partyRelationshipUpdatePage.getFromDateInput()).to.contain('2001-01-01T02:30');
    await partyRelationshipUpdatePage.partyRoleSelectLastOption();
    await partyRelationshipUpdatePage.fromPartyTypeSelectLastOption();
    await partyRelationshipUpdatePage.toPartyTypeSelectLastOption();
    await waitUntilDisplayed(partyRelationshipUpdatePage.saveButton);
    await partyRelationshipUpdatePage.save();
    await waitUntilHidden(partyRelationshipUpdatePage.saveButton);
    expect(await isVisible(partyRelationshipUpdatePage.saveButton)).to.be.false;

    expect(await partyRelationshipComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(partyRelationshipComponentsPage.table);

    await waitUntilCount(partyRelationshipComponentsPage.records, beforeRecordsCount + 1);
    expect(await partyRelationshipComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last PartyRelationship', async () => {
    const deleteButton = partyRelationshipComponentsPage.getDeleteButton(partyRelationshipComponentsPage.records.last());
    await click(deleteButton);

    partyRelationshipDeleteDialog = new PartyRelationshipDeleteDialog();
    await waitUntilDisplayed(partyRelationshipDeleteDialog.deleteModal);
    expect(await partyRelationshipDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.partyRelationship.delete.question/);
    await partyRelationshipDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(partyRelationshipDeleteDialog.deleteModal);

    expect(await isVisible(partyRelationshipDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([partyRelationshipComponentsPage.noRecords, partyRelationshipComponentsPage.table]);

    const afterCount = (await isVisible(partyRelationshipComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(partyRelationshipComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
