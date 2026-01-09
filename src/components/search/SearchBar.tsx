'use client';

// Packages
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';

// Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Others
import { DEBOUNCE_TIME } from '@/lib/constants';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = 'Search products by name, vendor, description, product type or tags...'
}: SearchBarProps) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIME);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleClear = () => {
    setSearch('');
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('query', debouncedSearch);

    if (debouncedSearch.length === 0) {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
    // To avoid unnecessary re-renders, just update the search param when the debounced search changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Box>
      <TextField
        fullWidth
        value={search}
        placeholder={placeholder}
        variant="outlined"
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={handleClear} size="small">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Box>
  );
}
