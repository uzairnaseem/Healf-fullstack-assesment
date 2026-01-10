'use server';

// Helpers
import {
  applyFilters,
  getActiveProducts,
  getFilterOptions,
  getProductSearchSuggestions,
  searchProducts,
  sortProducts
} from '@/lib/actions/helpers/products';

// Types
import { GetFiltersResponse, GetProductsRequest, GetProductsResponse } from '../types/products';
import { willPaginate } from '../helpers/pagination';
import { Product } from '@/types/product';

/**
 * Get all active products based on request parameters (paginated)
 * @param request - request parameters (page, limit, query, sort, etc)
 * @returns - Paginated products
 */
export async function getProducts(request: GetProductsRequest): Promise<GetProductsResponse> {
  try {
    const { page, limit, query, sort, vendors, types, minPrice, maxPrice } = request;
    let products: Product[] = await getActiveProducts();

    if (query) {
      products = await searchProducts(products, query);
    }

    if (vendors || types || minPrice || maxPrice) {
      products = await applyFilters(products, { vendors, types, minPrice, maxPrice });
    }

    if (sort) {
      products = await sortProducts(products, sort);
    }

    return willPaginate(products, page, limit);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products');
  }
}

/**
 * Get search suggestions based on query
 * @param query - Query to search for
 * @returns - Search suggestions
 */
export async function getSearchSuggestions(query: string): Promise<string[]> {
  try {
    return await getProductSearchSuggestions(query);
  } catch (error) {
    console.error('Error auto-suggesting products:', error);
    throw new Error('Failed to auto-suggest products');
  }
}

/**
 * Get all product filter options based on products data
 * @returns - vendors, product types, tags and price range
 */
export async function getFilters(): Promise<GetFiltersResponse> {
  try {
    return await getFilterOptions();
  } catch (error) {
    console.error('Error fetching filters:', error);
    throw new Error('Failed to load filters');
  }
}
