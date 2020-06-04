import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RaceComponentsPage, { RaceDeleteDialog } from './race.page-object';
import RaceUpdatePage from './race-update.page-object';
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

describe('Race e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let raceComponentsPage: RaceComponentsPage;
  let raceUpdatePage: RaceUpdatePage;
  let raceDeleteDialog: RaceDeleteDialog;
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

  it('should load Races', async () => {
    await navBarPage.getEntityPage('race');
    raceComponentsPage = new RaceComponentsPage();
    expect(await raceComponentsPage.title.getText()).to.match(/Races/);

    expect(await raceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([raceComponentsPage.noRecords, raceComponentsPage.table]);

    beforeRecordsCount = (await isVisible(raceComponentsPage.noRecords)) ? 0 : await getRecordsCount(raceComponentsPage.table);
  });

  it('should load create Race page', async () => {
    await raceComponentsPage.createButton.click();
    raceUpdatePage = new RaceUpdatePage();
    expect(await raceUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.race.home.createOrEditLabel/);
    await raceUpdatePage.cancel();
  });

  it('should create and save Races', async () => {
    await raceComponentsPage.createButton.click();
    await raceUpdatePage.setNameInput('name');
    expect(await raceUpdatePage.getNameInput()).to.match(/name/);
    await raceUpdatePage.setIdentifierInput('identifier');
    expect(await raceUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await raceUpdatePage.setOrderValueInput('5');
    expect(await raceUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await raceUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await raceUpdatePage.getDefaultValueInput().click();
      expect(await raceUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await raceUpdatePage.getDefaultValueInput().click();
      expect(await raceUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await raceUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await raceUpdatePage.getActiveInput().click();
      expect(await raceUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await raceUpdatePage.getActiveInput().click();
      expect(await raceUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await raceUpdatePage.setCreatedByInput('createdBy');
    expect(await raceUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await raceUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await raceUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await raceUpdatePage.setUpdatedByInput('updatedBy');
    expect(await raceUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await raceUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await raceUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(raceUpdatePage.saveButton);
    await raceUpdatePage.save();
    await waitUntilHidden(raceUpdatePage.saveButton);
    expect(await isVisible(raceUpdatePage.saveButton)).to.be.false;

    expect(await raceComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(raceComponentsPage.table);

    await waitUntilCount(raceComponentsPage.records, beforeRecordsCount + 1);
    expect(await raceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Race', async () => {
    const deleteButton = raceComponentsPage.getDeleteButton(raceComponentsPage.records.last());
    await click(deleteButton);

    raceDeleteDialog = new RaceDeleteDialog();
    await waitUntilDisplayed(raceDeleteDialog.deleteModal);
    expect(await raceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.race.delete.question/);
    await raceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(raceDeleteDialog.deleteModal);

    expect(await isVisible(raceDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([raceComponentsPage.noRecords, raceComponentsPage.table]);

    const afterCount = (await isVisible(raceComponentsPage.noRecords)) ? 0 : await getRecordsCount(raceComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
