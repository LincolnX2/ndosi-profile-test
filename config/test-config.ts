export const TestConfig = {
  // Timeouts
  timeouts: {
    pageLoad: 30000,
    elementWait: 15000,
    apiResponse: 10000,
    uploadComplete: 30000,
    navigation: 30000,
  },
  
  // Test data
  testData: {
    email: process.env.TEST_EMAIL || 'sabur.yinus@gmail.com',
    password: process.env.TEST_PASSWORD || 'olamilekan@11',
    testImagePath: 'src/fixtures/test-profile-image.png',
  },
  
  // URLs
  urls: {
    base: process.env.BASE_URL || 'https://ndosiautomation.co.za',
    practice: '/#practice',
    login: '/#practice/login',
    profile: '/#practice/profile',
  },
  
  // Selectors - Update these based on actual website
  selectors: {
    login: {
      email: 'input[type="email"], input[name="email"], input[placeholder*="Email"]',
      password: 'input[type="password"], input[name="password"], input[placeholder*="Password"]',
      submit: 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In")',
      errorMessage: '.error, .alert-danger, [role="alert"]',
      successMessage: '.success, .alert-success',
    },
    profile: {
      menu: 'button[aria-label="Menu"], .menu-button, [role="button"]:has-text("Menu")',
      myProfile: 'a:has-text("My Profile"), a:has-text("Profile"), li:has-text("My Profile")',
      editProfile: 'button:has-text("Edit Profile"), a:has-text("Edit Profile"), button:has-text("Edit")',
      fileInput: 'input[type="file"]',
      profileImage: 'img[alt*="Profile"], img[src*="profile"], .profile-image, .avatar',
      saveButton: 'button:has-text("Save"), button:has-text("Update"), button[type="submit"]',
      successMessage: '.success-message, .alert-success, [role="status"]',
      loadingIndicator: '.loading, .spinner, [role="progressbar"]',
    },
  },
  
  // API endpoints
  apiEndpoints: {
    login: '/api/login',
    profile: '/api/profile',
    upload: '/api/upload',
    user: '/api/user',
    image: '/api/image',
    media: '/api/media',
  },
};