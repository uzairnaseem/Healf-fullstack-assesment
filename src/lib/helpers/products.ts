import { Product, CSVProduct } from '@/types/product';
import { parseJson } from '.';
import { CURRENCY_CODE } from '../constants';

/**
 * Format a CSV product and exclude non-essential fields
 * @param csvProduct - CSV product
 * @returns Product
 */
export function normalizeProduct(csvProduct: CSVProduct): Product {
  // Reviews
  let reviewsAverage = 0;
  let reviewsCount = 0;

  if (csvProduct.METAFIELDS) {
    try {
      const metafields = parseJson<Record<string, unknown>>(csvProduct.METAFIELDS);

      reviewsAverage = parseFloat(metafields.yotpo_reviews_average?.value) || 0;
      reviewsCount = parseInt(metafields.yotpo_reviews_count?.value, 10) || 0;
    } catch (e) {
      console.warn('Failed to parse METAFIELDS:', e);
    }
  }

  // Price
  let priceMin = 0;
  let priceMax = 0;
  let currencyCode = CURRENCY_CODE;

  if (csvProduct.PRICE_RANGE_V2) {
    try {
      const priceRange = parseJson<CSVProduct['PRICE_RANGE_V2']>(csvProduct.PRICE_RANGE_V2);

      priceMin = parseFloat(priceRange.min_variant_price?.amount) || 0;
      priceMax = parseFloat(priceRange.max_variant_price?.amount) || 0;
      currencyCode = priceRange.min_variant_price?.currency_code || 'GBP';
    } catch (e) {
      console.warn('Failed to parse PRICE_RANGE_V2:', e);
    }
  } else if (csvProduct.PRICE_RANGE) {
    try {
      const priceRange = parseJson<CSVProduct['PRICE_RANGE']>(csvProduct.PRICE_RANGE);

      priceMin = parseFloat(priceRange.min_variant_price?.amount) || 0;
      priceMax = parseFloat(priceRange.max_variant_price?.amount) || 0;
      currencyCode = priceRange.min_variant_price?.currency_code || 'GBP';
    } catch (e) {
      console.warn('Failed to parse PRICE_RANGE:', e);
    }
  }

  // Featured Image
  let featuredImage: Product['featuredImage'] = null;
  if (csvProduct.FEATURED_IMAGE) {
    try {
      const image = parseJson<CSVProduct['FEATURED_IMAGE']>(csvProduct.FEATURED_IMAGE);

      featuredImage = {
        url: image?.url || '',
        alt: image?.alt_text || csvProduct.TITLE || ''
      };
    } catch (e) {
      console.warn('Failed to parse FEATURED_IMAGE:', e);
    }
  }

  // Images
  let images: Array<{ id: string }> = [];
  if (csvProduct.IMAGES) {
    try {
      images = parseJson<CSVProduct['IMAGES']>(csvProduct.IMAGES);
    } catch (e) {
      console.warn('Failed to parse IMAGES:', e);
    }
  }

  // Variants
  let variants: Array<{ id: string }> = [];
  if (csvProduct.VARIANTS) {
    try {
      variants = parseJson<CSVProduct['VARIANTS']>(csvProduct.VARIANTS);
    } catch (e) {
      console.warn('Failed to parse VARIANTS:', e);
    }
  }

  const totalInventory = parseInt(csvProduct.TOTAL_INVENTORY || '0', 10);
  return {
    id: csvProduct.ID || '',
    title: csvProduct.TITLE || '',
    handle: csvProduct.HANDLE || '',
    vendor: csvProduct.VENDOR || '',
    productType: csvProduct.PRODUCT_TYPE || '',
    tags: csvProduct.TAGS || '',
    description: csvProduct.DESCRIPTION || '',
    status: (csvProduct.STATUS as 'ACTIVE' | 'DRAFT' | 'ARCHIVED') || 'ACTIVE',
    images,
    totalInventory,
    featuredImage,
    variants,
    priceRange: {
      min: priceMin,
      max: priceMax,
      currencyCode
    },
    reviews: {
      average: reviewsAverage,
      count: reviewsCount
    },
    createdAt: csvProduct.CREATED_AT ? new Date(csvProduct.CREATED_AT) : null,
    updatedAt: csvProduct.UPDATED_AT ? new Date(csvProduct.UPDATED_AT) : null,
    deletedAt: csvProduct.DELETED_AT ? new Date(csvProduct.DELETED_AT) : null,
    publishedAt: csvProduct.PUBLISHED_AT ? new Date(csvProduct.PUBLISHED_AT) : null
  };
}
