import { Page, Locator } from '@playwright/test';
import { TestConfig } from '../../config/test-config';

export class ProfilePage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly myProfileLink: Locator;
  readonly editProfileButton: Locator;
  readonly fileInput: Locator;
  readonly profilePicture: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator(TestConfig.selectors.profile.menu);
    this.myProfileLink = page.locator(TestConfig.selectors.profile.myProfile);
    this.editProfileButton = page.locator(TestConfig.selectors.profile.editProfile);
    this.fileInput = page.locator(TestConfig.selectors.profile.fileInput);
    this.profilePicture = page.locator(TestConfig.selectors.profile.profileImage);
    this.saveButton = page.locator(TestConfig.selectors.profile.saveButton);
    this.successMessage = page.locator(TestConfig.selectors.profile.successMessage);
    this.loadingIndicator = page.locator(TestConfig.selectors.profile.loadingIndicator);
  }

  /**
   * Click the menu button
   */
  async clickMenu(): Promise<void> {
    await this.menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.menuButton.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to My Profile
   */
  async clickMyProfile(): Promise<void> {
    await this.myProfileLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.myProfileLink.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click Edit Profile button
   */
  async clickEditProfile(): Promise<void> {
    await this.editProfileButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.editProfileButton.click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Upload a profile picture
   */
  async uploadProfilePicture(filePath: string): Promise<void> {
    // Wait for file input
    await this.fileInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Set the file
    await this.fileInput.setInputFiles(filePath);
    
    // Wait for upload to start
    await this.page.waitForTimeout(1000);
    
    // Wait for loading to complete
    try {
      await this.loadingIndicator.waitFor({ state: 'visible', timeout: 3000 });
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      await this.page.waitForTimeout(2000);
    }
    
    // Save if needed
    if (await this.saveButton.isVisible().catch(() => false)) {
      await this.saveButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get the profile picture src attribute
   */
  async getProfilePictureSrc(): Promise<string | null> {
    await this.profilePicture.waitFor({ state: 'visible', timeout: 5000 });
    return await this.profilePicture.getAttribute('src');
  }

  /**
   * Wait for profile picture update to complete
   */
  async waitForProfileUpdate(): Promise<void> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      await this.page.waitForTimeout(3000);
    }
  }

  /**
   * Check if profile is visible
   */
  async isProfileVisible(): Promise<boolean> {
    try {
      await this.profilePicture.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for menu button
   */
  async waitForMenu(): Promise<void> {
    await this.menuButton.waitFor({ state: 'visible', timeout: 10000 });
  }
}