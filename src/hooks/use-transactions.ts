"use client";

import { useQuery } from "@tanstack/react-query";
import type { TTransactionWithRelations } from "@/lib/types/response";

async function fetchTransactions(): Promise<TTransactionWithRelations[]> {
  const response = await fetch("/api/transactions");

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data.transactions;
}

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
