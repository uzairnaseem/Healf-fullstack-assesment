'use server';

// Packages
import fs from 'fs';
import csv from 'csv-parser';
import MiniSearch from 'minisearch';

// Helpers
import { normalizeProduct } from '@/lib/helpers/products';

// Types
import { Product, CSVProduct } from '@/types/product';
import { SortOption } from '../types/products';

// Others
import { MINI_SEARCH_CONFIG, PRODUCTS_CSV_PATH } from '@/lib/constants';

// In memory cache
let cachedProducts: Product[] | null = null;

/**
 * Check if a product is active based on its status, publishedAt, deletedAt,
 * and totalInventory
 * @param product - Product to check
 * @returns True if the product is active, false otherwise
 */
function isActiveProduct(product: Product): boolean {
  if (
    product.status !== 'ACTIVE' ||
    !product.publishedAt ||
    product.deletedAt ||
    product.totalInventory <= 0
  ) {
    return false;
  }

  return true;
}

/**
 * Read a CSV file and format the data using a formatter function
 * @template CSVData - Type of data to read from the CSV file
 * @template FormattedData - Type of data to format
 * @param filePath - Path to the CSV file
 * @param formatter - Function to format the data
 * @returns Formatted data
 */
async function readAndFormatCSVData<CSVData, FormattedData>(
  filePath: string,
  formatter: (data: CSVData) => FormattedData
): Promise<FormattedData[]> {
  return new Promise((resolve, reject) => {
    const data: FormattedData[] = [];

    const stream = fs.createReadStream(filePath).pipe(csv());

    stream.on('data', (row: CSVData) => {
      try {
        const formattedData = formatter(row);
        data.push(formattedData);
      } catch (error) {
        console.error('Error formatting data:', error);
      }
    });

    stream.on('end', () => {
      resolve(data);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Load products from the CSV file and cache the results
 * @returns Products
 */
export async function loadProducts(): Promise<Product[]> {
  if (!cachedProducts) {
    try {
      cachedProducts = await readAndFormatCSVData<CSVProduct, Product>(
        PRODUCTS_CSV_PATH,
        normalizeProduct
      );
    } catch (error) {
      cachedProducts = [];
      console.error('Error loading products:', error);
    }
  }

  return cachedProducts;
}

/**
 * Load and filter active products from the CSV file
 * @returns Active products
 */
export async function getActiveProducts(): Promise<Product[]> {
  const allProducts = await loadProducts();
  return allProducts.filter(isActiveProduct);
}

/**
 * Search products by query
 * Searches across title, vendor, description, and tags
 * @param query - Query to search for
 * @returns Products
 */
export async function searchProducts(products: Product[], query: string): Promise<Product[]> {
  if (!query || query.trim() === '') {
    return products;
  }

  const miniSearch = new MiniSearch(MINI_SEARCH_CONFIG);

  miniSearch.addAll(products);
  const searchResults = miniSearch.search(query);

  const productsMap = new Map<string, Product>();
  products.forEach((p) => productsMap.set(p.id, p));

  const filteredProducts = searchResults
    .map((result) => productsMap.get(result.id))
    .filter((p) => p !== undefined);
  return filteredProducts;
}

/**
 * Auto-complete/auto-suggest words based on query in products
 * @param query - Query to search for
 * @returns Suggestions
 */
export async function getProductSearchSuggestions(query: string): Promise<string[]> {
  const products = await getActiveProducts();
  if (!query || query.trim() === '') {
    return [];
  }

  const miniSearch = new MiniSearch(MINI_SEARCH_CONFIG);

  miniSearch.addAll(products);
  const autoSuggestions = miniSearch.autoSuggest(query);

  return autoSuggestions.map((suggestion) => suggestion.suggestion);
}

/**
 * Sort products by price, date or rating
 * @param products - Products to sort
 * @param sort - Sort order
 * @returns Sorted products
 */
export async function sortProducts(products: Product[], sort: SortOption): Promise<Product[]> {
  switch (sort) {
    case 'relevance':
      return products;
    case 'price-asc':
      return products.sort((a, b) => a.priceRange.min - b.priceRange.min);
    case 'price-desc':
      return products.sort((a, b) => b.priceRange.min - a.priceRange.min);
    case 'newest':
      return products.sort(
        (a, b) =>
          new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime() || 0
      );
    case 'highest-rated':
      return products.sort((a, b) => {
        const avgDiff = (b.reviews?.average || 0) - (a.reviews?.average || 0);

        // If ratings are same then sort by no of reviews
        if (avgDiff === 0) {
          return (b.reviews?.count || 0) - (a.reviews?.count || 0);
        }

        return avgDiff;
      });
    default:
      return products;
  }
}

/**
 * Get all product filter options based on products data
 * @returns - vendors, product types, tags and price range
 */
export async function getFilterOptions(): Promise<{
  vendors: string[];
  productTypes: string[];
  tags: string[];
  priceRange: { min: number; max: number };
}> {
  const products = await loadProducts();

  const vendors = Array.from(new Set(products.map((p) => p.vendor)))
    .filter(Boolean)
    .sort();

  const productTypes = Array.from(new Set(products.map((p) => p.productType)))
    .filter(Boolean)
    .sort();

  const tags = Array.from(new Set(products.flatMap((p) => p.tags)))
    .filter(Boolean)
    .sort();

  const prices = products.map((p) => p.priceRange.min).filter((price) => price > 0);

  return {
    vendors,
    productTypes,
    tags,
    priceRange: {
      min: 0,
      max: prices.length > 0 ? Math.max(...prices) : 100000
    }
  };
}

export async function applyFilters(
  products: Product[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    vendors?: string;
    types?: string;
  }
): Promise<Product[]> {
  let filteredProducts = products;
  const { minPrice, maxPrice } = filters;
  const vendors = filters.vendors?.split(',');
  const types = filters.types?.split(',');

  if (minPrice !== undefined && minPrice !== null) {
    filteredProducts = filteredProducts.filter((p) => p.priceRange.min >= Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null) {
    filteredProducts = filteredProducts.filter((p) => p.priceRange.max <= Number(maxPrice));
  }

  if (vendors) {
    filteredProducts = filteredProducts.filter((p) => vendors?.includes(p.vendor));
  }

  if (types) {
    filteredProducts = filteredProducts.filter((p) => types?.includes(p.productType));
  }

  return filteredProducts;
}
