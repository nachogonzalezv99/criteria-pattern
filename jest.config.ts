import type { Config } from "jest";

const config: Config = {
  injectGlobals: true,
  testEnvironment: "node",
  preset: "ts-jest",
  cacheDirectory: ".tmp/jestCache",
};

export default config;