// Third Party Libraries
import { StatusCodes } from "http-status-codes";

// Constants and Utils
import { devLog, handleApiErrors } from "./errorUtils";

// Jest test for devLog function

// Mock console.log and console.error methods for devLog
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

// Jest test for handleApiErrors function
describe("handleApiErrors", () => {
  const mockErrorHandling = (status, message, expectedErrorMessage) => {
    // Mock setError, router, displayErrorModal, and t functions
    const setError = jest.fn();
    const router = "test";
    const displayErrorModal = jest.fn();
    const t = jest.fn((key) => key); // Mock translation function to return key itself

    // Mock error object with response for the specified status code
    const error = {
      response: {
        status,
        data: { message },
      },
    };

    // Call the function
    handleApiErrors(error, setError, router, displayErrorModal, t);

    // Assertions
    expect(setError).toHaveBeenCalledWith(expectedErrorMessage);
    expect(displayErrorModal).toHaveBeenCalled();
  };

  it("should throw an error when invalid error object is provided", () => {
    // Mock setError, router, displayErrorModal, and t functions
    const setError = jest.fn();
    const router = "test";
    const displayErrorModal = jest.fn();
    const t = jest.fn();

    // Call the function with invalid error object
    expect(() => {
      handleApiErrors(null, setError, router, displayErrorModal, t);
    }).toThrow("Invalid error object provided.");
  });

  it("should handle CONFLICT status correctly", () => {
    mockErrorHandling(
      StatusCodes.CONFLICT,
      "Conflict error message",
      "test-router-conflict-error-conflict-error-message"
    );
  });

  it("should handle BAD_REQUEST status correctly", () => {
    mockErrorHandling(
      StatusCodes.BAD_REQUEST,
      "Bad request error message",
      "test-router-bad-request-error-bad-request-error-message"
    );
  });

  it("should handle NOT_FOUND status correctly", () => {
    mockErrorHandling(
      StatusCodes.NOT_FOUND,
      "Not found error message",
      "test-router-not-found-error-not-found-error-message"
    );
  });
});
