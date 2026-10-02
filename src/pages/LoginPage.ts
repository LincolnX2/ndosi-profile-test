import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordButton: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.showPasswordButton = page.getByRole('button', { name: 'Show password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('.error, .alert-danger, [role="alert"]');
  }

  async goto(): Promise<void> {
    await super.goto('/#practice');
  }

  /**
   * ✅ REMOVED: setupDialogHandler method
   * Dialogs are handled globally in test-fixtures.ts
   */
  async login(email: string, password: string): Promise<void> {
    console.log(`🔑 Filling email: ${email}`);
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.click();
    await this.emailInput.fill(email);

    console.log(`🔑 Filling password...`);
    await this.passwordInput.click();
    await this.passwordInput.fill(password);

    console.log(`🔑 Clicking login button...`);
    await this.loginButton.click();

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    console.log(`✅ Login form submitted`);
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      if (await this.errorMessage.isVisible({ timeout: 2000 })) {
        return await this.errorMessage.textContent();
      }
    } catch {}
    return null;
  }
}