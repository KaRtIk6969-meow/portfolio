import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { GET } from "./route";
import { NextRequest } from "next/server";

describe("GET /api/github", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  const mockGitHubRepo = {
    name: "NovaLabsAI",
    full_name: "KaRtIk6969-meow/NovaLabsAI",
    stargazers_count: 42,
    forks_count: 5,
    open_issues_count: 2,
    language: "TypeScript",
    description: "An interactive agency platform",
    updated_at: "2026-09-30T10:00:00Z",
    pushed_at: "2026-09-30T12:00:00Z",
    html_url: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
    archived: false,
  };

  it("returns 200 and normalized telemetry for a single repository query", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockGitHubRepo,
      })
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=NovaLabsAI");
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.novalabsai).toBeDefined();
    expect(json.data.novalabsai.stars).toBe(42);
    expect(json.data.novalabsai.forks).toBe(5);
    expect(json.data.novalabsai.language).toBe("TypeScript");
    expect(json.data.novalabsai.fullName).toBe("KaRtIk6969-meow/NovaLabsAI");
  });

  it("returns batch telemetry for multiple repositories", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) => {
        const repoName = url.split("/").pop();
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => ({
            ...mockGitHubRepo,
            name: repoName,
            full_name: `KaRtIk6969-meow/${repoName}`,
          }),
        });
      })
    );

    const req = new NextRequest(
      "http://localhost:3000/api/github?repos=NovaLabsAI,klickonn"
    );
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.novalabsai).toBeDefined();
    expect(json.data.klickonn).toBeDefined();
  });

  it("attaches Authorization header when GITHUB_TOKEN is configured", async () => {
    process.env.GITHUB_TOKEN = "ghp_mock_token_123456789";

    let interceptedHeaders: HeadersInit | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url: string, init?: RequestInit) => {
        interceptedHeaders = init?.headers;
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockGitHubRepo,
        });
      })
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=NovaLabsAI");
    const res = await GET(req);
    expect(res.status).toBe(200);

    const headersRecord = interceptedHeaders as Record<string, string>;
    expect(headersRecord.Authorization).toBe("Bearer ghp_mock_token_123456789");
  });

  it("returns resilient fallback data if GitHub API returns 403 rate limit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
      })
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=offline-repo");
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isFallback).toBe(true);
    expect(json.data["offline-repo"]).toBeDefined();
    expect(json.data["offline-repo"].stars).toBe(0);
  });

  it("returns 404 when requested repository is not found on GitHub", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=nonexistent-repo");
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(404);
    expect(json.success).toBe(false);
    expect(json.error).toContain("Repository not found: KaRtIk6969-meow/nonexistent-repo");
  });

  it("returns resilient fallback data when network failure occurs during fetch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network connection dropped"))
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=network-failure-repo");
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.isFallback).toBe(true);
    expect(json.data["network-failure-repo"]).toBeDefined();
  });

  it("includes Cache-Control headers on successful telemetry responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockGitHubRepo,
      })
    );

    const req = new NextRequest("http://localhost:3000/api/github?repo=NovaLabsAI");
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("s-maxage=1800");
  });
});
