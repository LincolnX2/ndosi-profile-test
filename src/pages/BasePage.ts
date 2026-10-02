import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL path
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<string> {
    const screenshotPath = `test-results/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if an element is visible
   */
  async isVisible(selector: string, timeout: number = 3000): Promise<boolean> {
    try {
      return await this.page.locator(selector).first().isVisible({ timeout });
    } catch {
      return false;
    }
  }
}