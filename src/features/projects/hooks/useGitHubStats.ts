"use client";

import { useState, useEffect } from "react";
import { GitHubRepoStats } from "../types";
import { fetchGitHubStats } from "../api/github";

interface UseGitHubStatsResult {
  stats: Record<string, GitHubRepoStats>;
  isLoading: boolean;
  error: string | null;
}

export function useGitHubStats(repoNames?: string[]): UseGitHubStatsResult {
  const [stats, setStats] = useState<Record<string, GitHubRepoStats>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const repoNamesKey = repoNames ? repoNames.join(",") : "";

  useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      try {
        setIsLoading(true);
        const reposToFetch = repoNamesKey ? repoNamesKey.split(",") : undefined;
        const data = await fetchGitHubStats(reposToFetch);
        if (isMounted) {
          setStats(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load GitHub stats");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, [repoNamesKey]);

  return { stats, isLoading, error };
}

