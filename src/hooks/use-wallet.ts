"use client";

import { useQuery } from "@tanstack/react-query";
import type { TWallets } from "@/lib/types/schema";

export async function fetchWallets(): Promise<TWallets[]> {
  const response = await fetch("/api/wallets");
  const data = await response.json();
  return data;
}

export function useWallets() {
  return useQuery({
    queryKey: ["wallets"],
    queryFn: fetchWallets,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
