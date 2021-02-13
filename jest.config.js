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
  coveragePathIgnorePatterns: [
    'node_modules',
    'node_modules/*',
    'mock',
    'mock/*',
    'src/app.js'
  ],
  verbose: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended','./test/jest.setup.js'],
  moduleFileExtensions: ['js', 'mjs', 'json'],
  moduleDirectories: ['node_modules'],
  //preset: 'jest'
};
