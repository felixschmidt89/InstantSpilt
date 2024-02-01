export default {
  // Specifies the test environment to be jest-environment-jsdom, which emulates a browser-like environment for testing React components.
  testEnvironment: "jest-environment-jsdom",

  // Configures the transformation process for JavaScript and JSX files using babel-jest.
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
