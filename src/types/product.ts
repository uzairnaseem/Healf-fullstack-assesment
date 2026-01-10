import { SortOption } from '@/lib/actions/types/products';

export interface CSVProduct {
  _AIRBYTE_RAW_ID: string | undefined | null;
  _AIRBYTE_EXTRACTED_AT: string | undefined | null;
  _AIRBYTE_META: Record<string, unknown> | undefined | null;
  _AIRBYTE_GENERATION_ID: string | undefined | null;
  ID: string | undefined | null;
  SEO: Record<string, unknown> | undefined | null;
  TAGS: string | undefined | null;
  IMAGE: string | undefined | null;
  TITLE: string | undefined | null;
  HANDLE: string | undefined | null;
  IMAGES: ProductImage[] | undefined | null;
  STATUS: 'ACTIVE' | 'DRAFT' | 'ARCHIVED' | undefined | null;
  VENDOR: string | undefined | null;
  OPTIONS: Record<string, unknown>[] | undefined | null;
  FEEDBACK: string | undefined | null;
  SHOP_URL: string | undefined | null;
  VARIANTS: ProductVariant[] | undefined | null;
  BODY_HTML: string | undefined | null;
  CREATED_AT: string | undefined | null;
  DELETED_AT: string | undefined | null;
  UPDATED_AT: string | undefined | null;
  DESCRIPTION: string | undefined | null;
  MEDIA_COUNT: string | undefined | null;
  IS_GIFT_CARD: string | undefined | null;
  PRODUCT_TYPE: string | undefined | null;
  PUBLISHED_AT: string | undefined | null;
  FEATURED_IMAGE: Record<string, unknown> | undefined | null;
  FEATURED_MEDIA: string | undefined | null;
  PRICE_RANGE_V2: CSVProductPriceRange | undefined | null;
  TOTAL_VARIANTS: string | undefined | null;
  DELETED_MESSAGE: string | undefined | null;
  PUBLISHED_SCOPE: string | undefined | null;
  TEMPLATE_SUFFIX: string | undefined | null;
  TOTAL_INVENTORY: string | undefined | null;
  DESCRIPTION_HTML: string | undefined | null;
  ONLINE_STORE_URL: string | undefined | null;
  TRACKS_INVENTORY: string | undefined | null;
  LEGACY_RESOURCE_ID: string | undefined | null;
  DELETED_DESCRIPTION: string | undefined | null;
  ADMIN_GRAPHQL_API_ID: string | undefined | null;
  REQUIRES_SELLIN_PLAN: string | undefined | null;
  HAS_ONLY_DEFAULT_VARIANT: string | undefined | null;
  ONLINE_STORE_PREVIEW_URL: string | undefined | null;
  HAS_OUT_OF_STOCK_VARIANTS: string | undefined | null;
  PRICE_RANGE: CSVProductPriceRange | undefined | null;
  METAFIELDS: Record<string, unknown> | undefined | null;
}

interface CSVProductPriceRange {
  max_variant_price: {
    amount: number;
    currency_code: string;
  };
  min_variant_price: {
    amount: number;
    currency_code: string;
  };
}

interface ProductVariant {
  id: string;
}

interface ProductImage {
  id: string;
}

interface ProductPriceRange {
  min: number;
  max: number;
  currencyCode: string;
}

interface ProductReviews {
  average: number;
  count: number;
}

interface ProductFeaturedImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  productType: string;
  tags: string;
  description: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  images: ProductImage[];
  totalInventory: number;
  variants: ProductVariant[];
  priceRange: ProductPriceRange;
  featuredImage: ProductFeaturedImage | null;
  reviews: ProductReviews | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  publishedAt: Date | null;
}

export interface QueryParams {
  query?: string;
  sort?: SortOption;
  vendors?: string;
  productTypes?: string;
  minPrice?: number;
  maxPrice?: number;
}
