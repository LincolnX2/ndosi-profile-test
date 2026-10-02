import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { ProfilePage } from '../../src/pages/ProfilePage';
import { ApiValidator } from '../../src/utils/api-validator';
import { ReportGenerator } from '../../src/utils/report-generator';
import { environment } from '../../config/environment.config';

// ─────────────────────────────────────────────────────────────
// Custom Fixtures: shared across all tests
// ─────────────────────────────────────────────────────────────
type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  apiValidator: ApiValidator;
  reportGenerator: ReportGenerator;
  authenticatedPage: Page; // Already logged in!
  testCredentials: { email: string; password: string };
};

export const test = base.extend<TestFixtures>({
  // ─────────────────────────────────────────────────────────────
  // Page Object Fixtures
  // ─────────────────────────────────────────────────────────────
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  // ─────────────────────────────────────────────────────────────
  // Utility Fixtures
  // ─────────────────────────────────────────────────────────────
  apiValidator: async ({ page }, use) => {
    const apiValidator = new ApiValidator();

    // Auto-capture API calls for every test
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

    await use(apiValidator);
  },

  reportGenerator: async ({}, use) => {
    const reportGenerator = new ReportGenerator();
    await use(reportGenerator);
  },

  // ─────────────────────────────────────────────────────────────
  // Test Credentials Fixture
  // ─────────────────────────────────────────────────────────────
  testCredentials: async ({}, use) => {
    await use({
      email: environment.testEmail,
      password: environment.testPassword,
    });
  },

  // ─────────────────────────────────────────────────────────────
  // Pre-authenticated Page Fixture (for tests that need login)
  // ─────────────────────────────────────────────────────────────
  authenticatedPage: async ({ page, loginPage, homePage, testCredentials }, use) => {
    // Navigate and login
    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);

    // Verify login succeeded
    const isLoggedIn = await homePage.isLoggedIn();
    if (!isLoggedIn) {
      throw new Error('Login failed in fixture setup');
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';