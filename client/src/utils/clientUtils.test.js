// Constants and Utils
import {
  isWebShareAPISupported,
  checkModalClosureUserActionExpiration,
} from "./clientUtils";

// Jest test for isWebShareAPISupported function

// Mock console.log and console.error methods
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("isWebShareAPISupported", () => {
  // Clear mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  // DEV ENVIRONMENT
  it("should return true and log message if Web Share API is supported", () => {
    process.env.NODE_ENV = "development";

    Object.defineProperty(global.navigator, "share", {
      // Mock function for simulating navigator.share behavior
      value: jest.fn(),
      // Allow modification of navigator.share during the test
      writable: true,
    });

    // Act
    const result = isWebShareAPISupported();

    // Assert
    expect(result).toBe(true);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "User's device supports Web Share API:",
      true
    );
  });

  it("should return false and log if Web Share API is not supported", () => {
    process.env.NODE_ENV = "development";

    Object.defineProperty(global.navigator, "share", {
      value: undefined,
      writable: true,
    });

    // Act
    const result = isWebShareAPISupported();

    // Assert
    expect(result).toBe(false);
    expect(mockConsoleLog).toHaveBeenCalledWith(
      "User's device supports Web Share API:",
      false
    );
  });

  // PRODUCTION ENVIRONMENT
  it("should return false and not log if Web Share API is not supported", () => {
    process.env.NODE_ENV = "production";

    Object.defineProperty(global.navigator, "share", {
      value: undefined,
      writable: true,
    });

    // Act
    const result = isWebShareAPISupported();

    // Assert
    expect(result).toBe(false);
    expect(mockConsoleError).not.toHaveBeenCalled();
  });

  it("should return true and not log if Web Share API is not supported", () => {
    process.env.NODE_ENV = "production";

    Object.defineProperty(global.navigator, "share", {
      value: jest.fn(),
      writable: true,
    });

    // Act
    const result = isWebShareAPISupported();

    // Assert
    expect(result).toBe(true);
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });
});

// Jest test for checkModalClosureUserActionExpiration function

describe("checkModalClosureUserActionExpiration", () => {
  it("should return user closure action cannot be found", () => {
    // Mock localStorage.getItem to return null, simulating no user action recorded
    jest.spyOn(window.localStorage.__proto__, "getItem").mockReturnValue(null);
    const result = checkModalClosureUserActionExpiration();

    expect(result).toBe(true);
  });

  it("should return true if user closure action was more than 24 hours ago", () => {
    const currentTimeStamp = Date.now();
    const twentyFiveHoursAgo = currentTimeStamp - 25 * 60 * 60 * 1000;
    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue(twentyFiveHoursAgo.toString());
    const result = checkModalClosureUserActionExpiration();
    expect(result).toBe(true);
  });

  it("should return false if user action was less than 24 hours ago", () => {
    const currentTimeStamp = Date.now();
    const twentyThreeHoursAgo = currentTimeStamp - 23 * 60 * 60 * 1000 + 1;

    jest
      .spyOn(window.localStorage.__proto__, "getItem")
      .mockReturnValue(twentyThreeHoursAgo.toString());
    const result = checkModalClosureUserActionExpiration();
    expect(result).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
