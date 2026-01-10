// Components
import FilterPanelWrapper from './FilterPanelWrapper';

// Actions
import { getFilters } from '@/lib/actions/services/products';

export default async function ProductFilters() {
  const filters = await getFilters();

  if (!filters) {
    return null;
  }

  const { vendors, productTypes, priceRange } = filters;

  return (
    <FilterPanelWrapper vendors={vendors} productTypes={productTypes} priceRange={priceRange} />
  );
}
