export default {
  testEnvironment: 'jsdom',  // Makes Jest simulate a browser environment
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Adds jest-dom matchers
  testMatch: ['**/__tests__/**/*.test.jsx', '**/?(*.)+(spec|test).jsx'], // Where your tests are
  transform: {
    '^.+\\.jsx?$': 'babel-jest',  // Use babel-jest to transform JS and JSX files
  },
  moduleFileExtensions: ['js', 'jsx'], // File extensions to look for
};
