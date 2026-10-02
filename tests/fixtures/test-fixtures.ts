import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { HomePage } from '../../src/pages/HomePage';
import { ProfilePage } from '../../src/pages/ProfilePage';
import { ApiValidator } from '../../src/utils/api-validator';
import { ReportGenerator } from '../../src/utils/report-generator';
import { environment } from '../../config/environment.config';

type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  profilePage: ProfilePage;
  apiValidator: ApiValidator;
  reportGenerator: ReportGenerator;
  authenticatedPage: Page;
  testCredentials: { email: string; password: string };
};

export const test = base.extend<TestFixtures>({

  // ─────────────────────────────────────────────
  // Global dialog handler (runs for EVERY test)
  // ─────────────────────────────────────────────
  page: async ({ page }, use) => {
    // ✅ Single, consolidated dialog handler
    const dialogMessages: string[] = [];
    page.on('dialog', async (dialog) => {
      const msg = dialog.message();
      dialogMessages.push(msg);
      console.log(`⚠️ Dialog: "${msg}"`);
      await dialog.accept().catch(() => {});
    });

    // Store for later access
    (page as any).__dialogMessages = dialogMessages;

    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  apiValidator: async ({ page }, use) => {
    const apiValidator = new ApiValidator();

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
    await use(new ReportGenerator());
  },

  testCredentials: async ({}, use) => {
    await use({
      email: environment.testEmail,
      password: environment.testPassword,
    });
  },

  authenticatedPage: async ({ page, loginPage, homePage, testCredentials }, use) => {
    await loginPage.goto();
    await loginPage.login(testCredentials.email, testCredentials.password);

    const isLoggedIn = await homePage.isLoggedIn();
    if (!isLoggedIn) {
      await page.screenshot({ path: 'test-results/fixture-login-failed.png' });
      throw new Error('Login failed in fixture. Check test-results/fixture-login-failed.png');
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';