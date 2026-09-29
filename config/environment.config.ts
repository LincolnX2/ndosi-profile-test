export interface EnvironmentConfig {
  env: 'local' | 'dev' | 'staging' | 'production';
  baseUrl: string;
  apiBaseUrl: string;
  testEmail: string;
  testPassword: string;
  timeout: number;
  retries: number;
}

export const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = (process.env.TEST_ENV || 'staging') as EnvironmentConfig['env'];
  
  const configs: Record<EnvironmentConfig['env'], EnvironmentConfig> = {
    local: {
      env: 'local',
      baseUrl: 'http://localhost:3000',
      apiBaseUrl: 'http://localhost:3000/api',
      testEmail: process.env.TEST_EMAIL || 'sabur.yinus@gmail.com',
      testPassword: process.env.TEST_PASSWORD || 'olamilekan@11',
      timeout: 60000,
      retries: 0,
    },
    dev: {
      env: 'dev',
      baseUrl: 'https://dev-ndosiautomation.co.za',
      apiBaseUrl: 'https://dev-ndosiautomation.co.za/api',
      testEmail: process.env.TEST_EMAIL || 'sabur.yinus@gmail.com',
      testPassword: process.env.TEST_PASSWORD || 'olamilekan@11',
      timeout: 60000,
      retries: 1,
    },
    staging: {
      env: 'staging',
      baseUrl: 'https://staging-ndosiautomation.co.za',
      apiBaseUrl: 'https://staging-ndosiautomation.co.za/api',
      testEmail: process.env.TEST_EMAIL || 'sabur.yinus@gmail.com',
      testPassword: process.env.TEST_PASSWORD || 'olamilekan@11',
      timeout: 60000,
      retries: 2,
    },
    production: {
      env: 'production',
      baseUrl: 'https://ndosisimplifiedautomation.vercel.app/#practice',
      apiBaseUrl: 'https://ndosisimplifiedautomation.vercel.app/#practice/api',
      testEmail: process.env.TEST_EMAIL || 'admin@gmail.com',
      testPassword: process.env.TEST_PASSWORD || '@12345678',
      timeout: 90000,
      retries: 3,
    },
  };
  
  return configs[env];
};

export const environment = getEnvironmentConfig();