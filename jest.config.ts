import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    globals: {
        "ts-jest": {
            tsConfigFile: "tsconfig.json",
            enableTsDiagnostics: true,
        },
    },

    moduleFileExtensions: ["ts", "tsx", "js"],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        "@root/*": "<rootDir>/src",
        "@v1/*": "<rootDir>/src/v1/*",
        "@routes/*": "<rootDir>/src/v1/routes/*",
        "@controller/*": "<rootDir>/src/v1/controllers/*"
    },

    testEnvironment: "node",

    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },

    transformIgnorePatterns: ["<rootDir>/node_modules/(?!@foo)"],
};

export default config;
