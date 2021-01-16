process.env.NODE_ENV = 'test';

module.exports = {
  roots: ['src', 'test'],
  forceExit: true,
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.it.ts',
    '**/test/**/*.test.ts',
    '**/test/**/*.e2e.ts',
  ],
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  moduleDirectories: ['node_modules'],
  preset: 'jest',
  // transform: {
  //   "^.+\\.tsx?$": "ts-jest"
  // }
};
