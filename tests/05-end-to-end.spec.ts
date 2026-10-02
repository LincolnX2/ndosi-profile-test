import { test, expect } from './fixtures/test-fixtures';
import path from 'path';

const IMAGE_PATH = path.join(__dirname, '../fixtures/test-image.png');

test.describe('🎯 End-to-End: Complete Profile Picture Update', () => {

  test('should complete the entire flow: login → navigate → upload → verify', async ({
    loginPage,
    homePage,
    profilePage,
    testCredentials,
    apiValidator,
    reportGenerator,
    page,
  }) => {
    const startTime = Date.now();
    const steps: any[] = [];

    // ─────────────────────────────────────────────
    // Step 1: Navigate
    // ─────────────────────────────────────────────
    console.log('\n🔐 Step 1: Navigate to site');
    await loginPage.goto();
    await page.screenshot({ path: 'test-results/05-e2e/01-login-page.png' });
    steps.push({ name: 'Navigate', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 2: Login
    // ─────────────────────────────────────────────
    console.log('🔑 Step 2: Login');
    await loginPage.login(testCredentials.email, testCredentials.password);
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    await page.screenshot({ path: 'test-results/05-e2e/02-after-login.png' });
    steps.push({ name: 'Login', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 3: Open Menu
    // ─────────────────────────────────────────────
    console.log('📋 Step 3: Open menu');
    await homePage.clickMenu();
    await page.screenshot({ path: 'test-results/05-e2e/03-menu-open.png' });
    steps.push({ name: 'Open Menu', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 4: Navigate to Profile
    // ─────────────────────────────────────────────
    console.log('👤 Step 4: Navigate to profile');
    await homePage.clickMyProfile();
    await page.screenshot({ path: 'test-results/05-e2e/04-profile-page.png' });
    steps.push({ name: 'Navigate to Profile', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 5: Edit Profile
    // ─────────────────────────────────────────────
    console.log('✏️ Step 5: Edit profile');
    await profilePage.clickEditProfile();
    await page.screenshot({ path: 'test-results/05-e2e/05-edit-profile.png' });
    steps.push({ name: 'Edit Profile', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 6: Upload Picture
    // ─────────────────────────────────────────────
    console.log('📤 Step 6: Upload picture');
    const initialSrc = await profilePage.getProfilePictureSrc();
    await profilePage.uploadProfilePicture(IMAGE_PATH);
    await page.screenshot({ path: 'test-results/05-e2e/06-after-upload.png' });
    steps.push({ name: 'Upload Picture', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 7: Verify Update
    // ─────────────────────────────────────────────
    console.log('⏳ Step 7: Verify update');
    await profilePage.waitForProfileUpdate();
    const updatedSrc = await profilePage.getProfilePictureSrc();
    expect(updatedSrc).not.toBe(initialSrc);
    await page.screenshot({ path: 'test-results/05-e2e/07-profile-updated.png' });
    steps.push({ name: 'Verify Update', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 8: Validate APIs
    // ─────────────────────────────────────────────
    console.log('📡 Step 8: Validate APIs');
    const allCalls = apiValidator.getAllApiCalls();
    const validation = apiValidator.validateAllSuccess();

    console.log(`\n📊 API Results:`);
    allCalls.forEach((call, i) => {
      const icon = call.status >= 200 && call.status < 300 ? '✅' : '❌';
      console.log(`  ${i + 1}. ${icon} ${call.method} ${call.url} - ${call.status}`);
    });

    expect(validation.passed).toBeTruthy();
    expect(allCalls.length).toBeGreaterThan(0);
    steps.push({ name: 'Validate APIs', status: 'passed', duration: Date.now() - startTime });

    // ─────────────────────────────────────────────
    // Step 9: Generate Report
    // ─────────────────────────────────────────────
    const reportPath = reportGenerator.generateTestReport({
      timestamp: new Date().toISOString(),
      testName: 'End-to-End Profile Picture Update',
      status: 'passed',
      duration: Date.now() - startTime,
      steps,
      apiCalls: allCalls,
      screenshots: [],
      errors: [],
    });

    console.log(`\n📄 Report saved: ${reportPath}`);
    console.log(`\n📈 Test complete in ${Date.now() - startTime}ms`);
  });
});