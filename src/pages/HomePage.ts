import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly menuButton: Locator;
  readonly myProfileLink: Locator;
  readonly logoutButton: Locator;
  readonly userAvatar: Locator;

  constructor(page: Page) {
    super(page);
    this.menuButton = page.locator(
      'button[aria-label="Menu"], button[aria-label="menu"], .menu-button, button:has-text("☰"), [role="button"]:has-text("Menu")'
    );
    this.myProfileLink = page.locator(
      'a:has-text("My Profile"), a:has-text("Profile"), li:has-text("My Profile")'
    );
    this.logoutButton = page.locator(
      'button:has-text("Logout"), button:has-text("Sign Out"), a:has-text("Logout")'
    );
    this.userAvatar = page.locator(
      'img[alt*="Profile"], img[src*="profile"], .user-avatar, .profile-picture'
    );
  }

  /**
   * Verify user is logged in by checking multiple indicators
   */
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);

    console.log(`🔍 Checking login status. URL: ${this.page.url()}`);

    // Multiple possible indicators of being logged in
    const indicators = [
      'button[aria-label="Menu"]',
      'button[aria-label="menu"]',
      '.menu-button',
      'button:has-text("☰")',
      'a:has-text("My Profile")',
      'a:has-text("Profile")',
      'button:has-text("Logout")',
      'a:has-text("Logout")',
      'button:has-text("Sign Out")',
      '[href*="profile"]',
      '[href*="dashboard"]',
      '.user-avatar',
      '.profile-picture',
      'nav',
    ];

    for (const selector of indicators) {
      try {
        const count = await this.page.locator(selector).count();
        if (count > 0) {
          const visible = await this.page.locator(selector).first().isVisible();
          if (visible) {
            console.log(`✅ Login indicator found: ${selector}`);
            return true;
          }
        }
      } catch {
        // Continue
      }
    }

    console.log('⚠️ No login indicators found');
    return false;
  }

  /**
   * Click the hamburger/menu button
   */
  async clickMenu(): Promise<void> {
    await this.menuButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.menuButton.first().click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to "My Profile" section
   */
  async clickMyProfile(): Promise<void> {
    await this.myProfileLink.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.myProfileLink.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    if (await this.logoutButton.first().isVisible().catch(() => false)) {
      await this.logoutButton.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Convenience method: open menu + go to profile
   */
  async navigateToProfile(): Promise<void> {
    await this.clickMenu();
    await this.clickMyProfile();
  }
}