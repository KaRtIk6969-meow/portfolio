import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

describe("POST /api/contact", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("returns 200 and success message for valid submissions", async () => {
    const validPayload = {
      name: "Commander Shepard",
      email: "shepard@normandy.space",
      message: "Requesting docking permission and telemetry analysis.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toContain("sent successfully");
  });

  it("silently absorbs bot spam when honeypot is populated without forwarding", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
    process.env.RESEND_API_KEY = "test_resend_key";
    process.env.CONTACT_WEBHOOK_URL = "https://discord.com/webhook/test";

    const botPayload = {
      name: "SpamBot",
      email: "bot@spam.com",
      message: "Buy cheap cosmic credits now!",
      honeypot: "automated-bot-entry",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.message).toBe("Transmission received.");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("returns 400 when name is missing or shorter than 2 characters", async () => {
    const invalidPayload = {
      name: "A",
      email: "valid@cosmos.dev",
      message: "Valid message exceeding ten characters.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain("valid name");
  });

  it("returns 400 when name exceeds 100 characters", async () => {
    const invalidPayload = {
      name: "A".repeat(101),
      email: "valid@cosmos.dev",
      message: "Valid message exceeding ten characters.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain("valid name");
  });

  it("returns 400 when email format is invalid", async () => {
    const invalidPayload = {
      name: "Kartik Sharma",
      email: "invalid-email-format",
      message: "Valid message exceeding ten characters.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain("valid email");
  });

  it("returns 400 when message is shorter than 10 characters", async () => {
    const invalidPayload = {
      name: "Kartik Sharma",
      email: "kartik@cosmos.dev",
      message: "Too short",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.success).toBe(false);
    expect(data.message).toContain("between 10 and 3,000 characters");
  });

  it("triggers Resend dispatch when RESEND_API_KEY is configured", async () => {
    process.env.RESEND_API_KEY = "re_test_123456";
    process.env.CONTACT_RECEIVER_EMAIL = "target@cosmos.dev";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "msg_123" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const payload = {
      name: "Cosmic Explorer",
      email: "explorer@cosmos.dev",
      message: "Transmitting coordinates for rendezvous.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test_123456",
        }),
      })
    );
  });

  it("triggers Webhook dispatch when CONTACT_WEBHOOK_URL is configured", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://hooks.slack.com/services/test";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    vi.stubGlobal("fetch", mockFetch);

    const payload = {
      name: "Cosmic Explorer",
      email: "explorer@cosmos.dev",
      message: "Transmitting coordinates for rendezvous.",
    };

    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://hooks.slack.com/services/test",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("returns 500 when JSON body parsing fails", async () => {
    const req = {
      json: vi.fn().mockRejectedValue(new Error("Malformed JSON")),
    } as unknown as Request;

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.message).toContain("transmission error");
  });
});
