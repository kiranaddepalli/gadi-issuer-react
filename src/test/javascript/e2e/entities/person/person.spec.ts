import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PersonComponentsPage, { PersonDeleteDialog } from './person.page-object';
import PersonUpdatePage from './person-update.page-object';
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

describe('Person e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let personComponentsPage: PersonComponentsPage;
  let personUpdatePage: PersonUpdatePage;
  let personDeleteDialog: PersonDeleteDialog;
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

  it('should load People', async () => {
    await navBarPage.getEntityPage('person');
    personComponentsPage = new PersonComponentsPage();
    expect(await personComponentsPage.title.getText()).to.match(/People/);

    expect(await personComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([personComponentsPage.noRecords, personComponentsPage.table]);

    beforeRecordsCount = (await isVisible(personComponentsPage.noRecords)) ? 0 : await getRecordsCount(personComponentsPage.table);
  });

  it('should load create Person page', async () => {
    await personComponentsPage.createButton.click();
    personUpdatePage = new PersonUpdatePage();
    expect(await personUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.person.home.createOrEditLabel/);
    await personUpdatePage.cancel();
  });

  it('should create and save People', async () => {
    await personComponentsPage.createButton.click();
    await personUpdatePage.setNameInput('name');
    expect(await personUpdatePage.getNameInput()).to.match(/name/);
    await personUpdatePage.setIdentifierInput('identifier');
    expect(await personUpdatePage.getIdentifierInput()).to.match(/identifier/);
    await personUpdatePage.setFirstNameInput('firstName');
    expect(await personUpdatePage.getFirstNameInput()).to.match(/firstName/);
    await personUpdatePage.setMiddleNameInput('middleName');
    expect(await personUpdatePage.getMiddleNameInput()).to.match(/middleName/);
    await personUpdatePage.setLastNameInput('lastName');
    expect(await personUpdatePage.getLastNameInput()).to.match(/lastName/);
    const selectedActive = await personUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await personUpdatePage.getActiveInput().click();
      expect(await personUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await personUpdatePage.getActiveInput().click();
      expect(await personUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await personUpdatePage.setCreatedByInput('createdBy');
    expect(await personUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await personUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await personUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await personUpdatePage.setUpdatedByInput('updatedBy');
    expect(await personUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await personUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await personUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await personUpdatePage.addressSelectLastOption();
    await personUpdatePage.homePhoneSelectLastOption();
    await personUpdatePage.workPhoneSelectLastOption();
    await personUpdatePage.mobilePhoneSelectLastOption();
    await personUpdatePage.emailSelectLastOption();
    await waitUntilDisplayed(personUpdatePage.saveButton);
    await personUpdatePage.save();
    await waitUntilHidden(personUpdatePage.saveButton);
    expect(await isVisible(personUpdatePage.saveButton)).to.be.false;

    expect(await personComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(personComponentsPage.table);

    await waitUntilCount(personComponentsPage.records, beforeRecordsCount + 1);
    expect(await personComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Person', async () => {
    const deleteButton = personComponentsPage.getDeleteButton(personComponentsPage.records.last());
    await click(deleteButton);

    personDeleteDialog = new PersonDeleteDialog();
    await waitUntilDisplayed(personDeleteDialog.deleteModal);
    expect(await personDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.person.delete.question/);
    await personDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(personDeleteDialog.deleteModal);

    expect(await isVisible(personDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([personComponentsPage.noRecords, personComponentsPage.table]);

    const afterCount = (await isVisible(personComponentsPage.noRecords)) ? 0 : await getRecordsCount(personComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
