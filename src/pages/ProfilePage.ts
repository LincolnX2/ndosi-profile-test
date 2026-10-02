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
    this.choosePhotoButton = page.getByText('📷 Choose Photo');
    this.fileInput = page.getByLabel('📷 Choose Photo');
    this.saveButton = page.getByRole('button', { name: /Save Changes/i });
    this.profilePicture = page.locator('.nav-profile-avatar').last();
  }

  async clickEditProfile(): Promise<void> {
    console.log('✏️ Clicking Edit Profile...');
    await this.editProfileButton.first().waitFor({ state: 'visible', timeout: 15000 });
    await this.editProfileButton.first().click();
    await this.page.waitForTimeout(1500);
    console.log('✅ Edit profile opened');
  }

  async uploadProfilePicture(filePath: string): Promise<void> {
    console.log(`📤 Uploading: ${filePath}`);
    try {
      await this.fileInput.waitFor({ state: 'attached', timeout: 10000 });
      await this.fileInput.setInputFiles(filePath);
      console.log('✅ File set on input directly');
    } catch {
      console.log('⚠️ Trying file chooser approach...');
      const fileChooserPromise = this.page.waitForEvent('filechooser');
      await this.choosePhotoButton.click();
      const fileChooser = await fileChooserPromise;
      await fileChooser.setFiles(filePath);
      console.log('✅ File set via file chooser');
    }
    await this.page.waitForTimeout(3000);
  }

  async saveChanges(): Promise<void> {
    console.log('💾 Saving changes...');
    await this.saveButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.saveButton.first().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(4000);
    console.log('✅ Changes saved');
  }

  async waitForProfileUpdate(): Promise<void> {
    console.log('⏳ Waiting for page to stabilize after save...');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(3000);
    console.log('✅ Page stabilized');
  }

  async getProfilePictureSrc(): Promise<string | null> {
    console.log('🔍 Looking for profile picture...');

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
            console.log(`✅ Found via "${selector}": ${match[1]}`);
            return match[1];
          }
        }
      } catch {
        // Continue to next selector
      }
    }

    console.log('⚠️ Avatar not found with any selector');
    await this.page.screenshot({
      path: `test-results/avatar-not-found-${Date.now()}.png`,
      fullPage: true,
    });
    return null;
  }

  async isProfilePictureVisible(): Promise<boolean> {
    return await this.profilePicture.isVisible({ timeout: 5000 }).catch(() => false);
  }

  async debugImages(): Promise<void> {
    const avatars = await this.page.locator('.nav-profile-avatar').all();
    console.log(`\n👤 Found ${avatars.length} profile avatars:\n`);

    for (let i = 0; i < avatars.length; i++) {
      const avatar = avatars[i];
      const style = await avatar.getAttribute('style').catch(() => '');
      const visible = await avatar.isVisible().catch(() => false);
      console.log(`${i + 1}. [${visible ? '👁️' : '🙈'}]`);
      console.log(`   style: ${style?.substring(0, 120)}`);
      console.log('');
    }
  }
}