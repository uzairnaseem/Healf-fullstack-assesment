// Packages
import { Suspense } from 'react';

// Components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchBar from '@/components/search/SearchBar';
import ProductListContainer from '@/components/products/ProductListContainer';
import ProductListSkeleton from '@/components/products/ProductSkeleton';
import FilterSkeleton from '@/components/filters/FilterSkeleton';
import ProductFilters from '@/components/filters';

// Types
import { QueryParams } from '@/types/product';

interface HomeProps {
  searchParams: Promise<QueryParams>;
}

export default async function Home(params: HomeProps) {
  const queryParams = await params.searchParams;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 2.5 }}>
          <Suspense fallback={<FilterSkeleton />}>
            <ProductFilters />
          </Suspense>
        </Grid>

        <Grid size={{ xs: 12, md: 9.5 }}>
          <SearchBar />
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductListContainer params={queryParams} />
          </Suspense>
        </Grid>
      </Grid>
    </Container>
  );
}
