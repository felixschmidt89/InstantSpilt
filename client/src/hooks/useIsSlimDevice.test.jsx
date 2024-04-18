// React and Third-Party Libraries
import { renderHook } from "@testing-library/react-hooks";

// Hook
import useIsSlimDevice from "./useIsSlimDevice";

describe("useIsSlimDevice", () => {
  it("should return true if the device width is <= 500px", () => {
    // Mock window resize
    const { innerWidth } = window;
    window.innerWidth = 600;

    const { result } = renderHook(() => useIsSlimDevice());

    // Assert hook returns true
    expect(result.current).toBe(true);

    // Reset window size
    window.innerWidth = innerWidth;
  });

  it("should return false if the device width is > 500px", () => {
    // Mock window resize
    const { innerWidth } = window;
    window.innerWidth = 601;

    // Render the hook
    const { result } = renderHook(() => useIsSlimDevice());

    // Assert hook returns false
    expect(result.current).toBe(false);

    // Reset window size
    window.innerWidth = innerWidth;
  });
});
