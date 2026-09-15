import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProfilePage } from '../src/pages/ProfilePage';
import { ApiValidator } from '../src/utils/api-validator';
import { ReportGenerator, TestStep } from '../src/utils/report-generator';
import { environment } from '../config/environment.config';
import path from 'path';
import fs from 'fs';

const TEST_EMAIL = environment.testEmail;
const TEST_PASSWORD = environment.testPassword;

test.describe('Ndosi Profile Picture Update Flow', () => {
  let loginPage: LoginPage;
  let profilePage: ProfilePage;
  let apiValidator: ApiValidator;
  let reportGenerator: ReportGenerator;
  let testSteps: TestStep[] = [];
  let startTime: number;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);
    apiValidator = new ApiValidator();
    reportGenerator = new ReportGenerator();
    testSteps = [];
    startTime = Date.now();
  });

  test('should upload profile picture and validate APIs', async ({ page }) => {
    // Your test code here
  });
});