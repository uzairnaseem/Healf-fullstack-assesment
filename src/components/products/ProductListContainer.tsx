// Components
import SortControls from './SortControls';
import EmptyState from '../common/EmptyState';
import ProductList from './ProductList';

// Actions
import { getProducts } from '@/lib/actions/services/products';

// Others
import { PER_PAGE_LIMIT } from '@/lib/constants';
import { QueryParams } from '@/types/product';
import ActiveFilters from '../filters/ActiveFilters';
import { ProductListCont } from '../common/StyledComponents';

interface ProductListProps {
  params: QueryParams;
}

export default async function ProductListContainer({ params }: ProductListProps) {
  const { data: products, ...pagination } = await getProducts({
    page: 1,
    limit: PER_PAGE_LIMIT,
    ...params
  });

  const { query, vendors, productTypes, minPrice, maxPrice } = params;
  const hasActiveFilters = !!query || !!vendors || !!productTypes || !!minPrice || !!maxPrice;

  if (!products.length) {
    return (
      <EmptyState
        title={hasActiveFilters ? 'No products match your filters' : 'No products found'}
        description={
          hasActiveFilters
            ? 'Try adjusting or clearing your filters to see more products.'
            : 'Check back soon for new products!'
        }
      />
    );
  }

  return (
    <ProductListCont>
      <SortControls resultCount={pagination.totalCount} />

      <ActiveFilters
        vendors={vendors?.split(',') || []}
        productTypes={productTypes?.split(',') || []}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      <ProductList products={products} pagination={pagination} params={params} />
    </ProductListCont>
  );
}
