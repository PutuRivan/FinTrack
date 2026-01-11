"use client";

import { useQuery } from "@tanstack/react-query";
import type { TUser } from "@/lib/types/schema";

async function fetchUserProfile(): Promise<TUser> {
  const response = await fetch("/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
