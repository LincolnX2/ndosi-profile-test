import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly menuButton: Locator;
  readonly myProfileButton: Locator;
  readonly showMoreDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    this.menuButton = page.getByRole('button', { name: /Menu/i });
    this.myProfileButton = page.getByRole('button', { name: /My Profile/i });
    this.showMoreDetailsButton = page.getByRole('button', { name: /Show more details/i });
  }

  /**
   * Detects if the user is logged in using multiple indicators.
   * Prioritized from most reliable to least reliable.
   */
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500); // Let SPA settle

    const url = this.page.url();
    console.log(`🔍 [isLoggedIn] URL: ${url}`);

    // ─── Indicator 1: Dashboard URL (most reliable) ───
    if (url.includes('/#dashboard') || url.includes('/#profile')) {
      console.log('✅ [isLoggedIn] Confirmed via dashboard URL');
      return true;
    }

    // ─── Indicator 2: "Menu ▼" button (visible only when logged in) ───
    try {
      const menuVisible = await this.menuButton.first().isVisible({ timeout: 3000 });
      if (menuVisible) {
        console.log('✅ [isLoggedIn] Confirmed via Menu button');
        return true;
      }
    } catch {
      // Continue
    }

    // ─── Indicator 3: "Welcome back" greeting text ───
    try {
      const welcomeText = this.page.locator('text=/Welcome back/i').first();
      const welcomeVisible = await welcomeText.isVisible({ timeout: 2000 });
      if (welcomeVisible) {
        console.log('✅ [isLoggedIn] Confirmed via "Welcome back" text');
        return true;
      }
    } catch {
      // Continue
    }

    // ─── Indicator 4: "My Learning" button ───
    try {
      const myLearningVisible = await this.page
        .getByRole('button', { name: /My Learning/i })
        .first()
        .isVisible({ timeout: 2000 })
        .catch(() => false);
      if (myLearningVisible) {
        console.log('✅ [isLoggedIn] Confirmed via "My Learning" button');
        return true;
      }
    } catch {
      // Continue
    }

    // ─── Indicator 5: Login-related text absence ───
    const bodyText = (await this.page.locator('body').innerText().catch(() => '')).toLowerCase();
    const hasLoginForm = bodyText.includes('login to access learning materials');

    if (!hasLoginForm && bodyText.length > 100) {
      // Page has substantial content and no login form
      if (bodyText.includes('logout') || bodyText.includes('sign out')) {
        console.log('✅ [isLoggedIn] Confirmed via logout button present');
        return true;
      }
    }

    console.log('❌ [isLoggedIn] Login not confirmed');
    return false;
  }

  async clickMenu(): Promise<void> {
    console.log('🖱️  Clicking Menu button...');
    await this.menuButton.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.menuButton.first().click();
    await this.page.waitForTimeout(800); // Let dropdown open
  }

  async clickMyProfile(): Promise<void> {
    console.log('🖱️  Clicking My Profile...');
    await this.myProfileButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.myProfileButton.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async navigateToProfile(): Promise<void> {
    await this.clickMenu();
    await this.clickMyProfile();
  }

  async clickShowMoreDetailsIfPresent(): Promise<boolean> {
    try {
      const visible = await this.showMoreDetailsButton.first().isVisible({ timeout: 2000 });
      if (visible) {
        await this.showMoreDetailsButton.first().click();
        return true;
      }
    } catch {
      // Button not present
    }
    return false;
  }
}