'use client';

// Packages
import { useEffect, useState } from 'react';

// Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import LoadMoreTrigger from '../common/LoadMoreTrigger';

// Actions
import { getProducts } from '@/lib/actions/services/products';

// Types
import { Pagination as PaginationType } from '@/lib/actions/types/pagination';
import { Product, QueryParams } from '@/types/product';

// Others
import { PER_PAGE_LIMIT } from '@/lib/constants';

type Pagination = Omit<PaginationType<Product>, 'data'>;

interface ProductListProps {
  products: Product[];
  pagination: Pagination;
  params: QueryParams;
}

export default function ProductList({
  products: initialProducts,
  pagination: initialPagination,
  params
}: ProductListProps) {
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

  useEffect(() => {
    setProducts(initialProducts);
    setPagination(initialPagination);
  }, [initialProducts, initialPagination]);

  return (
    <>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, md: 6, lg: 4 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {pagination.hasMore && <LoadMoreTrigger onVisible={loadMore} />}

      {!pagination.hasMore && (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
          No more products
        </Typography>
      )}
    </>
  );
}
