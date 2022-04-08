import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['**\/src\/**\/*\.spec\.ts'],
  collectCoverageFrom: ['**/src/**'],
  coveragePathIgnorePatterns: [ '<rootDir>/src/index.ts' ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    ['text', { skipFull: true }]
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}

export default config
