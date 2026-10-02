import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator(
      'input[type="email"], input[name="email"], input[placeholder*="Email"], input[placeholder*="email"], input[id*="email"]'
    );
    this.passwordInput = page.locator(
      'input[type="password"], input[name="password"], input[placeholder*="Password"], input[placeholder*="password"], input[id*="password"]'
    );
    this.loginButton = page.locator(
      'button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Log In")'
    );
    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"]');
    this.successMessage = page.locator('.success, .alert-success');
  }

  /**
   * Navigate to the Ndosi practice page
   */
  async goto(): Promise<void> {
    await super.goto('/#practice');
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.loginButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
  }

  /**
   * Complete login flow: fill form + submit
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message if login failed
   */
  async getErrorMessage(): Promise<string | null> {
    try {
      if (await this.errorMessage.isVisible({ timeout: 2000 })) {
        return await this.errorMessage.textContent();
      }
    } catch {
      // No error
    }
    return null;
  }
}