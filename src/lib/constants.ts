export const DEBOUNCE_TIME = 300;
export const PRODUCTS_CSV_PATH = 'public/data/products.csv';
export const PER_PAGE_LIMIT = 15;
export const CURRENCY_CODE = 'GDP';

export const MINI_SEARCH_CONFIG = {
  fields: ['title', 'vendor', 'description', 'productType', 'tags'],
  storeFields: ['id'],
  searchOptions: {
    boost: { title: 2, vendor: 1.5, productType: 1.5, description: 1, tags: 1 },
    fuzzy: 0.2,
    prefix: true
  }
};
