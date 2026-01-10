import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIME } from '@/lib/constants';

interface Filters {
  vendors?: string[];
  types?: string[];
  priceRange?: [number, number];
}

interface UseProductFiltersReturn {
  selectedVendors: string[];
  selectedProductTypes: string[];
  selectedPriceRange: [number, number];
  handleFiltersChange: (values: Filters) => void;
  clearAllFilters: () => void;
}

export default function useProductFilters(priceRange: {
  min: number;
  max: number;
}): UseProductFiltersReturn {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const debouncedReplace = useDebouncedCallback((url: string) => {
    replace(url);
  }, DEBOUNCE_TIME);

  const selectedVendors = searchParams.get('vendors')?.split(',') || [];
  const selectedProductTypes = searchParams.get('types')?.split(',') || [];
  const minPrice = searchParams.get('minPrice') || priceRange.min.toString();
  const maxPrice = searchParams.get('maxPrice') || priceRange.max.toString();
  const selectedPriceRange: [number, number] = [parseFloat(minPrice), parseFloat(maxPrice)];

  const handleFiltersChange = useCallback(
    (values: Filters) => {
      const params = new URLSearchParams(searchParams);
      const { vendors, types } = values;

      if (vendors !== undefined) {
        if (vendors.length > 0) {
          params.set('vendors', vendors.join(','));
        } else {
          params.delete('vendors');
        }
      }

      if (types !== undefined) {
        if (types.length > 0) {
          params.set('types', types.join(','));
        } else {
          params.delete('types');
        }
      }

      if (values.priceRange !== undefined) {
        const [min, max] = values.priceRange;
        if (min !== priceRange.min || max !== priceRange.max) {
          params.set('minPrice', min.toString());
          params.set('maxPrice', max.toString());
        } else {
          params.delete('minPrice');
          params.delete('maxPrice');
        }
      }

      const url = `${pathname}?${params.toString()}`;
      debouncedReplace(url);
    },
    [searchParams, pathname, debouncedReplace, priceRange]
  );

  const clearAllFilters = () => {
    handleFiltersChange({
      vendors: [],
      types: [],
      priceRange: [priceRange.min, priceRange.max]
    });
  };

  return {
    selectedVendors,
    selectedProductTypes,
    selectedPriceRange,
    handleFiltersChange,
    clearAllFilters
  };
}
