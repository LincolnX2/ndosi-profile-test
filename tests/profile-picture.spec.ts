import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProfilePage } from '../src/pages/ProfilePage';
import { ApiValidator } from '../src/utils/api-validator';
import { ReportGenerator, TestStep } from '../src/utils/report-generator';
import { environment } from '../config/environment.config';
import path from 'path';
import fs from 'fs';

const TEST_EMAIL = environment.testEmail;
const TEST_PASSWORD = environment.testPassword;

test.describe('Ndosi Profile Picture Update Flow', () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;
  let apiValidator: ApiValidator;
  let reportGenerator: ReportGenerator;
  let testSteps: TestStep[] = [];
  let startTime: number;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    apiValidator = new ApiValidator();
    reportGenerator = new ReportGenerator();
    testSteps = [];
    startTime = Date.now();

    // Capture all API calls made during the test
    page.on('response', async (response) => {
      const url = response.url();
      if (
        url.includes('/api/') ||
        url.includes('/profile/') ||
        url.includes('/user/') ||
        url.includes('/upload') ||
        url.includes('/image') ||
        url.includes('/media')
      ) {
        apiValidator.addApiCall({
          url: url,
          method: response.request().method(),
          status: response.status(),
          timestamp: new Date().toISOString(),
          duration: 0,
        });
        console.log(`📡 API: ${response.request().method()} ${url} - Status: ${response.status()}`);
      }
    });

    // Log browser console messages for debugging
    page.on('console', (msg) => {
      console.log(`🌐 Browser Console: ${msg.text()}`);
    });
  });

  test('should upload profile picture and validate APIs', async ({ page }) => {
    // ═══════════════════════════════════════════════════════════
    // Step 1: Navigate to the Ndosi practice page
    // ═══════════════════════════════════════════════════════════
    console.log('\n🔐 Step 1: Navigating to Ndosi site...');
    await loginPage.goto();
    await page.screenshot({ path: 'test-results/01-login-page.png' });
    testSteps.push({
      name: 'Navigate to login page',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '01-login-page.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 2: Login with credentials
    // ═══════════════════════════════════════════════════════════
    console.log(`🔑 Step 2: Logging in as ${TEST_EMAIL}...`);
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
    await page.screenshot({ path: 'test-results/02-after-login.png' });

    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
    console.log('✅ Login successful');

    testSteps.push({
      name: 'Login to application',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '02-after-login.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 3: Click the menu button
    // ═══════════════════════════════════════════════════════════
    console.log('📋 Step 3: Opening menu...');
    await profilePage.clickMenu();
    await page.screenshot({ path: 'test-results/03-menu-open.png' });
    testSteps.push({
      name: 'Open menu',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '03-menu-open.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 4: Navigate to My Profile
    // ═══════════════════════════════════════════════════════════
    console.log('👤 Step 4: Navigating to My Profile...');
    await profilePage.clickMyProfile();
    await page.screenshot({ path: 'test-results/04-profile-page.png' });
    testSteps.push({
      name: 'Navigate to My Profile',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '04-profile-page.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 5: Click Edit Profile
    // ═══════════════════════════════════════════════════════════
    console.log('✏️ Step 5: Opening Edit Profile...');
    await profilePage.clickEditProfile();
    await page.screenshot({ path: 'test-results/05-edit-profile.png' });
    testSteps.push({
      name: 'Click Edit Profile',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '05-edit-profile.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 6: Upload a new profile picture
    // ═══════════════════════════════════════════════════════════
    console.log('📤 Step 6: Uploading profile picture...');

    // Get the initial profile picture source
    const initialSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Initial profile picture: ${initialSrc}`);

    // Path to the test image
    const imagePath = path.join(__dirname, '../fixtures/test-image.png');

    // Verify image exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Test image not found at: ${imagePath}`);
    }

    // Upload the picture
    await profilePage.uploadProfilePicture(imagePath);
    await page.screenshot({ path: 'test-results/06-after-upload.png' });
    testSteps.push({
      name: 'Upload profile picture',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '06-after-upload.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 7: Verify profile picture was updated
    // ═══════════════════════════════════════════════════════════
    console.log('⏳ Step 7: Verifying profile update...');
    await profilePage.waitForProfileUpdate();

    const updatedSrc = await profilePage.getProfilePictureSrc();
    console.log(`📸 Updated profile picture: ${updatedSrc}`);

    // Verify the image source changed
    expect(updatedSrc).not.toBe(initialSrc);
    console.log('✅ Profile picture updated successfully');

    await page.screenshot({ path: 'test-results/07-profile-updated.png' });
    testSteps.push({
      name: 'Verify profile picture updated',
      status: 'passed',
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
      screenshot: '07-profile-updated.png',
    });

    // ═══════════════════════════════════════════════════════════
    // Step 8: Validate all API responses
    // ═══════════════════════════════════════════════════════════
    console.log('\n📊 ═══════ API VALIDATION RESULTS ═══════');

    const allApiCalls = apiValidator.getAllApiCalls();
    const uniqueEndpoints = apiValidator.getUniqueEndpoints();

    console.log(`📡 Total API calls captured: ${allApiCalls.length}`);
    console.log(`📋 Unique endpoints: ${uniqueEndpoints.length}\n`);

    // Log each API call
    console.log('📝 All API Calls:');
    allApiCalls.forEach((call, index) => {
      const statusIcon = call.status >= 200 && call.status < 300 ? '✅' : '❌';
      console.log(`  ${index + 1}. ${statusIcon} ${call.method} ${call.url} - Status: ${call.status}`);
    });

    // Log unique endpoints
    console.log('\n📋 Unique Endpoints:');
    uniqueEndpoints.forEach((endpoint, index) => {
      const calls = allApiCalls.filter((call) => call.url.includes(endpoint));
      const statuses = [...new Set(calls.map((c) => c.status))];
      console.log(`  ${index + 1}. ${endpoint} - Statuses: ${statuses.join(', ')} (${calls.length} calls)`);
    });

    // Validate all API calls were successful
    const validation = apiValidator.validateAllSuccess();

    if (validation.failed.length > 0) {
      console.log('\n⚠️ Failed API Calls:');
      validation.failed.forEach((call) => {
        console.log(`  ❌ ${call.method} ${call.url} - Status: ${call.status}`);
      });
    }

    // Assert that all API calls succeeded (2xx status codes)
    expect(validation.passed, `Found ${validation.failed.length} failed API calls`).toBeTruthy();

    // At least one API call should have been made
    expect(allApiCalls.length, 'No API calls were captured').toBeGreaterThan(0);

    console.log('\n✅ All API calls validated successfully!');

    // ═══════════════════════════════════════════════════════════
    // Step 9: Generate test report
    // ═══════════════════════════════════════════════════════════
    const testReport = {
      timestamp: new Date().toISOString(),
      testName: 'Profile Picture Update',
      status: 'passed' as const,
      duration: Date.now() - startTime,
      steps: testSteps,
      apiCalls: allApiCalls,
      screenshots: testSteps.map((s) => s.screenshot).filter(Boolean) as string[],
      errors: [],
    };

    const reportPath = reportGenerator.generateTestReport(testReport);
    console.log(`\n📄 Test report saved to: ${reportPath}`);

    // ═══════════════════════════════════════════════════════════
    // Final Summary
    // ═══════════════════════════════════════════════════════════
    console.log('\n📈 ═══════ TEST SUMMARY ═══════');
    console.log('  ✅ Login: Successful');
    console.log('  ✅ Navigation: Successful');
    console.log('  ✅ Profile Update: Successful');
    console.log(`  📡 Total API Calls: ${allApiCalls.length}`);
    console.log(`  📡 Unique Endpoints: ${uniqueEndpoints.length}`);
    console.log(`  ⏱️ Total Duration: ${Date.now() - startTime}ms`);
    console.log('═══════════════════════════════════════\n');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take a screenshot on failure
    if (testInfo.status !== 'passed') {
      const screenshotPath = `test-results/failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`📸 Failure screenshot saved: ${screenshotPath}`);
    }
  });
});