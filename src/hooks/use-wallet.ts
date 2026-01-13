"use client";

import { useQuery } from "@tanstack/react-query";
import type { TWalletsResponse } from "@/lib/types/response";

export async function fetchWallets(): Promise<TWalletsResponse> {
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
