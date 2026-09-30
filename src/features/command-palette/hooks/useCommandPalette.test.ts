import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCommandPalette } from "./useCommandPalette";

describe("useCommandPalette hook", () => {
  const originalOverflow = document.body.style.overflow;

  beforeEach(() => {
    document.body.style.overflow = "";
    vi.restoreAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = originalOverflow;
  });

  it("initializes with isOpen = false", () => {
    const { result } = renderHook(() => useCommandPalette());
    expect(result.current.isOpen).toBe(false);
  });

  it("toggles isOpen on Ctrl+K keyboard shortcut", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
      );
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
      );
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("toggles isOpen on Cmd+K (metaKey) keyboard shortcut", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
      );
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("closes palette on Escape key when open", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => {
      result.current.openPalette();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("locks body overflow and pauses Lenis when open", () => {
    const mockLenis = {
      stop: vi.fn(),
      start: vi.fn(),
    };
    (window as unknown as { __lenis: typeof mockLenis }).__lenis = mockLenis;

    const { result, unmount } = renderHook(() => useCommandPalette());

    act(() => {
      result.current.openPalette();
    });

    expect(document.body.style.overflow).toBe("hidden");
    expect(mockLenis.stop).toHaveBeenCalled();

    act(() => {
      result.current.closePalette();
    });

    expect(document.body.style.overflow).toBe("");
    expect(mockLenis.start).toHaveBeenCalled();

    unmount();
    delete (window as unknown as { __lenis?: typeof mockLenis }).__lenis;
  });
});
