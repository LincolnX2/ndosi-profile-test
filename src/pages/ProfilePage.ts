import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly editProfileButton: Locator;
  readonly fileInput: Locator;
  readonly profilePicture: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly loadingIndicator: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.editProfileButton = page.locator(
      'button:has-text("Edit Profile"), a:has-text("Edit Profile"), button:has-text("Edit")'
    );
    this.fileInput = page.locator('input[type="file"]');
    this.profilePicture = page.locator(
      'img[alt*="Profile"], img[src*="profile"], .profile-image, .avatar'
    );
    this.saveButton = page.locator(
      'button:has-text("Save"), button:has-text("Update"), button[type="submit"]'
    );
    this.successMessage = page.locator(
      '.success-message, .alert-success, [role="status"]'
    );
    this.loadingIndicator = page.locator(
      '.loading, .spinner, [role="progressbar"]'
    );
    this.cancelButton = page.locator(
      'button:has-text("Cancel"), a:has-text("Cancel")'
    );
  }

  /**
   * Click the "Edit Profile" button
   */
  async clickEditProfile(): Promise<void> {
    await this.editProfileButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.editProfileButton.first().click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Upload a new profile picture
   */
  async uploadProfilePicture(filePath: string): Promise<void> {
    // Wait for file input to be available
    await this.fileInput.waitFor({ state: 'visible', timeout: 10000 });

    // Set the file
    await this.fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(1000);

    // Wait for loading indicator to appear then disappear
    try {
      await this.loadingIndicator.waitFor({ state: 'visible', timeout: 3000 });
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      await this.page.waitForTimeout(2000);
    }

    // Click save if the button is visible
    if (await this.saveButton.first().isVisible().catch(() => false)) {
      await this.saveButton.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Get the current profile picture source URL
   */
  async getProfilePictureSrc(): Promise<string | null> {
    await this.profilePicture.first().waitFor({ state: 'visible', timeout: 5000 });
    return await this.profilePicture.first().getAttribute('src');
  }

  /**
   * Wait for profile update success message or image change
   */
  async waitForProfileUpdate(): Promise<void> {
    try {
      await this.successMessage.first().waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Success message displayed');
    } catch {
      console.log('ℹ️ No success message; waiting for image update');
      await this.page.waitForTimeout(3000);
    }
  }

  /**
   * Check if profile picture is visible
   */
  async isProfilePictureVisible(): Promise<boolean> {
    return await this.profilePicture.first().isVisible({ timeout: 3000 }).catch(() => false);
  }

  /**
   * Cancel editing
   */
  async cancelEdit(): Promise<void> {
    if (await this.cancelButton.first().isVisible().catch(() => false)) {
      await this.cancelButton.first().click();
    }
  }
}