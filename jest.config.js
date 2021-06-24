module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!__tests__/**/*.js?(x)',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/server/database/migrations',
    '<rootDir>/server/database/seeders',
    '<rootDir>/server/database/models/index.js',
  ],
  testEnvironment: 'node',
};
