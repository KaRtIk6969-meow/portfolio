import { NextRequest, NextResponse } from "next/server";
import { GitHubRepoStats } from "@/features/projects/types";

// Default GitHub user and featured repositories
const DEFAULT_OWNER = "KaRtIk6969-meow";
const DEFAULT_REPOS = [
  "NovaLabsAI",
  "mindBloomm",
  "klickonn",
  "student-managment-system",
];

// Fallback in-memory cache to guarantee zero downtime if GitHub API is rate-limited or unreachable
interface CacheEntry {
  data: Record<string, GitHubRepoStats>;
  timestamp: number;
}
const memoryCache: Map<string, CacheEntry> = new Map();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes in milliseconds

interface RawGitHubRepo {
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  description: string | null;
  updated_at: string;
  pushed_at: string;
  html_url: string;
  archived: boolean;
}

function transformRepoData(raw: RawGitHubRepo): GitHubRepoStats {
  return {
    name: raw.name,
    fullName: raw.full_name,
    stars: raw.stargazers_count ?? 0,
    forks: raw.forks_count ?? 0,
    openIssues: raw.open_issues_count ?? 0,
    language: raw.language ?? null,
    description: raw.description ?? null,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    htmlUrl: raw.html_url,
    isArchived: Boolean(raw.archived),
  };
}

interface RepoFetchResult {
  repo: string;
  status: number;
  stats: GitHubRepoStats | null;
}

async function fetchRepoFromGitHub(
  owner: string,
  repo: string,
  token?: string
): Promise<RepoFetchResult> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "DeepSpacePortfolio-2.0",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.warn(`[GitHub API] Rate limit reached for ${owner}/${repo}`);
      } else if (res.status === 404) {
        console.warn(`[GitHub API] Repository not found: ${owner}/${repo}`);
      } else {
        console.warn(`[GitHub API] Failed with status ${res.status} for ${owner}/${repo}`);
      }
      return { repo, status: res.status, stats: null };
    }

    const data: RawGitHubRepo = await res.json();
    return { repo, status: 200, stats: transformRepoData(data) };
  } catch (error) {
    console.error(`[GitHub API Fetch Error] ${owner}/${repo}:`, error);
    return { repo, status: 503, stats: null };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const owner = searchParams.get("owner")?.trim() || DEFAULT_OWNER;
    const repoParam = searchParams.get("repo")?.trim();
    const reposParam = searchParams.get("repos")?.trim();

    let targetRepos: string[] = DEFAULT_REPOS;
    if (repoParam) {
      targetRepos = [repoParam];
    } else if (reposParam) {
      targetRepos = reposParam
        .split(",")
        .map((r) => r.trim())
        .filter(Boolean);
    }

    if (targetRepos.length === 0) {
      return NextResponse.json(
        { success: false, error: "No repository specified." },
        { status: 400 }
      );
    }

    const cacheKey = `${owner}:${targetRepos.sort().join(",")}`;
    const token = process.env.GITHUB_TOKEN?.trim();

    // Fetch repository stats concurrently
    const results = await Promise.all(
      targetRepos.map((repo) => fetchRepoFromGitHub(owner, repo, token))
    );

    const statsMap: Record<string, GitHubRepoStats> = {};
    let hasOnly404 = true;

    for (const item of results) {
      if (item.stats) {
        statsMap[item.repo.toLowerCase()] = item.stats;
        statsMap[item.repo] = item.stats;
        hasOnly404 = false;
      } else if (item.status !== 404) {
        hasOnly404 = false;
      }
    }

    // If all queried repos explicitly returned 404 from GitHub
    if (results.length > 0 && hasOnly404 && Object.keys(statsMap).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            targetRepos.length === 1
              ? `Repository not found: ${owner}/${targetRepos[0]}`
              : `None of the requested repositories were found for owner: ${owner}`,
        },
        {
          status: 404,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // Check if we have valid results; update cache
    if (Object.keys(statsMap).length > 0) {
      memoryCache.set(cacheKey, {
        data: statsMap,
        timestamp: Date.now(),
      });

      return NextResponse.json(
        {
          success: true,
          data: statsMap,
          cached: false,
          source: "github-live",
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
          },
        }
      );
    }

    // If live fetch failed due to rate limits or network issues, check fallback memory cache
    const cachedEntry = memoryCache.get(cacheKey);
    if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(
        {
          success: true,
          data: cachedEntry.data,
          cached: true,
          source: "memory-cache-fallback",
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }

    // Clean mock fallback if API is unreachable and cache is cold
    const fallbackMap: Record<string, GitHubRepoStats> = {};
    for (const repo of targetRepos) {
      const fallback: GitHubRepoStats = {
        name: repo,
        fullName: `${owner}/${repo}`,
        stars: 0,
        forks: 0,
        openIssues: 0,
        language: "TypeScript",
        description: "Deep Space Engineering Repository",
        updatedAt: new Date().toISOString(),
        pushedAt: new Date().toISOString(),
        htmlUrl: `https://github.com/${owner}/${repo}`,
        isArchived: false,
      };
      fallbackMap[repo.toLowerCase()] = fallback;
      fallbackMap[repo] = fallback;
    }

    return NextResponse.json(
      {
        success: true,
        data: fallbackMap,
        cached: false,
        isFallback: true,
        source: "static-fallback",
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("[GitHub API Route Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process GitHub repository telemetry.",
      },
      { status: 500 }
    );
  }
}
