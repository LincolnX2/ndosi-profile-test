# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-profile-picture-upload.spec.ts >> 📸 Profile Picture Upload >> should upload and verify profile picture update
- Location: tests\03-profile-picture-upload.spec.ts:17:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Menu/i }).first() to be visible

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - navigation [ref=f1e4]:
    - generic [ref=f1e5]:
      - img "NTA Logo" [ref=f1e7] [cursor=pointer]
      - generic [ref=f1e8]:
        - button "🏠 Home" [ref=f1e9] [cursor=pointer]:
          - generic [ref=f1e10]: 🏠
          - generic [ref=f1e11]: Home
        - button "📖 About Us" [ref=f1e12] [cursor=pointer]:
          - generic [ref=f1e13]: 📖
          - generic [ref=f1e14]: About Us
        - button "⭐ Testimonials" [ref=f1e15] [cursor=pointer]:
          - generic [ref=f1e16]: ⭐
          - generic [ref=f1e17]: Testimonials
        - button "👨‍🏫 Mentors" [ref=f1e18] [cursor=pointer]:
          - generic [ref=f1e19]: 👨‍🏫
          - generic [ref=f1e20]: Mentors
        - button "🎓 Graduates" [ref=f1e21] [cursor=pointer]:
          - generic [ref=f1e22]: 🎓
          - generic [ref=f1e23]: Graduates
        - button "📞 Contact Us" [ref=f1e24] [cursor=pointer]:
          - generic [ref=f1e25]: 📞
          - generic [ref=f1e26]: Contact Us
        - button "📚 Learn ▼" [ref=f1e28] [cursor=pointer]:
          - generic [ref=f1e29]: 📚
          - generic [ref=f1e30]: Learn
          - generic [ref=f1e31]: ▼
        - button "🔗 Connect ▼" [ref=f1e33] [cursor=pointer]:
          - generic [ref=f1e34]: 🔗
          - generic [ref=f1e35]: Connect
          - generic [ref=f1e36]: ▼
      - button "🔑 Login" [ref=f1e38] [cursor=pointer]:
        - generic [ref=f1e39]: 🔑
        - generic [ref=f1e40]: Login
  - main [ref=f1e41]:
    - generic [ref=f1e42]:
      - generic [ref=f1e43]: 🔒
      - heading "Login Required" [level=2] [ref=f1e44]
      - paragraph [ref=f1e45]: Please log in to view your profile.
      - button "Go to Login" [ref=f1e46] [cursor=pointer]
```

# Test source

```ts
  1   | import { Page, Locator } from '@playwright/test';
  2   | import { BasePage } from './BasePage';
  3   | 
  4   | export class HomePage extends BasePage {
  5   |   readonly menuButton: Locator;
  6   |   readonly myProfileButton: Locator;
  7   |   readonly showMoreDetailsButton: Locator;
  8   | 
  9   |   constructor(page: Page) {
  10  |     super(page);
  11  | 
  12  |     // ✅ CORRECT menu button selector based on codegen
  13  |     // The button text contains "Menu ▼" with possibly a letter prefix like "S Menu ▼"
  14  |     this.menuButton = page.getByRole('button', { name: /Menu/i });
  15  |     
  16  |     // ✅ My Profile button inside the menu
  17  |     this.myProfileButton = page.getByRole('button', { name: /My Profile/i });
  18  | 
  19  |     // ✅ Optional: Show more details button (may appear on profile)
  20  |     this.showMoreDetailsButton = page.getByRole('button', { name: /Show more details/i });
  21  |   }
  22  | 
  23  |   /**
  24  |    * Verify user is logged in by checking multiple indicators
  25  |    */
  26  |   async isLoggedIn(): Promise<boolean> {
  27  |     await this.page.waitForLoadState('networkidle');
  28  |     await this.page.waitForTimeout(3000);
  29  | 
  30  |     console.log(`🔍 Checking login. URL: ${this.page.url()}`);
  31  | 
  32  |     // Look for menu button (main indicator)
  33  |     try {
  34  |       const menuVisible = await this.menuButton.first().isVisible({ timeout: 5000 });
  35  |       if (menuVisible) {
  36  |         console.log('✅ Login confirmed: Menu button visible');
  37  |         return true;
  38  |       }
  39  |     } catch {
  40  |       // Try other indicators
  41  |     }
  42  | 
  43  |     // Fallback indicators
  44  |     const indicators = [
  45  |       'button:has-text("Logout")',
  46  |       'button:has-text("Sign Out")',
  47  |       'button:has-text("My Profile")',
  48  |       '[class*="profile" i]',
  49  |       '[class*="avatar" i]',
  50  |     ];
  51  | 
  52  |     for (const selector of indicators) {
  53  |       const count = await this.page.locator(selector).count();
  54  |       if (count > 0) {
  55  |         const visible = await this.page.locator(selector).first().isVisible().catch(() => false);
  56  |         if (visible) {
  57  |           console.log(`✅ Login confirmed via: ${selector}`);
  58  |           return true;
  59  |         }
  60  |       }
  61  |     }
  62  | 
  63  |     // Check URL changed
  64  |     const url = this.page.url();
  65  |     if (!url.includes('/#practice') && !url.includes('/login')) {
  66  |       console.log(`✅ Login confirmed via URL change: ${url}`);
  67  |       return true;
  68  |     }
  69  | 
  70  |     console.log('⚠️ Login could not be verified');
  71  |     return false;
  72  |   }
  73  | 
  74  |   /**
  75  |    * Click the menu button (top right corner)
  76  |    */
  77  |   async clickMenu(): Promise<void> {
  78  |     console.log('🍔 Clicking menu button...');
  79  |     
> 80  |     await this.menuButton.first().waitFor({ state: 'visible', timeout: 15000 });
      |                                   ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  81  |     await this.menuButton.first().click();
  82  |     await this.page.waitForTimeout(1000);
  83  |     
  84  |     console.log('✅ Menu clicked');
  85  |   }
  86  | 
  87  |   /**
  88  |    * Click "My Profile" from the menu
  89  |    */
  90  |   async clickMyProfile(): Promise<void> {
  91  |     console.log('👤 Clicking My Profile...');
  92  |     
  93  |     // Wait for menu to expand
  94  |     await this.page.waitForTimeout(500);
  95  |     
  96  |     await this.myProfileButton.first().waitFor({ state: 'visible', timeout: 10000 });
  97  |     await this.myProfileButton.first().click();
  98  |     
  99  |     await this.page.waitForLoadState('networkidle');
  100 |     await this.page.waitForTimeout(1500);
  101 |     
  102 |     console.log('✅ Navigated to My Profile');
  103 |   }
  104 | 
  105 |   /**
  106 |    * Convenience: open menu + go to profile
  107 |    */
  108 |   async navigateToProfile(): Promise<void> {
  109 |     await this.clickMenu();
  110 |     await this.clickMyProfile();
  111 |   }
  112 | 
  113 |   /**
  114 |    * Click "Show more details" if present (may appear after login)
  115 |    */
  116 |   async clickShowMoreDetailsIfPresent(): Promise<boolean> {
  117 |     try {
  118 |       const visible = await this.showMoreDetailsButton.first().isVisible({ timeout: 2000 });
  119 |       if (visible) {
  120 |         await this.showMoreDetailsButton.first().click();
  121 |         await this.page.waitForTimeout(500);
  122 |         console.log('✅ Clicked "Show more details"');
  123 |         return true;
  124 |       }
  125 |     } catch {
  126 |       // Button not present, that's OK
  127 |     }
  128 |     return false;
  129 |   }
  130 | }
```