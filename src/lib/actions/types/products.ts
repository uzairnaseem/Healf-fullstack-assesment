import { Product } from '@/types/product';
import { Pagination } from './pagination';

// Request types
export interface GetProductsRequest {
  page: number;
  limit: number;
  query?: string;
  sort?: SortOption;
  vendors?: string;
  types?: string;
  minPrice?: number;
  maxPrice?: number;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'highest-rated';

// Response types
export type GetProductsResponse = Pagination<Product>;

export type GetFiltersResponse = {
  vendors: string[];
  productTypes: string[];
  tags: string[];
  priceRange: { min: number; max: number };
};
