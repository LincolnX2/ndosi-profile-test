import { test, expect } from './fixtures/test-fixtures';
import path from 'path';

const IMAGE_PATH = path.join(__dirname, '../fixtures/test-image.png');

// Force serial execution to prevent session conflicts
test.describe.configure({ mode: 'serial' });

test.describe('API Validation', () => {

  test('should capture all API calls during login', async ({
    loginPage,
    testCredentials,
    apiValidator,
  }) => {
    console.log('Test: Capture login API calls');

    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);

    const allCalls = apiValidator.getAllApiCalls();
    const uniqueEndpoints = apiValidator.getUniqueEndpoints();

    console.log(`Total calls: ${allCalls.length}`);
    console.log(`Unique endpoints: ${uniqueEndpoints.length}`);

    allCalls.forEach((call, i) => {
      const icon = call.status >= 200 && call.status < 300 ? 'PASS' : 'FAIL';
      console.log(`  ${i + 1}. [${icon}] ${call.method} ${call.url} - ${call.status}`);
    });

    expect(allCalls.length).toBeGreaterThan(0);
  });

  test('should validate all API responses are successful (2xx)', async ({
    loginPage,
    homePage,
    profilePage,
    testCredentials,
    apiValidator,
    page,
  }) => {
    console.log('Test: Validate all API responses');

    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);

    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await profilePage.clickEditProfile();
    await profilePage.uploadProfilePicture(IMAGE_PATH);

    const allCalls = apiValidator.getAllApiCalls();
    const validation = apiValidator.validateAllSuccess();

    console.log(`\nAPI Validation Summary:`);
    console.log(`  Total calls: ${allCalls.length}`);
    console.log(`  Failed calls: ${validation.failed.length}`);
    if (allCalls.length > 0) {
      console.log(`  Success rate: ${((allCalls.length - validation.failed.length) / allCalls.length * 100).toFixed(2)}%`);
    }

    if (validation.failed.length > 0) {
      console.log('\nFailed calls:');
      validation.failed.forEach((call) => {
        console.log(`  [FAIL] ${call.method} ${call.url} - ${call.status}`);
      });
    }

    expect(validation.passed).toBeTruthy();
    expect(allCalls.length).toBeGreaterThan(0);
  });

  test('should generate API report with unique endpoints', async ({
    loginPage,
    homePage,
    testCredentials,
    apiValidator,
    reportGenerator,
  }) => {
    console.log('Test: Generate API report');

    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);
    await homePage.clickMenu();
    await homePage.clickMyProfile();

    const allCalls = apiValidator.getAllApiCalls();
    const uniqueEndpoints = apiValidator.getUniqueEndpoints();

    console.log(`\nUnique endpoints captured:`);
    uniqueEndpoints.forEach((endpoint, i) => {
      const calls = allCalls.filter((c) => c.url.includes(endpoint));
      const statuses = [...new Set(calls.map((c) => c.status))];
      console.log(`  ${i + 1}. ${endpoint} - Statuses: ${statuses.join(', ')}`);
    });

    expect(uniqueEndpoints.length).toBeGreaterThan(0);
  });
});