process.env.NODE_ENV = 'test';

module.exports = {
  roots: ['src', 'test'],
  forceExit: true,
  testMatch: [
    '**/test/**/*.spec.js',
    '**/test/**/*.it.js',
    '**/test/**/*.test.js',
    '**/test/**/*.e2e.js',
  ],
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  moduleDirectories: ['node_modules'],
  //preset: 'jest',
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // }
};
