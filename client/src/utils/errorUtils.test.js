// Constants and Utils
import { devLog } from "./errorUtils";

// Mocking the console.log and console.error methods for devLog
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("devLog", () => {
  // Clear the mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should log message without data in development environment", () => {
    // Set NODE_ENV to development
    process.env.NODE_ENV = "development";

    // Act
    devLog("Test message");

    // Assert
    expect(mockConsoleLog).toHaveBeenCalledWith("Test message");
  });

  test("should log message with data in development environment", () => {
    // Set NODE_ENV to development
    process.env.NODE_ENV = "development";

    // Act
    devLog("Test message with data", { key: "value" });

    // Assert
    expect(mockConsoleLog).toHaveBeenCalledWith("Test message with data", {
      key: "value",
    });
  });

  test("should log error message in development environment", () => {
    // Set NODE_ENV to development
    process.env.NODE_ENV = "development";

    // Create a sample error
    const error = new Error("Test error");

    // Act
    devLog("Test error message", error);

    // Assert
    expect(mockConsoleError).toHaveBeenCalledWith("Test error message", error);
  });

  test("should not log in non-development environment", () => {
    // Set NODE_ENV to production
    process.env.NODE_ENV = "production";

    // Act
    devLog("Test message");

    // Assert
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });
});
