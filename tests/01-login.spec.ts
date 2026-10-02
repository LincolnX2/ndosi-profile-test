import { test, expect } from './fixtures/test-fixtures';

test.describe('🔐 Login Functionality', () => {

  test('should navigate to the Ndosi practice page', async ({ loginPage, page }) => {
    console.log('🔐 Test: Navigate to login page');

    await loginPage.goto();
    await page.screenshot({ path: 'test-results/01-login/01-page-loaded.png' });

    // Verify we're on the correct page
    const url = page.url();
    expect(url).toContain('ndosiautomation');

    console.log(`✅ Page loaded: ${url}`);
  });

  test('should display email and password input fields', async ({ loginPage, page }) => {
    console.log('🔐 Test: Display login form fields');

    await loginPage.goto();

    // Verify form fields are visible
    await expect(loginPage.emailInput).toBeVisible({ timeout: 10000 });
    await expect(loginPage.passwordInput).toBeVisible({ timeout: 10000 });
    await expect(loginPage.loginButton).toBeVisible({ timeout: 10000 });

    await page.screenshot({ path: 'test-results/01-login/02-form-visible.png' });

    console.log('✅ All login form fields are visible');
  });

  test('should successfully login with valid credentials', async ({
    loginPage,
    homePage,
    testCredentials,
    page,
  }) => {
    console.log(`🔐 Test: Login with ${testCredentials.email}`);

    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);
    await page.screenshot({ path: 'test-results/01-login/03-after-login.png' });

    // Verify login succeeded
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    console.log('✅ Login successful');
  });

  test('should fail login with invalid credentials', async ({ loginPage, homePage, page }) => {
    console.log('🔐 Test: Login with invalid credentials');

    await loginPage.goto();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/01-login/04-invalid-login.png' });

    // Verify user is NOT logged in
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();

    // Check for error message
    const errorMessage = await loginPage.getErrorMessage();
    console.log(`📝 Error message: ${errorMessage || 'none found'}`);

    console.log('✅ Invalid login correctly rejected');
  });
});