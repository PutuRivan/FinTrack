import type { TCategories, TTransactions, TWallets } from '@/lib/types/schema';

export interface TCategoriesResponse extends TCategories {
  total_amount: number;
}

export interface TWalletsResponse {
  data: TWallets[];
  summary: {
    total_wallet: number;
    total_balance: number;
    total_savings: number;
  }
}

export interface TTransactionWithRelations extends TTransactions {
  categories: {
    name: string;
    type: string;
    icon: string;
    color: string;
  } | null;
  wallets: {
    name: string;
    type: string;
    color: string;
    icon: string;
    balance: number;
  } | null;
}