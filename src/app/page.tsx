// Packages
import { Suspense } from 'react';

// Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchBar from '@/components/search/SearchBar';
import ProductListContainer from '@/components/products/ProductListContainer';
import ProductListSkeleton from '@/components/products/ProductSkeleton';

interface HomeProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;

  return (
    <Container maxWidth="xl" sx={{ flexGrow: 1, py: 4 }}>
      <SearchBar />

      <Box sx={{ py: 4 }}>
        <Suspense fallback={<ProductListSkeleton count={6} />}>
          <ProductListContainer query={query} />
        </Suspense>
      </Box>
    </Container>
  );
}
