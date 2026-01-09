'use client';

// Packages
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Components
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { SortControlsContainer } from '../common/StyledComponents';

// Others
import SortIcon from '@mui/icons-material/Sort';
import { SortOption } from '@/lib/actions/types/products';

interface SortControlsProps {
  resultCount: number;
}

export default function SortControls({ resultCount }: SortControlsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const sortOption = (searchParams.get('sort') as SortOption) || 'relevance';

  const handleChange = (event: SelectChangeEvent<SortOption>) => {
    const newSortOption = event.target.value as SortOption;

    const params = new URLSearchParams(searchParams);
    params.set('sort', newSortOption);

    if (newSortOption === 'relevance') {
      params.delete('sort');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SortControlsContainer>
      <Typography variant="body2" color="text.secondary">
        <strong>{resultCount}</strong> {resultCount === 1 ? 'product' : 'products'} found
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SortIcon sx={{ color: 'action.active' }} fontSize="small" />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select value={sortOption} onChange={handleChange} aria-label="Sort products by">
            <MenuItem value="relevance">Most Relevant</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="newest">New Arrivals</MenuItem>
            <MenuItem value="highest-rated">Best Rated</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </SortControlsContainer>
  );
}
