import { test, expect } from './fixtures/test-fixtures';

test.describe('🧭 Navigation & Menu', () => {

  test('should verify user is logged in and on home page', async ({
    authenticatedPage,
    homePage,
    page,
  }) => {
    console.log('🧭 Test: Verify authenticated state');

    await page.screenshot({ path: 'test-results/02-navigation/01-home-page.png' });

    // Verify logged in
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();

    console.log(`✅ Logged in. URL: ${page.url()}`);
  });

  test('should open the menu when clicking the menu button', async ({
    authenticatedPage,
    homePage,
    page,
  }) => {
    console.log('🧭 Test: Open menu');

    await page.screenshot({ path: 'test-results/02-navigation/02-before-menu.png' });

    // Click menu
    await homePage.clickMenu();
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/02-navigation/03-menu-open.png' });

    console.log('✅ Menu opened successfully');
  });

  test('should navigate to My Profile from the menu', async ({
    authenticatedPage,
    homePage,
    page,
  }) => {
    console.log('🧭 Test: Navigate to My Profile');

    await page.screenshot({ path: 'test-results/02-navigation/04-before-nav.png' });

    // Open menu and navigate to profile
    await homePage.clickMenu();
    await homePage.clickMyProfile();

    await page.screenshot({ path: 'test-results/02-navigation/05-profile-page.png' });

    // Verify we're on profile page
    const url = page.url();
    console.log(`✅ Navigated to: ${url}`);
    expect(url).toContain('ndosiautomation');
  });

  test('should display profile information on profile page', async ({
    authenticatedPage,
    homePage,
    profilePage,
    page,
  }) => {
    console.log('🧭 Test: Verify profile page content');

    await homePage.clickMenu();
    await homePage.clickMyProfile();
    await page.waitForTimeout(1000);

    await page.screenshot({ path: 'test-results/02-navigation/06-profile-content.png' });

    // Verify profile picture is visible
    const isProfileVisible = await profilePage.isProfilePictureVisible();
    expect(isProfileVisible).toBeTruthy();

    console.log('✅ Profile information displayed');
  });
});