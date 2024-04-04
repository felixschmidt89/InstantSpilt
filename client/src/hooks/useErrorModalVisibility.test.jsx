// React and Third-Party Libraries
import { renderHook, act } from "@testing-library/react-hooks";

// Hooks
import useErrorModalVisibility from "./useErrorModalVisibility";

describe("useErrorModalVisibility", () => {
  it("should initialize with isErrorModalVisible set to false", () => {
    const { result } = renderHook(() => useErrorModalVisibility());

    expect(result.current.isErrorModalVisible).toBe(false);
  });

  it("should set isErrorModalVisible to true when displayErrorModal is called", () => {
    const { result } = renderHook(() => useErrorModalVisibility());

    act(() => {
      result.current.displayErrorModal();
    });

    expect(result.current.isErrorModalVisible).toBe(true);
  });

  it("should set isErrorModalVisible to false when handleCloseErrorModal is called", () => {
    const { result } = renderHook(() => useErrorModalVisibility());

    // First, set isErrorModalVisible to true
    act(() => {
      result.current.displayErrorModal();
    });

    // Then, close the error modal
    act(() => {
      result.current.handleCloseErrorModal();
    });

    expect(result.current.isErrorModalVisible).toBe(false);
  });
});
