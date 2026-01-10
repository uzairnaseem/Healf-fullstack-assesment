'use client';

// Components
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';

// Icons
import SearchIcon from '@mui/icons-material/Search';

// Hooks
import { useSearchWithSuggestions } from '@/hooks/useSearchWithSuggestions';

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = 'Search products by name, vendor, description, product type or tags...'
}: SearchBarProps) {
  const { search, suggestions, handleInputChange, handleSubmit, isLoadingSuggestions } =
    useSearchWithSuggestions();

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      inputValue={search}
      onInputChange={(_, value) => handleInputChange(value)}
      loading={isLoadingSuggestions}
      loadingText={<Typography variant="body2">Loading suggestions...</Typography>}
      noOptionsText={<Typography variant="body2">No Matching Results found</Typography>}
      onChange={(_, value) => handleSubmit(value || '')}
      onKeyDown={(e) => e.key === 'Enter' && handleSubmit(search)}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <ListItem key={key} {...otherProps} sx={{ gap: 2 }}>
            <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2">{option}</Typography>
          </ListItem>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          slotProps={{
            input: {
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {isLoadingSuggestions && (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                </>
              )
            }
          }}
        />
      )}
    />
  );
}
