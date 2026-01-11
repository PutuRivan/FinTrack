"use client";

import { useQuery } from "@tanstack/react-query";
import type { TCategoriesResponse } from "@/lib/types/response";

async function fetchCategories(): Promise<TCategoriesResponse[]> {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
