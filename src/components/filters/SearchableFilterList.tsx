'use client';

// Packages
import { useState, useMemo } from 'react';

// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Icons
import SearchIcon from '@mui/icons-material/Search';

interface SearchableFilterListProps {
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  placeholder?: string;
  emptyMessage?: string;
}

const MAX_ITEMS_TO_SHOW = 10;

export default function SearchableFilterList({
  items,
  selectedItems,
  onToggle,
  placeholder = 'Search...',
  emptyMessage = 'No items found'
}: SearchableFilterListProps) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const searchLower = search.toLowerCase();
    return items.filter((item) => item.toLowerCase().includes(searchLower));
  }, [items, search]);

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <TextField
          size="small"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" color="action" />
                </InputAdornment>
              )
            }
          }}
        />
      </Box>

      <FormGroup>
        {filteredItems.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: 300,
              overflowY: 'auto',
              gap: 0
            }}>
            {filteredItems.slice(0, MAX_ITEMS_TO_SHOW).map((item) => (
              <FormControlLabel
                key={item}
                control={
                  <Checkbox
                    checked={selectedItems.includes(item)}
                    onChange={() => onToggle(item)}
                    size="small"
                  />
                }
                label={<Typography fontSize={14}>{item}</Typography>}
              />
            ))}

            {filteredItems.length > MAX_ITEMS_TO_SHOW && (
              <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
                Search for specific item
              </Typography>
            )}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
            {emptyMessage}
          </Typography>
        )}
      </FormGroup>
    </>
  );
}
