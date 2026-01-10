import { useState, useEffect } from 'react';

// Actions
import { getProducts } from '@/lib/actions/services/products';

// Types
import { Product, QueryParams } from '@/types/product';
import { Pagination as PaginationType } from '@/lib/actions/types/pagination';
import { PER_PAGE_LIMIT } from '@/lib/constants';

type Pagination = Omit<PaginationType<Product>, 'data'>;

interface UseInfiniteProductsProps {
  initialProducts: Product[];
  initialPagination: Pagination;
  params: QueryParams;
}

interface UseInfiniteProductsReturn {
  products: Product[];
  pagination: Pagination;
  loading: boolean;
  loadMore: () => Promise<void>;
}

export function useInfiniteProducts({
  initialProducts,
  initialPagination,
  params
}: UseInfiniteProductsProps): UseInfiniteProductsReturn {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [pagination, setPagination] = useState<Pagination>(initialPagination);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    const { hasMore } = pagination;
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const { data: newProducts, ...newPagination } = await getProducts({
        page: pagination.page + 1,
        limit: PER_PAGE_LIMIT,
        ...params
      });
      setProducts((prev) => [...prev, ...newProducts]);
      setPagination(newPagination);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset when initial data changes (e.g., search/filter update)
  useEffect(() => {
    setProducts(initialProducts);
    setPagination(initialPagination);
  }, [initialProducts, initialPagination]);

  return {
    products,
    pagination,
    loading,
    loadMore
  };
}
