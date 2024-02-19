// Jest test for validateAndProcessAmountInput function

import { validateAndProcessAmountInput } from "./formatUtils";

describe("validateAndProcessAmountInput", () => {
  it("should remove spaces and any non-number character, replace comma with dot, and only allow one dot at most and allow only 2 decimal places", () => {
    // Test cases

    // Case 1: Basic valid input
    expect(validateAndProcessAmountInput("123")).toBe("123");

    // Case 2a: Input with leading and trailing spaces
    expect(validateAndProcessAmountInput("  456  ")).toBe("456");

    // Case 2b: Input with leading spaces
    expect(validateAndProcessAmountInput("  456")).toBe("456");

    // Case 2c: Input with trailing spaces
    expect(validateAndProcessAmountInput("456  ")).toBe("456");

    // Case 2d: Input with intermediate spaces
    expect(validateAndProcessAmountInput("4  56  ")).toBe("456");

    // Case 3: Input with commas
    expect(validateAndProcessAmountInput("12,34")).toBe("12.34");

    // Case 4: Input with multiple dots
    expect(validateAndProcessAmountInput("1.2.3")).toBe("12.3");

    // Case 5: Input with invalid characters
    expect(validateAndProcessAmountInput("5TEVE")).toBe("5");

    // Case 6: Input with 2 commas
    expect(validateAndProcessAmountInput("1,2,3")).toBe("12.3");

    // Case 8: Empty input
    expect(validateAndProcessAmountInput("")).toBe("");

    // Case 9: Input with comma at the end
    expect(validateAndProcessAmountInput("123,")).toBe("123.");

    // Case 10: Input with both dot and comma
    expect(validateAndProcessAmountInput("1.234,56")).toBe("1234.56");
    // Case 11: Input with letters only
    expect(validateAndProcessAmountInput("Steve")).toBe("");
    // Case 12: Input with 3+ decimal places after comma
    expect(validateAndProcessAmountInput("1,3456789")).toBe("1.34");
    // Case 13: Input with 3+ decimal places after dot
    expect(validateAndProcessAmountInput("1.3456789")).toBe("1.34");

    console.log("All validateAndProcessAmountInput tests passed");
  });
});
