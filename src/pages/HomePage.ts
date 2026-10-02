import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly menuButton: Locator;
  readonly myProfileButton: Locator;
  readonly showMoreDetailsButton: Locator;

  constructor(page: Page) {
    super(page);

    // ✅ CORRECT menu button selector based on codegen
    // The button text contains "Menu ▼" with possibly a letter prefix like "S Menu ▼"
    this.menuButton = page.getByRole('button', { name: /Menu/i });
    
    // ✅ My Profile button inside the menu
    this.myProfileButton = page.getByRole('button', { name: /My Profile/i });

    // ✅ Optional: Show more details button (may appear on profile)
    this.showMoreDetailsButton = page.getByRole('button', { name: /Show more details/i });
  }

  /**
   * Verify user is logged in by checking multiple indicators
   */
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);

    console.log(`🔍 Checking login. URL: ${this.page.url()}`);

    // Look for menu button (main indicator)
    try {
      const menuVisible = await this.menuButton.first().isVisible({ timeout: 5000 });
      if (menuVisible) {
        console.log('✅ Login confirmed: Menu button visible');
        return true;
      }
    } catch {
      // Try other indicators
    }

    // Fallback indicators
    const indicators = [
      'button:has-text("Logout")',
      'button:has-text("Sign Out")',
      'button:has-text("My Profile")',
      '[class*="profile" i]',
      '[class*="avatar" i]',
    ];

    for (const selector of indicators) {
      const count = await this.page.locator(selector).count();
      if (count > 0) {
        const visible = await this.page.locator(selector).first().isVisible().catch(() => false);
        if (visible) {
          console.log(`✅ Login confirmed via: ${selector}`);
          return true;
        }
      }
    }

    // Check URL changed
    const url = this.page.url();
    if (!url.includes('/#practice') && !url.includes('/login')) {
      console.log(`✅ Login confirmed via URL change: ${url}`);
      return true;
    }

    console.log('⚠️ Login could not be verified');
    return false;
  }

  /**
   * Click the menu button (top right corner)
   */
  async clickMenu(): Promise<void> {
    console.log('🍔 Clicking menu button...');
    
    await this.menuButton.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.menuButton.first().click();
    await this.page.waitForTimeout(1000);
    
    console.log('✅ Menu clicked');
  }

  /**
   * Click "My Profile" from the menu
   */
  async clickMyProfile(): Promise<void> {
    console.log('👤 Clicking My Profile...');
    
    // Wait for menu to expand
    await this.page.waitForTimeout(500);
    
    await this.myProfileButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.myProfileButton.first().click();
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
    
    console.log('✅ Navigated to My Profile');
  }

  /**
   * Convenience: open menu + go to profile
   */
  async navigateToProfile(): Promise<void> {
    await this.clickMenu();
    await this.clickMyProfile();
  }

  /**
   * Click "Show more details" if present (may appear after login)
   */
  async clickShowMoreDetailsIfPresent(): Promise<boolean> {
    try {
      const visible = await this.showMoreDetailsButton.first().isVisible({ timeout: 2000 });
      if (visible) {
        await this.showMoreDetailsButton.first().click();
        await this.page.waitForTimeout(500);
        console.log('✅ Clicked "Show more details"');
        return true;
      }
    } catch {
      // Button not present, that's OK
    }
    return false;
  }
}