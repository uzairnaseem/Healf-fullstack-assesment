// Packages
import { Suspense } from 'react';

// Components
import Container from '@mui/material/Container';
import SearchBar from '@/components/search/SearchBar';
import ProductListContainer from '@/components/products/ProductListContainer';
import ProductListSkeleton from '@/components/products/ProductSkeleton';

// Types
import { QueryParams } from '@/types/product';

interface HomeProps {
  searchParams: Promise<QueryParams>;
}

export default async function Home(params: HomeProps) {
  const queryParams = await params.searchParams;

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
      <SearchBar />

      <Suspense fallback={<ProductListSkeleton count={6} />}>
        <ProductListContainer params={queryParams} />
      </Suspense>
    </Container>
  );
}
