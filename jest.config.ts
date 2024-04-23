import type { Config } from 'jest';

const getCoverageThreshold = (envVar: string, defaultValue: number): number => {
  const value = Number(process.env[envVar]);
  return isNaN(value) ? defaultValue : value;
};

const config: Config = {
  collectCoverage: true,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    "uuid": require.resolve('uuid'),  
  },
  coverageThreshold: {
    global: {
      branches: getCoverageThreshold('COVERAGE_BRANCHES', 90),
      functions: getCoverageThreshold('COVERAGE_FUNCTIONS', 90),
      lines: getCoverageThreshold('COVERAGE_LINES', 90),
      statements: getCoverageThreshold('COVERAGE_STATEMENTS', 90),
    }
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  coveragePathIgnorePatterns: [
    "./src/electron/main.ts",
  ],
  testPathIgnorePatterns: [
    "./tests/e2e",
  ]
};

export default config;
