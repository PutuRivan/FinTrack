"use client";

import { useQuery } from "@tanstack/react-query";
import type { TFinancialGoal } from "@/lib/types/schema";

async function fetchGoals(): Promise<TFinancialGoal[]> {
  const response = await fetch("/api/goals");

  if (!response.ok) {
    throw new Error("Failed to fetch goals");
  }

  return response.json();
}

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
