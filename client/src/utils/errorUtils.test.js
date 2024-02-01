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

// Jest test for handleApiErrorsAndTriggerErrorModal function

// Mocking the setError and displayErrorModal functions
const mockSetError = jest.fn();
const mockDisplayErrorModal = jest.fn();

describe("handleApiErrorsAndTriggerErrorModal", () => {
  it("should throw an error for invalid error object", () => {
    // Arrange
    const invalidError = null;

    // Act and Assert
    expect(() => {
      handleApiErrorsAndTriggerErrorModal(
        invalidError,
        mockSetError,
        mockDisplayErrorModal
      );
    }).toThrowError("Invalid error object provided.");
  });

  it("should handle UNPROCESSABLE_ENTITY (422) status code", () => {
    // Arrange
    const unprocessableEntityError = {
      response: {
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        data: {
          errors: ["Validation error 1", "Validation error 2"],
        },
      },
    };

    // Act
    handleApiErrorsAndTriggerErrorModal(
      unprocessableEntityError,
      mockSetError,
      mockDisplayErrorModal
    );

    // Assert
    expect(mockSetError).toHaveBeenCalledWith("Validation error 1");
    expect(mockDisplayErrorModal).toHaveBeenCalled();
  });

  it("should handle CONFLICT (409) status code", () => {
    // Arrange
    const conflictError = {
      response: {
        status: StatusCodes.CONFLICT,
        data: {
          message: "Conflict error message",
        },
      },
    };

    // Act
    handleApiErrorsAndTriggerErrorModal(
      conflictError,
      mockSetError,
      mockDisplayErrorModal
    );

    // Assert
    expect(mockSetError).toHaveBeenCalledWith("Conflict error message");
    expect(mockDisplayErrorModal).toHaveBeenCalled();
  });

  it("should handle BAD_REQUEST (400) status code", () => {
    // Arrange
    const badRequestError = {
      response: {
        status: StatusCodes.BAD_REQUEST,
        data: {
          message: "Bad request error message",
        },
      },
    };

    // Act
    handleApiErrorsAndTriggerErrorModal(
      badRequestError,
      mockSetError,
      mockDisplayErrorModal
    );

    // Assert
    expect(mockSetError).toHaveBeenCalledWith("Bad request error message");
    expect(mockDisplayErrorModal).toHaveBeenCalled();
  });
});
