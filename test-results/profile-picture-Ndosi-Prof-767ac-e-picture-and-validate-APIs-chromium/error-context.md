# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile-picture.spec.ts >> Ndosi Profile Picture Update Flow >> should upload profile picture and validate APIs
- Location: tests\profile-picture.spec.ts:57:7

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - generic [ref=e5]:
      - img "NTA Logo" [ref=e7] [cursor=pointer]
      - generic [ref=e8]:
        - button "🏠 Home" [ref=e9] [cursor=pointer]:
          - generic [ref=e10]: 🏠
          - generic [ref=e11]: Home
        - button "📖 About Us" [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: 📖
          - generic [ref=e14]: About Us
        - button "⭐ Testimonials" [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: ⭐
          - generic [ref=e17]: Testimonials
        - button "👨‍🏫 Mentors" [ref=e18] [cursor=pointer]:
          - generic [ref=e19]: 👨‍🏫
          - generic [ref=e20]: Mentors
        - button "🎓 Graduates" [ref=e21] [cursor=pointer]:
          - generic [ref=e22]: 🎓
          - generic [ref=e23]: Graduates
        - button "📞 Contact Us" [ref=e24] [cursor=pointer]:
          - generic [ref=e25]: 📞
          - generic [ref=e26]: Contact Us
        - button "📚 Learn ▼" [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: 📚
          - generic [ref=e30]: Learn
          - generic [ref=e31]: ▼
        - button "🔗 Connect ▼" [ref=e33] [cursor=pointer]:
          - generic [ref=e34]: 🔗
          - generic [ref=e35]: Connect
          - generic [ref=e36]: ▼
        - button "🎯 My Learning ▼" [ref=e38] [cursor=pointer]:
          - generic [ref=e39]: 🎯
          - generic [ref=e40]: My Learning
          - generic [ref=e41]: ▼
      - button "S Menu ▼" [ref=e44] [cursor=pointer]:
        - generic [ref=e45]: S
        - generic [ref=e46]: Menu
        - generic [ref=e47]: ▼
  - main [ref=e48]:
    - generic [ref=e49]:
      - generic [ref=e50]:
        - generic [ref=e51]:
          - heading "Welcome back, Sabur 👋" [level=2] [ref=e52]:
            - generic [ref=e53]: Welcome
            - generic [ref=e54]: back,
            - generic [ref=e55]: Sabur
            - generic [ref=e56]: 👋
          - paragraph [ref=e57]: Here's an overview of your learning journey
        - generic [ref=e58]:
          - generic [ref=e59]: 📅
          - generic [ref=e60]:
            - generic [ref=e61]: Today
            - generic [ref=e62]: Friday, 2 October 2026
      - generic [ref=e63]:
        - generic [ref=e64]:
          - generic [ref=e65]: 📚
          - generic [ref=e66]:
            - generic [ref=e67]: "7"
            - generic [ref=e68]: Enrolled Courses
        - generic [ref=e69]:
          - generic [ref=e70]: ✅
          - generic [ref=e71]:
            - generic [ref=e72]: "6"
            - generic [ref=e73]: Completed
        - generic [ref=e74]:
          - generic [ref=e75]: 📋
          - generic [ref=e76]:
            - generic [ref=e77]: "2"
            - generic [ref=e78]: Pending Tasks
        - generic [ref=e79]:
          - generic [ref=e80]: 🏆
          - generic [ref=e81]:
            - generic [ref=e82]: 89%
            - generic [ref=e83]: Avg. Progress
      - generic [ref=e84]:
        - generic [ref=e85]:
          - generic [ref=e86]:
            - heading "Get to know Today's Instructor" [level=3] [ref=e87]
            - paragraph [ref=e88]: Friday, October 2, 2026
          - generic [ref=e89]: 1 session today
        - generic [ref=e92]:
          - generic [ref=e95]:
            - generic [ref=e96]: lubabalo Mkhize
            - generic [ref=e97]: Foundation and Basics - Selenium Java • 18:00 - 20:00
          - paragraph [ref=e98]: Software Test Automation Instructor passionate about helping others learn testing through practical, hands-on experience. Lets build, test and grow together.
          - generic [ref=e99]:
            - generic [ref=e100]: "0820648922"
            - link "LinkedIn" [ref=e101] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/lubabalo-thamsanqa-mkhize-72214a9b/
          - link "Join Now" [ref=e102] [cursor=pointer]:
            - /url: https://teams.microsoft.com/meet/3334001235054611?p=keBylUBNFnqyatSxI2
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]:
            - generic [ref=e106]:
              - generic [ref=e107]: 📚
              - generic [ref=e108]:
                - heading "My Courses" [level=3] [ref=e109]
                - paragraph [ref=e110]: 7 courses enrolled
            - button "View All →" [ref=e111] [cursor=pointer]
          - generic [ref=e112]:
            - generic [ref=e113]:
              - generic [ref=e114]: AA
              - generic [ref=e115]:
                - generic [ref=e116]: Advanced Automation- Perfomance and Playwright
                - generic [ref=e117]: ⏳ In Progress
              - generic [ref=e118]: 25%
            - generic [ref=e120]:
              - generic [ref=e121]: FA
              - generic [ref=e122]:
                - generic [ref=e123]: Foundation and Basics - Selenium Java
                - generic [ref=e124]: ✓ Completed
              - generic [ref=e125]: 100%
            - generic [ref=e127]:
              - generic [ref=e128]: PI
              - generic [ref=e129]:
                - generic [ref=e130]: Python Integration - Selenium with Python
                - generic [ref=e131]: ✓ Completed
              - generic [ref=e132]: 100%
            - generic [ref=e134]:
              - generic [ref=e135]: MA
              - generic [ref=e136]:
                - generic [ref=e137]: Mobile Automation(Android ,IOS and Huawei)
                - generic [ref=e138]: ✓ Completed
              - generic [ref=e139]: 100%
            - generic [ref=e141]:
              - generic [ref=e142]: AW
              - generic [ref=e143]:
                - generic [ref=e144]: Advanced Web Testing - Cucumber (BDD framework)
                - generic [ref=e145]: ✓ Completed
              - generic [ref=e146]: 100%
            - generic [ref=e148]:
              - generic [ref=e149]: AT
              - generic [ref=e150]:
                - generic [ref=e151]: API Testing Mastery (Postman and Rest Assured)
                - generic [ref=e152]: ✓ Completed
              - generic [ref=e153]: 100%
            - generic [ref=e155]:
              - generic [ref=e156]: FA
              - generic [ref=e157]:
                - generic [ref=e158]: Foundation and Basics - Selenium Java
                - generic [ref=e159]: ✓ Completed
              - generic [ref=e160]: 100%
        - generic [ref=e162]:
          - generic [ref=e163]:
            - generic [ref=e164]:
              - generic [ref=e165]: 📋
              - generic [ref=e166]:
                - heading "My Tasks" [level=3] [ref=e167]
                - paragraph [ref=e168]: 2 pending · 6 done
            - button "🔄 Refresh" [ref=e169] [cursor=pointer]:
              - generic [ref=e170]: 🔄
              - text: Refresh
          - generic [ref=e171]:
            - button "⏳ Active 2" [ref=e172] [cursor=pointer]
            - button "✅ Completed 6" [ref=e173] [cursor=pointer]
          - generic [ref=e174]:
            - generic [ref=e177]:
              - generic [ref=e178]:
                - generic [ref=e179]:
                  - generic "Overdue" [ref=e180]: 🚨
                  - generic [ref=e181]: Using playwright Typescript Create an invoice to yourself
                - paragraph [ref=e182]: Login with admin user navigate to admin panel click invoices Create invoice to yourself, client name as, your name pty ldt enter your fake address click add course(repeat 4 times) select any 4 courses enter any description validate R2800 as total due date to be the last day of June select status as paid click create invoice validate your invoice is created
                - button "Show more details" [ref=e183] [cursor=pointer]
                - generic [ref=e184]: "⏰ Overdue: 6/30/2026"
                - generic [ref=e185]: 📦 Repo required
              - button "✓ Complete" [ref=e187] [cursor=pointer]
            - generic [ref=e190]:
              - generic [ref=e191]:
                - generic [ref=e192]:
                  - generic "Overdue" [ref=e193]: 🚨
                  - generic [ref=e194]: Upload a profile picture
                - paragraph [ref=e195]: "Important note: - Please choose any framework and language of your choice to achieve this task - Please provide a detailed readme file - create a repo and make sure you push more than once - Your solution must execute on pipeline (GitHub actions) - Trigger your tests to run daily midnight SAST - Your solution must have a clear report - your solution must have screenshots UI Instructions 1. login to ndosi automation test site 2. Click menu 3. click my profile 4. click edit profile 5. upload a new profile picture 6. Ensure the profile picture is updated API Instructions 1. find all endpoints you interacted with on the UI instructions 2. Validate the response codes for each endpoint"
                - button "Show more details" [ref=e196] [cursor=pointer]
                - generic [ref=e197]: "⏰ Overdue: 9/30/2026"
                - generic [ref=e198]: 📦 Repo required
              - button "✓ Complete" [ref=e200] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../src/pages/LoginPage';
  3   | import { ProfilePage } from '../src/pages/ProfilePage';
  4   | import { ApiValidator } from '../src/utils/api-validator';
  5   | import { ReportGenerator, TestStep } from '../src/utils/report-generator';
  6   | import { environment } from '../config/environment.config';
  7   | import path from 'path';
  8   | import fs from 'fs';
  9   | 
  10  | const TEST_EMAIL = environment.testEmail;
  11  | const TEST_PASSWORD = environment.testPassword;
  12  | 
  13  | test.describe('Ndosi Profile Picture Update Flow', () => {
  14  |   let loginPage: LoginPage;
  15  |   let profilePage: ProfilePage;
  16  |   let apiValidator: ApiValidator;
  17  |   let reportGenerator: ReportGenerator;
  18  |   let testSteps: TestStep[] = [];
  19  |   let startTime: number;
  20  | 
  21  |   test.beforeEach(async ({ page }) => {
  22  |     loginPage = new LoginPage(page);
  23  |     profilePage = new ProfilePage(page);
  24  |     apiValidator = new ApiValidator();
  25  |     reportGenerator = new ReportGenerator();
  26  |     testSteps = [];
  27  |     startTime = Date.now();
  28  | 
  29  |     // Capture all API calls made during the test
  30  |     page.on('response', async (response) => {
  31  |       const url = response.url();
  32  |       if (
  33  |         url.includes('/api/') ||
  34  |         url.includes('/profile/') ||
  35  |         url.includes('/user/') ||
  36  |         url.includes('/upload') ||
  37  |         url.includes('/image') ||
  38  |         url.includes('/media')
  39  |       ) {
  40  |         apiValidator.addApiCall({
  41  |           url: url,
  42  |           method: response.request().method(),
  43  |           status: response.status(),
  44  |           timestamp: new Date().toISOString(),
  45  |           duration: 0,
  46  |         });
  47  |         console.log(`📡 API: ${response.request().method()} ${url} - Status: ${response.status()}`);
  48  |       }
  49  |     });
  50  | 
  51  |     // Log browser console messages for debugging
  52  |     page.on('console', (msg) => {
  53  |       console.log(`🌐 Browser Console: ${msg.text()}`);
  54  |     });
  55  |   });
  56  | 
  57  |   test('should upload profile picture and validate APIs', async ({ page }) => {
  58  |     // ═══════════════════════════════════════════════════════════
  59  |     // Step 1: Navigate to the Ndosi practice page
  60  |     // ═══════════════════════════════════════════════════════════
  61  |     console.log('\n🔐 Step 1: Navigating to Ndosi site...');
  62  |     await loginPage.goto();
  63  |     await page.screenshot({ path: 'test-results/01-login-page.png' });
  64  |     testSteps.push({
  65  |       name: 'Navigate to login page',
  66  |       status: 'passed',
  67  |       duration: Date.now() - startTime,
  68  |       timestamp: new Date().toISOString(),
  69  |       screenshot: '01-login-page.png',
  70  |     });
  71  | 
  72  |     // ═══════════════════════════════════════════════════════════
  73  |     // Step 2: Login with credentials
  74  |     // ═══════════════════════════════════════════════════════════
  75  |     console.log(`🔑 Step 2: Logging in as ${TEST_EMAIL}...`);
  76  |     await loginPage.login(TEST_EMAIL, TEST_PASSWORD);
  77  |     await page.screenshot({ path: 'test-results/02-after-login.png' });
  78  | 
  79  |     const isLoggedIn = await loginPage.isLoggedIn();
> 80  |     expect(isLoggedIn).toBeTruthy();
      |                        ^ Error: expect(received).toBeTruthy()
  81  |     console.log('✅ Login successful');
  82  | 
  83  |     testSteps.push({
  84  |       name: 'Login to application',
  85  |       status: 'passed',
  86  |       duration: Date.now() - startTime,
  87  |       timestamp: new Date().toISOString(),
  88  |       screenshot: '02-after-login.png',
  89  |     });
  90  | 
  91  |     // ═══════════════════════════════════════════════════════════
  92  |     // Step 3: Click the menu button
  93  |     // ═══════════════════════════════════════════════════════════
  94  |     console.log('📋 Step 3: Opening menu...');
  95  |     await profilePage.clickMenu();
  96  |     await page.screenshot({ path: 'test-results/03-menu-open.png' });
  97  |     testSteps.push({
  98  |       name: 'Open menu',
  99  |       status: 'passed',
  100 |       duration: Date.now() - startTime,
  101 |       timestamp: new Date().toISOString(),
  102 |       screenshot: '03-menu-open.png',
  103 |     });
  104 | 
  105 |     // ═══════════════════════════════════════════════════════════
  106 |     // Step 4: Navigate to My Profile
  107 |     // ═══════════════════════════════════════════════════════════
  108 |     console.log('👤 Step 4: Navigating to My Profile...');
  109 |     await profilePage.clickMyProfile();
  110 |     await page.screenshot({ path: 'test-results/04-profile-page.png' });
  111 |     testSteps.push({
  112 |       name: 'Navigate to My Profile',
  113 |       status: 'passed',
  114 |       duration: Date.now() - startTime,
  115 |       timestamp: new Date().toISOString(),
  116 |       screenshot: '04-profile-page.png',
  117 |     });
  118 | 
  119 |     // ═══════════════════════════════════════════════════════════
  120 |     // Step 5: Click Edit Profile
  121 |     // ═══════════════════════════════════════════════════════════
  122 |     console.log('✏️ Step 5: Opening Edit Profile...');
  123 |     await profilePage.clickEditProfile();
  124 |     await page.screenshot({ path: 'test-results/05-edit-profile.png' });
  125 |     testSteps.push({
  126 |       name: 'Click Edit Profile',
  127 |       status: 'passed',
  128 |       duration: Date.now() - startTime,
  129 |       timestamp: new Date().toISOString(),
  130 |       screenshot: '05-edit-profile.png',
  131 |     });
  132 | 
  133 |     // ═══════════════════════════════════════════════════════════
  134 |     // Step 6: Upload a new profile picture
  135 |     // ═══════════════════════════════════════════════════════════
  136 |     console.log('📤 Step 6: Uploading profile picture...');
  137 | 
  138 |     // Get the initial profile picture source
  139 |     const initialSrc = await profilePage.getProfilePictureSrc();
  140 |     console.log(`📸 Initial profile picture: ${initialSrc}`);
  141 | 
  142 |     // Path to the test image
  143 |     const imagePath = path.join(__dirname, '../fixtures/test-image.png');
  144 | 
  145 |     // Verify image exists
  146 |     if (!fs.existsSync(imagePath)) {
  147 |       throw new Error(`Test image not found at: ${imagePath}`);
  148 |     }
  149 | 
  150 |     // Upload the picture
  151 |     await profilePage.uploadProfilePicture(imagePath);
  152 |     await page.screenshot({ path: 'test-results/06-after-upload.png' });
  153 |     testSteps.push({
  154 |       name: 'Upload profile picture',
  155 |       status: 'passed',
  156 |       duration: Date.now() - startTime,
  157 |       timestamp: new Date().toISOString(),
  158 |       screenshot: '06-after-upload.png',
  159 |     });
  160 | 
  161 |     // ═══════════════════════════════════════════════════════════
  162 |     // Step 7: Verify profile picture was updated
  163 |     // ═══════════════════════════════════════════════════════════
  164 |     console.log('⏳ Step 7: Verifying profile update...');
  165 |     await profilePage.waitForProfileUpdate();
  166 | 
  167 |     const updatedSrc = await profilePage.getProfilePictureSrc();
  168 |     console.log(`📸 Updated profile picture: ${updatedSrc}`);
  169 | 
  170 |     // Verify the image source changed
  171 |     expect(updatedSrc).not.toBe(initialSrc);
  172 |     console.log('✅ Profile picture updated successfully');
  173 | 
  174 |     await page.screenshot({ path: 'test-results/07-profile-updated.png' });
  175 |     testSteps.push({
  176 |       name: 'Verify profile picture updated',
  177 |       status: 'passed',
  178 |       duration: Date.now() - startTime,
  179 |       timestamp: new Date().toISOString(),
  180 |       screenshot: '07-profile-updated.png',
```