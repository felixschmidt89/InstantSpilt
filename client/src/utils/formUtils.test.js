// Jest test for submitOnEnterClick function

import { submitOnEnterClick } from "./formUtils";

describe("submitOnEnterClick", () => {
  test("calls handleFormSubmit when Enter key is pressed", () => {
    // Arrange
    const mockEvent = { key: "Enter" };
    const mockHandleFormSubmit = jest.fn();

    // Act
    submitOnEnterClick(mockEvent, mockHandleFormSubmit);

    // Assert
    expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleFormSubmit).toHaveBeenCalledWith(mockEvent);
  });

  test("does not call handleSubmit when key other than Enter is pressed", () => {
    // Arrange
    const mockEvent = { key: "Space" };
    const mockHandleFormSubmit = jest.fn();

    // Act
    submitOnEnterClick(mockEvent, mockHandleFormSubmit);

    // Assert
    expect(mockHandleFormSubmit).not.toHaveBeenCalled();
  });
});
