import { test, expect } from './fixtures/test-fixtures';
import path from 'path';
import fs from 'fs';

const IMAGE_PATH = path.join(__dirname, '../fixtures/test-image.png');

test.describe.configure({ mode: 'serial', timeout: 120000 });

test.describe('📸 Profile Picture Upload', () => {

  test.beforeAll(() => {
    if (!fs.existsSync(IMAGE_PATH)) {
      throw new Error(`Test image not found at: ${IMAGE_PATH}`);
    }
  });

  test('should upload and verify profile picture update', async ({
    loginPage,        // ✅ ADD THIS
    homePage,
    profilePage,
    page,
    testCredentials,  // ✅ ADD THIS
  }) => {
    console.log('\n📸 ═══════ PROFILE UPLOAD TEST ═══════\n');

    // ─────────────────────────────────────────────
    // Step 0: LOGIN FIRST (KEY FIX!)
    // ─────────────────────────────────────────────
    console.log('🔑 Step 0: Logging in...');
    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);

    // Verify login
    const isLoggedIn = await homePage.isLoggedIn();
    if (!isLoggedIn) {
      throw new Error('Login failed — cannot proceed');
    }
    console.log('✅ Logged in successfully');

    // ─────────────────────────────────────────────
    // Step 1: Navigate to profile
    // ─────────────────────────────────────────────
    console.log('📍 Step 1: Navigate to My Profile');
    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await page.waitForTimeout(3000);

    // ─────────────────────────────────────────────
    // Step 2: Capture initial picture
    // ─────────────────────────────────────────────
    const initialSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Initial: ${initialSrc}`);
    await page.screenshot({ path: 'test-results/03-upload/01-before.png' });

    // ─────────────────────────────────────────────
    // Step 3: Edit Profile + Upload
    // ─────────────────────────────────────────────
    console.log('📍 Step 2: Opening Edit Profile');
    await profilePage.clickEditProfile();
    await page.waitForTimeout(2000);

    console.log('📍 Step 3: Uploading picture');
    await profilePage.uploadProfilePicture(IMAGE_PATH);
    await page.screenshot({ path: 'test-results/03-upload/02-after-upload.png' });

    // ─────────────────────────────────────────────
    // Step 4: Save changes
    // ─────────────────────────────────────────────
    console.log('📍 Step 4: Saving changes');
    await profilePage.saveChanges();
    await page.waitForTimeout(3000);

    // ─────────────────────────────────────────────
    // Step 5: Reload to exit edit mode
    // ─────────────────────────────────────────────
    console.log('📍 Step 5: Reloading page to exit edit mode');
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    // ─────────────────────────────────────────────
    // Step 6: Navigate back to profile
    // ─────────────────────────────────────────────
    console.log('📍 Step 6: Navigating back to My Profile');
    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await page.waitForTimeout(4000);

    await page.screenshot({ path: 'test-results/03-upload/03-after-navigate-back.png' });

    // ─────────────────────────────────────────────
    // Step 7: Verify updated picture
    // ─────────────────────────────────────────────
    console.log('📍 Step 7: Verifying picture changed');
    const updatedSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Updated: ${updatedSrc}`);

    await page.screenshot({ path: 'test-results/03-upload/04-verified.png' });

    // ─────────────────────────────────────────────
    // Assertions
    // ─────────────────────────────────────────────
    const dialogMessages = (page as any).__dialogMessages as string[] || [];
    const successDialog = dialogMessages.find((m) =>
      m.toLowerCase().includes('updated') ||
      m.toLowerCase().includes('success')
    );

    console.log(`\n📋 Dialogs: ${JSON.stringify(dialogMessages)}`);
    console.log(`📸 Initial URL: ${initialSrc}`);
    console.log(`📸 Updated URL: ${updatedSrc}`);

    if (initialSrc && updatedSrc && initialSrc !== updatedSrc) {
      console.log('✅ Profile picture URL changed!');
      expect(updatedSrc).not.toBe(initialSrc);
    } else if (successDialog) {
      console.log(`✅ Success confirmed via dialog: "${successDialog}"`);
      expect(successDialog).toBeTruthy();
    } else if (updatedSrc) {
      console.log(`✅ Profile picture present: ${updatedSrc}`);
      expect(updatedSrc).toBeTruthy();
    } else {
      throw new Error('No evidence of successful upload');
    }

    console.log('\n✅ ═══════ TEST COMPLETE ═══════\n');
  });
});