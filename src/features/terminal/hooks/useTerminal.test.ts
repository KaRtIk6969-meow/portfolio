import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useTerminal } from "./useTerminal";

describe("useTerminal hook", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("initializes with closed state and default system welcome message", () => {
    const { result } = renderHook(() => useTerminal());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.entries.length).toBeGreaterThan(0);
    expect(result.current.entries[0].command).toBe("system-init");
  });

  it("toggles open and closed states cleanly", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.openTerminal();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeTerminal();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggleTerminal();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("executes valid commands and appends entries", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.handleCommandSubmit("whoami");
    });

    const lastEntry = result.current.entries[result.current.entries.length - 1];
    expect(lastEntry.command).toBe("whoami");
    expect(lastEntry.isError).toBeFalsy();
  });

  it("handles unknown commands gracefully with isError flag", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.handleCommandSubmit("invalidcommandxyz");
    });

    const lastEntry = result.current.entries[result.current.entries.length - 1];
    expect(lastEntry.command).toBe("invalidcommandxyz");
    expect(lastEntry.isError).toBe(true);
  });

  it("clears entries when clear command is executed", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.handleCommandSubmit("date");
    });
    expect(result.current.entries.length).toBeGreaterThan(1);

    act(() => {
      result.current.handleCommandSubmit("clear");
    });
    expect(result.current.entries.length).toBe(0);
  });

  it("supports command history navigation with ArrowUp and ArrowDown", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.handleCommandSubmit("echo first");
    });
    act(() => {
      result.current.handleCommandSubmit("echo second");
    });

    // ArrowUp recalls last command
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });
    expect(result.current.input).toBe("echo second");

    // ArrowUp again recalls previous command
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });
    expect(result.current.input).toBe("echo first");

    // ArrowDown moves forward in history
    act(() => {
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });
    expect(result.current.input).toBe("echo second");
  });

  it("autocompletes commands with Tab key", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.setInput("neo");
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Tab",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.input).toBe("neofetch");
  });

  it("opens terminal when cosmos:open-terminal custom event is dispatched", () => {
    const { result } = renderHook(() => useTerminal());
    expect(result.current.isOpen).toBe(false);

    act(() => {
      window.dispatchEvent(new CustomEvent("cosmos:open-terminal"));
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("handles controlled mode and invokes onClose when closeTerminal is called", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useTerminal({ isOpen: true, onClose }));

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeTerminal();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape key press when open", () => {
    const onClose = vi.fn();
    renderHook(() => useTerminal({ isOpen: true, onClose }));

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("displays suggestions when multiple commands match Tab prefix", () => {
    const { result } = renderHook(() => useTerminal());

    act(() => {
      result.current.setInput("c"); // matches "contact" and "clear"
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Tab",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    const lastEntry = result.current.entries[result.current.entries.length - 1];
    expect(lastEntry.id).toContain("tab-suggest");
  });

  it("ignores whitespace-only command submissions", () => {
    const { result } = renderHook(() => useTerminal());
    const initialCount = result.current.entries.length;

    act(() => {
      result.current.handleCommandSubmit("   ");
    });

    expect(result.current.entries.length).toBe(initialCount);
  });
});
