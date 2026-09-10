import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../../config/test-config';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(TestConfig.selectors.login.email);
    this.passwordInput = page.locator(TestConfig.selectors.login.password);
    this.loginButton = page.locator(TestConfig.selectors.login.submit);
    this.errorMessage = page.locator(TestConfig.selectors.login.errorMessage);
    this.successMessage = page.locator(TestConfig.selectors.login.successMessage);
  }

  /**
   * Navigate to the login page
   */
  async goto(): Promise<void> {
    await this.page.goto('/#practice');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Perform login with email and password
   */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.waitForLoginComplete();
  }

  /**
   * Wait for login to complete
   */
  async waitForLoginComplete(): Promise<void> {
    try {
      await this.page.waitForURL(/.*dashboard.*|.*profile.*|.*home.*/, { timeout: 10000 });
    } catch {
      // Check if login was successful via success message
      await this.successMessage.waitFor({ timeout: 5000 }).catch(() => {});
    }
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    const menuButton = this.page.locator(TestConfig.selectors.profile.menu);
    try {
      await menuButton.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get error message if login failed
   */
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }
}