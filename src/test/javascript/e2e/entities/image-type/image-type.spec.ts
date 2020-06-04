import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImageTypeComponentsPage, { ImageTypeDeleteDialog } from './image-type.page-object';
import ImageTypeUpdatePage from './image-type-update.page-object';
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

describe('ImageType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageTypeComponentsPage: ImageTypeComponentsPage;
  let imageTypeUpdatePage: ImageTypeUpdatePage;
  let imageTypeDeleteDialog: ImageTypeDeleteDialog;
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

  it('should load ImageTypes', async () => {
    await navBarPage.getEntityPage('image-type');
    imageTypeComponentsPage = new ImageTypeComponentsPage();
    expect(await imageTypeComponentsPage.title.getText()).to.match(/Image Types/);

    expect(await imageTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([imageTypeComponentsPage.noRecords, imageTypeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(imageTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(imageTypeComponentsPage.table);
  });

  it('should load create ImageType page', async () => {
    await imageTypeComponentsPage.createButton.click();
    imageTypeUpdatePage = new ImageTypeUpdatePage();
    expect(await imageTypeUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.imageType.home.createOrEditLabel/);
    await imageTypeUpdatePage.cancel();
  });

  it('should create and save ImageTypes', async () => {
    await imageTypeComponentsPage.createButton.click();
    await imageTypeUpdatePage.setNameInput('name');
    expect(await imageTypeUpdatePage.getNameInput()).to.match(/name/);
    await imageTypeUpdatePage.setMimeTypeInput('mimeType');
    expect(await imageTypeUpdatePage.getMimeTypeInput()).to.match(/mimeType/);
    await imageTypeUpdatePage.setOrderValueInput('5');
    expect(await imageTypeUpdatePage.getOrderValueInput()).to.eq('5');
    const selectedDefaultValue = await imageTypeUpdatePage.getDefaultValueInput().isSelected();
    if (selectedDefaultValue) {
      await imageTypeUpdatePage.getDefaultValueInput().click();
      expect(await imageTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.false;
    } else {
      await imageTypeUpdatePage.getDefaultValueInput().click();
      expect(await imageTypeUpdatePage.getDefaultValueInput().isSelected()).to.be.true;
    }
    const selectedActive = await imageTypeUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await imageTypeUpdatePage.getActiveInput().click();
      expect(await imageTypeUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await imageTypeUpdatePage.getActiveInput().click();
      expect(await imageTypeUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await imageTypeUpdatePage.setCreatedByInput('createdBy');
    expect(await imageTypeUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await imageTypeUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await imageTypeUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await imageTypeUpdatePage.setUpdatedByInput('updatedBy');
    expect(await imageTypeUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await imageTypeUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await imageTypeUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(imageTypeUpdatePage.saveButton);
    await imageTypeUpdatePage.save();
    await waitUntilHidden(imageTypeUpdatePage.saveButton);
    expect(await isVisible(imageTypeUpdatePage.saveButton)).to.be.false;

    expect(await imageTypeComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(imageTypeComponentsPage.table);

    await waitUntilCount(imageTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await imageTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ImageType', async () => {
    const deleteButton = imageTypeComponentsPage.getDeleteButton(imageTypeComponentsPage.records.last());
    await click(deleteButton);

    imageTypeDeleteDialog = new ImageTypeDeleteDialog();
    await waitUntilDisplayed(imageTypeDeleteDialog.deleteModal);
    expect(await imageTypeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.imageType.delete.question/);
    await imageTypeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(imageTypeDeleteDialog.deleteModal);

    expect(await isVisible(imageTypeDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([imageTypeComponentsPage.noRecords, imageTypeComponentsPage.table]);

    const afterCount = (await isVisible(imageTypeComponentsPage.noRecords)) ? 0 : await getRecordsCount(imageTypeComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
