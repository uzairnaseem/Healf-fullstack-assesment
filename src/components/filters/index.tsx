// Components
import FilterPanel from './FilterPanel';

// Actions
import { getFilters } from '@/lib/actions/services/products';

export default async function ProductFilters() {
  const filters = await getFilters();

  if (!filters) {
    return null;
  }

  const { vendors, productTypes, priceRange } = filters;

  return <FilterPanel vendors={vendors} productTypes={productTypes} priceRange={priceRange} />;
}
