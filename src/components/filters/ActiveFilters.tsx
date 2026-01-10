import { Chip, Typography } from '@mui/material';
import { ActiveFiltersContainer } from '../common/StyledComponents';

interface ActiveFiltersProps {
  vendors: string[];
  productTypes: string[];
  minPrice?: number;
  maxPrice?: number;
}

export default function ActiveFilters({
  vendors,
  productTypes,
  minPrice,
  maxPrice
}: ActiveFiltersProps) {
  const hasPriceFilter = minPrice || maxPrice;
  const hasActiveFilters = vendors.length > 0 || productTypes.length > 0 || hasPriceFilter;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <ActiveFiltersContainer>
      <Typography variant="body2" color="text.secondary">
        Active Filters:
      </Typography>

      {vendors.map((vendor) => (
        <Chip
          key={`vendor-${vendor}`}
          label={`Vendor: ${vendor}`}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}

      {productTypes.map((type) => (
        <Chip
          key={`type-${type}`}
          label={`Type: ${type}`}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}

      {hasPriceFilter && (
        <Chip
          label={`Price: $${minPrice} - $${maxPrice}`}
          size="small"
          color="primary"
          variant="outlined"
        />
      )}
    </ActiveFiltersContainer>
  );
}
