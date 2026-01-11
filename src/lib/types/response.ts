import type { TCategories } from '@/lib/types/schema';

export interface TCategoriesResponse extends TCategories {
  total_amount: number;
}