module.exports = {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "transform": {
        "^.+\\.(ts)?$": "ts-jest",
    },
    "testMatch": ["**/*.test.ts"],
    "transformIgnorePatterns": ["./node_modules/"],
    "forceExit": true,
    "clearMocks": true,
    "resetMocks": true,
    "restoreMocks": true
};
