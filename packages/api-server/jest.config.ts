export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {
    '^.+\\.ts?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-node',
  setupFiles: ['dotenv/config'],
  testPathIgnorePatterns: ['/dist/'],
};
