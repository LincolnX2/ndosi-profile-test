import { test, expect } from './fixtures/test-fixtures';
import path from 'path';
import fs from 'fs';

const IMAGE_PATH = path.join(__dirname, '../fixtures/test-image.png');

test.describe('📸 Profile Picture Upload', () => {

  test.beforeAll(() => {
    if (!fs.existsSync(IMAGE_PATH)) {
      throw new Error(`Test image not found at: ${IMAGE_PATH}`);
    }
  });

  test('should open edit profile form', async ({
    authenticatedPage,
    homePage,
    profilePage,
    page,
  }) => {
    console.log('📸 Test: Open edit profile form');

    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await profilePage.clickEditProfile();

    await page.screenshot({ path: 'test-results/03-upload/01-edit-form.png' });

    console.log('✅ Edit profile form opened');
  });

  test('should successfully upload a new profile picture', async ({
    authenticatedPage,
    homePage,
    profilePage,
    page,
  }) => {
    console.log('📸 Test: Upload new profile picture');

    // Navigate to edit profile
    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await profilePage.clickEditProfile();

    // Capture initial state
    const initialSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Initial picture: ${initialSrc}`);

    // Upload new picture
    await profilePage.uploadProfilePicture(IMAGE_PATH);
    await page.screenshot({ path: 'test-results/03-upload/02-after-upload.png' });

    // Wait for update
    await profilePage.waitForProfileUpdate();

    // Verify picture changed
    const updatedSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Updated picture: ${updatedSrc}`);

    expect(updatedSrc).not.toBe(initialSrc);

    await page.screenshot({ path: 'test-results/03-upload/03-verified.png' });

    console.log('✅ Profile picture uploaded successfully');
  });

  test('should display success message after upload', async ({
    authenticatedPage,
    homePage,
    profilePage,
    page,
  }) => {
    console.log('📸 Test: Verify success message');

    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await profilePage.clickEditProfile();
    await profilePage.uploadProfilePicture(IMAGE_PATH);

    // Wait for update and check
    await profilePage.waitForProfileUpdate();
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'test-results/03-upload/04-success.png' });

    console.log('✅ Upload flow completed');
  });
});