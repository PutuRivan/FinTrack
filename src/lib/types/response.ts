import type { TCategories, TWallets } from '@/lib/types/schema';

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