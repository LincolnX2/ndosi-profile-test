export type EnvironmentName = 'local' | 'dev' | 'staging' | 'production';

export interface EnvironmentConfig {
  env: EnvironmentName;
  baseUrl: string;
  apiBaseUrl: string;
  testEmail: string;
  testPassword: string;
  timeout: number;
  retries: number;
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = (process.env.TEST_ENV ?? 'staging') as EnvironmentName;

  const configs: Record<EnvironmentName, EnvironmentConfig> = {
    local: {
      env: 'local',
      baseUrl: 'http://localhost:3000',
      apiBaseUrl: 'http://localhost:3000/api',
      testEmail: process.env.TEST_EMAIL || '',
      testPassword: process.env.TEST_PASSWORD || '',
      timeout: 60000,
      retries: 0,
    },
    dev: {
      env: 'dev',
      baseUrl: 'https://dev-ndosiautomation.co.za',
      apiBaseUrl: 'https://dev-ndosiautomation.co.za/api',
      testEmail: process.env.TEST_EMAIL || '',
      testPassword: process.env.TEST_PASSWORD || '',
      timeout: 60000,
      retries: 1,
    },
    staging: {
      env: 'staging',
      baseUrl: 'https://ndosiautomation.co.za',
      apiBaseUrl: 'https://ndosiautomation.co.za/api',
      testEmail: process.env.TEST_EMAIL || '',
      testPassword: process.env.TEST_PASSWORD || '',
      timeout: 60000,
      retries: 2,
    },
    production: {
      env: 'production',
      baseUrl: process.env.BASE_URL || '',
      apiBaseUrl: `${process.env.BASE_URL || ''}/api`,
      testEmail: process.env.TEST_EMAIL || '',
      testPassword: process.env.TEST_PASSWORD || '',
      timeout: 90000,
      retries: 3,
    },
  };

  const config = configs[env];

  // Validate that required credentials are provided
  if (!config.testEmail || !config.testPassword) {
    throw new Error(
      `Missing credentials for environment "${env}". ` +
      `Please set TEST_EMAIL and TEST_PASSWORD in your .env file.`
    );
  }

  if (!config.baseUrl) {
    throw new Error(
      `Missing baseUrl for environment "${env}". ` +
      `Please set BASE_URL in your .env file.`
    );
  }

  return config;
};

export const environment = getEnvironmentConfig();