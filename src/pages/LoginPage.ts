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

  async login(email: string, password: string): Promise<void> {
    console.log('\n🔑 ========== LOGIN START ==========');

    // ─── Step 1: Fill email ───
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(500); // Let React update state

    const emailValue = await this.emailInput.inputValue();
    console.log(`📧 Email filled: "${emailValue}"`);

    // ─── Step 2: Fill password ───
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(500); // Let React update state

    const passwordValue = await this.passwordInput.inputValue();
    console.log(`🔑 Password filled: "${passwordValue}" (length: ${passwordValue.length})`);

    // ─── Step 3: Click "Show password" (per codegen) ───
    try {
      const showBtnVisible = await this.showPasswordButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (showBtnVisible) {
        await this.showPasswordButton.click();
        console.log('👁️  Clicked "Show password"');
        await this.page.waitForTimeout(300);
      }
    } catch {
      console.log('⚠️  "Show password" button not found (optional)');
    }

    // ─── Step 4: Wait before clicking Login ───
    await this.page.waitForTimeout(1000);

    // ─── Step 5: Click Login ───
    console.log('🖱️  Clicking Login button...');
    await this.loginButton.click({ force: true });

    // ─── Step 6: Wait for the URL to change to dashboard ───
    console.log('⏳ Waiting for navigation to dashboard...');
    try {
      await this.page.waitForURL(/#dashboard/, { timeout: 20000 });
      console.log('✅ Navigation detected! URL changed to dashboard');
    } catch {
      // Try other possible dashboard URLs
      try {
        await this.page.waitForURL(/#\/?dashboard|#home|#profile/, { timeout: 5000 });
        console.log('✅ Navigation detected (alternative URL)');
      } catch {
        console.log(`⚠️  URL did not change. Current URL: ${this.page.url()}`);
      }
    }

    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    console.log(`📍 Final URL: ${this.page.url()}`);
    console.log('🔑 ========== LOGIN END ==========\n');
  }

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