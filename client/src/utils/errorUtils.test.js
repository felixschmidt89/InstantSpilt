// Constants and Utils
import { StatusCodes } from "http-status-codes";
import { devLog, handleApiErrorsAndTriggerErrorModal } from "./errorUtils";

// Jest test for devLog function

// Mocking the console.log and console.error methods for devLog
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation();
const mockConsoleError = jest.spyOn(console, "error").mockImplementation();

describe("devLog", () => {
  // Clear mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  // DEV ENVIRONMENT
  it("should console log message without data", () => {
    process.env.NODE_ENV = "development";

    // Act
    devLog("Test message");

    // Assert
    expect(mockConsoleLog).toHaveBeenCalledWith("Test message");
  });

  it("should console log message with data", () => {
    process.env.NODE_ENV = "development";

    // Act
    devLog("Test message with data", { key: "value" });

    // Assert
    expect(mockConsoleLog).toHaveBeenCalledWith("Test message with data", {
      key: "value",
    });
  });

  it("should error log error message", () => {
    process.env.NODE_ENV = "development";

    const error = new Error("Test error");

    // Act
    devLog("Test error message", error);

    // Assert
    expect(mockConsoleError).toHaveBeenCalledWith("Test error message", error);
  });

  // PRODUCTION ENVIRONMENT
  it("should not console log in production environment", () => {
    process.env.NODE_ENV = "production";

    // Act
    devLog("Test message");

    // Assert
    expect(mockConsoleLog).not.toHaveBeenCalled();
  });

  it("should not error log in production environment", () => {
    process.env.NODE_ENV = "production";

    const error = new Error("Test error");

    // Act
    devLog("Test error message", error);

    // Assert
    expect(mockConsoleError).not.toHaveBeenCalled();
  });
});
