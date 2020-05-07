module.exports = {
  // preset: 'ts-jest',
  // testEnvironment: 'node',
  // verbose: true,
  // rootDir: './test',
  //
  // collectCoverage: true,
  // coverageDirectory: './coverage',
  // collectCoverageFrom: ['./src/**/*.ts'],

  preset: 'ts-jest',
  verbose: true,
  roots: [
    '<rootDir>/src/',
    '<rootDir>/test'
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "ts",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts}',
    '!**/node_modules/**',
    '!**/webpack**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  testEnvironment: 'node',
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/"
  ]
};