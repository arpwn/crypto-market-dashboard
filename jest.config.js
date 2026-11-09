export default {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/tests/**/*.test.tsx"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          target: "ES2022",
          module: "CommonJS",
          jsx: "react-jsx",
          esModuleInterop: true,
          verbatimModuleSyntax: false,
          isolatedModules: true,
        },
      },
    ],
  },
  moduleNameMapper: { "\\.(css|less|scss)$": "identity-obj-proxy" },
};
