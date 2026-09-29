import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { sendContactMessage } from "./contact";

describe("sendContactMessage client service", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success response when transmission succeeds", async () => {
    const mockApiResponse = {
      success: true,
      message: "Transmission received loud and clear.",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockApiResponse,
      })
    );

    const result = await sendContactMessage({
      name: "Kartik Sharma",
      email: "kartik@cosmos.dev",
      message: "Greetings from the exploration vessel.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Transmission received loud and clear.");
  });

  it("returns formatted error response when server returns an HTTP error status", async () => {
    const mockErrorResponse = {
      success: false,
      message: "Invalid email format supplied.",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => mockErrorResponse,
      })
    );

    const result = await sendContactMessage({
      name: "Kartik Sharma",
      email: "not-an-email",
      message: "Greetings from the exploration vessel.",
    });

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid email format supplied.");
  });

  it("returns graceful network error message when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Failed to connect"))
    );

    const result = await sendContactMessage({
      name: "Kartik Sharma",
      email: "kartik@cosmos.dev",
      message: "Testing offline recovery.",
    });

    expect(result.success).toBe(false);
    expect(result.message).toContain("Communication streams disconnected");
    expect(result.error).toBe("Failed to connect");
  });
});
