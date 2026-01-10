import { Product } from '@/types/product';

export function formatAmount(amount: number, currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount);
}

export function parseJson<T>(json: string | T) {
  return typeof json === 'string' ? JSON.parse(json) : json;
}

export function getProductPrice(product: Product) {
  return product.priceRange.min === product.priceRange.max
    ? formatAmount(product.priceRange.min, product.priceRange.currencyCode)
    : `${formatAmount(product.priceRange.min, product.priceRange.currencyCode)} - ${formatAmount(
        product.priceRange.max,
        product.priceRange.currencyCode
      )}`;
}
