import * as path from 'path';

module.exports = {
    preset: 'ts-jest',
    verbose: Boolean(process.env.CI),
    rootDir: path.resolve('.'),
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    setupFilesAfterEnv: ['<rootDir>/setupTest.ts'],
    testMatch: [
        '<rootDir>/tests/**/*.test.ts',
        '<rootDir>/tests/**/*.test.tsx',
    ],
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
    },
};
