import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: [
    '<rootDir>/tests/__mocks__/prisma.ts',
    '<rootDir>/tests/__mocks__/stripe.ts',
  ],
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['./node_modules/'],
}

export default config
