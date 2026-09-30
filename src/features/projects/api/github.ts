import { GitHubRepoStats } from "../types";

export interface GitHubApiResponse {
  success: boolean;
  data?: Record<string, GitHubRepoStats>;
  error?: string;
  cached?: boolean;
  isFallback?: boolean;
  source?: string;
}

/**
 * Fetches real-time GitHub repository statistics from the internal API route.
 * @param repos Optional array of repository names to fetch
 * @returns Map of repository name to GitHubRepoStats
 */
export async function fetchGitHubStats(
  repos?: string[]
): Promise<Record<string, GitHubRepoStats>> {
  try {
    const params = new URLSearchParams();
    if (repos && repos.length > 0) {
      params.set("repos", repos.join(","));
    }

    const url = `/api/github${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`[GitHub Client API] HTTP error ${response.status}`);
      return {};
    }

    const payload: GitHubApiResponse = await response.json();
    if (payload.success && payload.data) {
      return payload.data;
    }

    return {};
  } catch (error) {
    console.error("[GitHub Client API] Failed to fetch repository stats:", error);
    return {};
  }
}
