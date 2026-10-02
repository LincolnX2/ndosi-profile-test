import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly editProfileButton: Locator;
  readonly choosePhotoButton: Locator;
  readonly fileInput: Locator;
  readonly saveButton: Locator;
  readonly profilePicture: Locator;

  constructor(page: Page) {
    super(page);

    this.editProfileButton = page.getByRole('button', { name: /Edit Profile/i });
    this.choosePhotoButton = page.getByText('Choose Photo');
    this.fileInput = page.getByLabel('Choose Photo');
    this.saveButton = page.getByRole('button', { name: /Save Changes/i });
    this.profilePicture = page.locator('.nav-profile-avatar').last();
  }

  async clickEditProfile(): Promise<void> {
    await this.editProfileButton.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.editProfileButton.first().click();
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    try {
      await this.fileInput.waitFor({ state: 'attached', timeout: 10000 });
      await this.fileInput.setInputFiles(filePath);
    } catch {
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.choosePhotoButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(filePath);
    }
  }

  async saveChanges(): Promise<void> {
    await this.saveButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForProfileUpdate(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getProfilePictureSrc(): Promise<string | null> {
    const selectors = [
      '.profile-section .nav-profile-avatar',
      '.profile-grid .nav-profile-avatar',
      '.nav-profile-avatar',
    ];

    for (const selector of selectors) {
      try {
        const elements = await this.page.locator(selector).all();

        for (const el of elements) {
          const visible = await el.isVisible().catch(() => false);
          if (!visible) continue;

          const style = await el.getAttribute('style').catch(() => '');
          if (!style) continue;

          const match = style.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/);
          if (match && match[1]) {
            return match[1];
          }
        }
      } catch {
        // Continue to next selector
      }
    }

    return null;
  }

  async isProfilePictureVisible(): Promise<boolean> {
    return await this.profilePicture.isVisible({ timeout: 5000 }).catch(() => false);
  }
}