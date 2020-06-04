import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ImageContentComponentsPage, { ImageContentDeleteDialog } from './image-content.page-object';
import ImageContentUpdatePage from './image-content-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('ImageContent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageContentComponentsPage: ImageContentComponentsPage;
  let imageContentUpdatePage: ImageContentUpdatePage;
  let imageContentDeleteDialog: ImageContentDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
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

  it('should load ImageContents', async () => {
    await navBarPage.getEntityPage('image-content');
    imageContentComponentsPage = new ImageContentComponentsPage();
    expect(await imageContentComponentsPage.title.getText()).to.match(/Image Contents/);

    expect(await imageContentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([imageContentComponentsPage.noRecords, imageContentComponentsPage.table]);

    beforeRecordsCount = (await isVisible(imageContentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(imageContentComponentsPage.table);
  });

  it('should load create ImageContent page', async () => {
    await imageContentComponentsPage.createButton.click();
    imageContentUpdatePage = new ImageContentUpdatePage();
    expect(await imageContentUpdatePage.getPageTitle().getAttribute('id')).to.match(/gadiApp.imageContent.home.createOrEditLabel/);
    await imageContentUpdatePage.cancel();
  });

  it('should create and save ImageContents', async () => {
    await imageContentComponentsPage.createButton.click();
    await imageContentUpdatePage.setNameInput('name');
    expect(await imageContentUpdatePage.getNameInput()).to.match(/name/);
    const selectedExternal = await imageContentUpdatePage.getExternalInput().isSelected();
    if (selectedExternal) {
      await imageContentUpdatePage.getExternalInput().click();
      expect(await imageContentUpdatePage.getExternalInput().isSelected()).to.be.false;
    } else {
      await imageContentUpdatePage.getExternalInput().click();
      expect(await imageContentUpdatePage.getExternalInput().isSelected()).to.be.true;
    }
    await imageContentUpdatePage.setImageUrlInput('imageUrl');
    expect(await imageContentUpdatePage.getImageUrlInput()).to.match(/imageUrl/);
    await imageContentUpdatePage.setSizeInput('5');
    expect(await imageContentUpdatePage.getSizeInput()).to.eq('5');
    await imageContentUpdatePage.setKeywordsInput('keywords');
    expect(await imageContentUpdatePage.getKeywordsInput()).to.match(/keywords/);
    await imageContentUpdatePage.setContentInput(absolutePath);
    const selectedActive = await imageContentUpdatePage.getActiveInput().isSelected();
    if (selectedActive) {
      await imageContentUpdatePage.getActiveInput().click();
      expect(await imageContentUpdatePage.getActiveInput().isSelected()).to.be.false;
    } else {
      await imageContentUpdatePage.getActiveInput().click();
      expect(await imageContentUpdatePage.getActiveInput().isSelected()).to.be.true;
    }
    await imageContentUpdatePage.setCreatedByInput('createdBy');
    expect(await imageContentUpdatePage.getCreatedByInput()).to.match(/createdBy/);
    await imageContentUpdatePage.setCreatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await imageContentUpdatePage.getCreatedDateInput()).to.contain('2001-01-01T02:30');
    await imageContentUpdatePage.setUpdatedByInput('updatedBy');
    expect(await imageContentUpdatePage.getUpdatedByInput()).to.match(/updatedBy/);
    await imageContentUpdatePage.setUpdatedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await imageContentUpdatePage.getUpdatedDateInput()).to.contain('2001-01-01T02:30');
    await imageContentUpdatePage.imageTypeSelectLastOption();
    await waitUntilDisplayed(imageContentUpdatePage.saveButton);
    await imageContentUpdatePage.save();
    await waitUntilHidden(imageContentUpdatePage.saveButton);
    expect(await isVisible(imageContentUpdatePage.saveButton)).to.be.false;

    expect(await imageContentComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(imageContentComponentsPage.table);

    await waitUntilCount(imageContentComponentsPage.records, beforeRecordsCount + 1);
    expect(await imageContentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last ImageContent', async () => {
    const deleteButton = imageContentComponentsPage.getDeleteButton(imageContentComponentsPage.records.last());
    await click(deleteButton);

    imageContentDeleteDialog = new ImageContentDeleteDialog();
    await waitUntilDisplayed(imageContentDeleteDialog.deleteModal);
    expect(await imageContentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gadiApp.imageContent.delete.question/);
    await imageContentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(imageContentDeleteDialog.deleteModal);

    expect(await isVisible(imageContentDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([imageContentComponentsPage.noRecords, imageContentComponentsPage.table]);

    const afterCount = (await isVisible(imageContentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(imageContentComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
