import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { smoothScrollTo } from "./scroll";

describe("smoothScrollTo utility", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    vi.restoreAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("does nothing when target element is not found in DOM", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    smoothScrollTo("non-existent-section");

    expect(scrollToSpy).not.toHaveBeenCalled();
  });

  it("dispatches to global Lenis instance when present on window", () => {
    const targetElement = document.createElement("section");
    targetElement.id = "projects";
    document.body.appendChild(targetElement);

    const lenisScrollToMock = vi.fn();
    (window as unknown as { __lenis?: { scrollTo: typeof lenisScrollToMock } }).__lenis = {
      scrollTo: lenisScrollToMock,
    };

    smoothScrollTo("projects", -50);

    expect(lenisScrollToMock).toHaveBeenCalledWith(
      targetElement,
      expect.objectContaining({
        offset: -50,
        duration: 1.2,
      })
    );

    delete (window as unknown as { __lenis?: unknown }).__lenis;
  });

  it("falls back to native window.scrollTo when Lenis is not available", () => {
    const targetElement = document.createElement("section");
    targetElement.id = "skills";
    vi.spyOn(targetElement, "getBoundingClientRect").mockReturnValue({
      top: 500,
      left: 0,
      bottom: 800,
      right: 1000,
      width: 1000,
      height: 300,
      x: 0,
      y: 500,
      toJSON: () => {},
    });
    document.body.appendChild(targetElement);

    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    smoothScrollTo("#skills", 20);

    expect(scrollToSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        top: 520,
        behavior: "smooth",
      })
    );
  });
});
