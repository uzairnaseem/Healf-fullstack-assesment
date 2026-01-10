'use client';

// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import FilterAccordion from './FilterAccordion';
import SearchableFilterList from './SearchableFilterList';

// Hooks
import useProductFilters from '@/hooks/useProductFilters';

// Others
import {
  FilterPanelContainer,
  FilterPanelHeaderContainer,
  FilterPanelTitleContainer
} from '../common/StyledComponents';
import { formatAmount } from '@/lib/helpers';
import { CURRENCY_CODE } from '@/lib/constants';

interface FilterPanelProps {
  vendors: string[];
  productTypes: string[];
  priceRange: { min: number; max: number };
}

export default function FilterPanel({ vendors, productTypes, priceRange }: FilterPanelProps) {
  const {
    selectedVendors,
    selectedProductTypes,
    selectedPriceRange,
    handleFiltersChange,
    clearAllFilters
  } = useProductFilters(priceRange);

  const filters = {
    vendors: selectedVendors,
    types: selectedProductTypes,
    priceRange: selectedPriceRange
  };

  const handleVendorToggle = (vendor: string) => {
    const newSelection = selectedVendors.includes(vendor)
      ? selectedVendors.filter((v) => v !== vendor)
      : [...selectedVendors, vendor];
    handleFiltersChange({ ...filters, vendors: newSelection });
  };

  const handleProductTypeToggle = (type: string) => {
    const newSelection = selectedProductTypes.includes(type)
      ? selectedProductTypes.filter((t) => t !== type)
      : [...selectedProductTypes, type];
    handleFiltersChange({ ...filters, types: newSelection });
  };

  const handlePriceChange = (value: [number, number]) => {
    handleFiltersChange({ ...filters, priceRange: value });
  };

  const activeFiltersCount =
    selectedVendors.length +
    selectedProductTypes.length +
    (selectedPriceRange[0] !== priceRange.min || selectedPriceRange[1] !== priceRange.max ? 1 : 0);

  return (
    <FilterPanelContainer elevation={0}>
      <FilterPanelHeaderContainer>
        <FilterPanelTitleContainer>
          <Typography variant="h6" component="h2">
            Filters
          </Typography>

          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              color="primary"
              aria-label={`${activeFiltersCount} active filters`}
            />
          )}
        </FilterPanelTitleContainer>

        {activeFiltersCount > 0 && (
          <Button size="small" onClick={clearAllFilters} aria-label="Clear all filters">
            Clear All
          </Button>
        )}
      </FilterPanelHeaderContainer>

      <FilterAccordion id="price" title="Price Range" defaultExpanded={true} sx={{ mt: 2 }}>
        <Box sx={{ px: 2 }}>
          <Slider
            value={selectedPriceRange}
            onChange={(_, value) => handlePriceChange(value as [number, number])}
            min={priceRange.min}
            max={priceRange.max}
            aria-label="Price range"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              {formatAmount(selectedPriceRange[0], CURRENCY_CODE)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatAmount(selectedPriceRange[1], CURRENCY_CODE)}
            </Typography>
          </Box>
        </Box>
      </FilterAccordion>

      <FilterAccordion id="vendors" title="Vendor" selectedCount={selectedVendors.length}>
        <SearchableFilterList
          items={vendors}
          selectedItems={selectedVendors}
          onToggle={handleVendorToggle}
          placeholder="Search vendors..."
          emptyMessage="No vendors found"
        />
      </FilterAccordion>

      <FilterAccordion
        id="productTypes"
        title="Product Type"
        selectedCount={selectedProductTypes.length}>
        <SearchableFilterList
          items={productTypes}
          selectedItems={selectedProductTypes}
          onToggle={handleProductTypeToggle}
          placeholder="Search product types..."
          emptyMessage="No product types found"
        />
      </FilterAccordion>
    </FilterPanelContainer>
  );
}
