// React and Third-Party Libraries
import { renderHook } from "@testing-library/react-hooks";

// Hook
import useIsSlimDevice from "./useIsSlimDevice";

describe("useIsSlimDevice", () => {
  it("should return true for isSlimDevice if the device width is <= 500px", () => {
    // Mock window resize
    const { innerWidth } = window;
    window.innerWidth = 500;

    const { result } = renderHook(() => useIsSlimDevice());

    // Assert isSlimDevice is true
    expect(result.current.isSlimDevice).toBe(true);

    // Reset window size
    window.innerWidth = innerWidth;
  });

  it("should return false for isSlimDevice if the device width is > 500px", () => {
    const { innerWidth } = window;
    window.innerWidth = 501;

    const { result } = renderHook(() => useIsSlimDevice());

    expect(result.current.isSlimDevice).toBe(false);

    window.innerWidth = innerWidth;
  });

  it("should return true for isVerySlimDevice if the device width is <= 400px", () => {
    const { innerWidth } = window;
    window.innerWidth = 400;

    const { result } = renderHook(() => useIsSlimDevice());

    expect(result.current.isVerySlimDevice).toBe(true);

    window.innerWidth = innerWidth;
  });

  it("should return false for isVerySlimDevice if the device width is > 400px", () => {
    const { innerWidth } = window;
    window.innerWidth = 401;

    const { result } = renderHook(() => useIsSlimDevice());

    expect(result.current.isVerySlimDevice).toBe(false);

    window.innerWidth = innerWidth;
  });
});
