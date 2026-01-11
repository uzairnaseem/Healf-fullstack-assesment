'use client';

// Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductCard from './ProductCard';
import LoadMoreTrigger from '../common/LoadMoreTrigger';

// Hooks
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts';

// Types
import { Pagination as PaginationType } from '@/lib/actions/types/pagination';
import { Product, QueryParams } from '@/types/product';
import { Box } from '@mui/material';

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
  const { products, pagination, loadMore } = useInfiniteProducts({
    initialProducts,
    initialPagination,
    params
  });

  return (
    <Box sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
      <Grid container rowSpacing={4} columnSpacing={3}>
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
    </Box>
  );
}
