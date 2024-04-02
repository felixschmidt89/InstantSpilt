// React and Third-Party Libraries
import { renderHook } from "@testing-library/react-hooks";

// Hook
import useIsNotoEmojiFontLoaded from "./useIsNotoEmojiFontLoaded";

jest.mock("fontfaceobserver", () => {
  return jest.fn().mockImplementation(() => {
    return {
      load: jest.fn().mockResolvedValue(undefined),
    };
  });
});

describe("useIsNotoEmojiFontLoaded", () => {
  it("should return true if the 'Noto Emoji' font is loaded", async () => {
    // Render the hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useIsNotoEmojiFontLoaded()
    );

    // Wait for font loading
    await waitForNextUpdate();

    // Assert hook returns true
    expect(result.current).toBe(true);
  });
});
