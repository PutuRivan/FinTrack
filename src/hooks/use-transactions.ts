"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { TTransactionWithRelations } from "@/lib/types/response";

export type TransactionParams = {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  category?: string;
  period?: string;
};

export type TransactionResponse = {
  transactions: TTransactionWithRelations[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

async function fetchTransactions(
  params: TransactionParams = {},
): Promise<TransactionResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.search) searchParams.set("search", params.search);
  if (params.type) searchParams.set("type", params.type);
  if (params.category) searchParams.set("category", params.category);
  if (params.period) searchParams.set("period", params.period);

  const response = await fetch(`/api/transactions?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
}

export function useTransactions(params: TransactionParams = {}) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => fetchTransactions(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
}
