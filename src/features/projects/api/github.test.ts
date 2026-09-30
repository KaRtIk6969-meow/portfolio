import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchGitHubStats } from "./github";

describe("fetchGitHubStats client API", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and returns repository statistics successfully", async () => {
    const mockData = {
      novalabsai: {
        name: "NovaLabsAI",
        fullName: "KaRtIk6969-meow/NovaLabsAI",
        stars: 35,
        forks: 3,
        openIssues: 1,
        language: "TypeScript",
        description: "AI Platform",
        updatedAt: "2026-09-30T10:00:00Z",
        pushedAt: "2026-09-30T12:00:00Z",
        htmlUrl: "https://github.com/KaRtIk6969-meow/NovaLabsAI",
        isArchived: false,
      },
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          success: true,
          data: mockData,
        }),
      })
    );

    const result = await fetchGitHubStats(["NovaLabsAI"]);
    expect(result).toEqual(mockData);
    expect(result.novalabsai.stars).toBe(35);
  });

  it("handles HTTP failure gracefully and returns empty record", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const result = await fetchGitHubStats(["invalid-repo"]);
    expect(result).toEqual({});
  });

  it("handles network rejection gracefully without throwing", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network connection dropped"))
    );

    const result = await fetchGitHubStats(["NovaLabsAI"]);
    expect(result).toEqual({});
  });
});
