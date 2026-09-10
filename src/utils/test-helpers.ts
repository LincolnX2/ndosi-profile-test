import { Page, Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class TestHelpers {
  /**
   * Take a screenshot and save it
   */
  static async takeScreenshot(page: Page, name: string): Promise<string> {
    const screenshotsDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const filename = `${name}-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);
    
    await page.screenshot({ 
      path: filepath, 
      fullPage: true 
    });
    
    return filepath;
  }

  /**
   * Wait for an element to be visible
   */
  static async waitForElement(page: Page, selector: string, timeout: number = 10000): Promise<void> {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Generate a random string
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random email
   */
  static generateRandomEmail(): string {
    return `${this.generateRandomString(8)}@test.com`;
  }

  /**
   * Sleep for a specified time
   */
  static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry a function multiple times
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error = new Error('All attempts failed');
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Capture performance metrics
   */
  static async capturePerformanceMetrics(page: Page): Promise<any> {
    return await page.evaluate(() => {
      const performance = window.performance;
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd,
        loadComplete: navigation.loadEventEnd,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime,
        domInteractive: navigation.domInteractive,
        domComplete: navigation.domComplete,
      };
    });
  }

  /**
   * Create directory if it doesn't exist
   */
  static createDirectory(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Read file content
   */
  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * Write file content
   */
  static writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    this.createDirectory(dir);
    fs.writeFileSync(filePath, content);
  }
}