module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,ts}',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|ts)$': 'ts-jest',
  },
};
