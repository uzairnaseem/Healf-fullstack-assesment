import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { getSearchSuggestions } from '@/lib/actions/services/products';
import { DEBOUNCE_TIME } from '@/lib/constants';

interface UseSearchWithSuggestionsReturn {
  search: string;
  suggestions: string[];
  isLoadingSuggestions: boolean;
  handleInputChange: (value: string) => void;
  handleSubmit: (value: string) => void;
}

export function useSearchWithSuggestions(): UseSearchWithSuggestionsReturn {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_TIME);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const debouncedReplace = useDebouncedCallback((url: string) => {
    replace(url);
  }, DEBOUNCE_TIME);

  const handleSubmit = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('query', value);

    if (value.length === 0) {
      params.delete('query');
    }

    const url = `${pathname}?${params.toString()}`;
    debouncedReplace(url);
  };

  const handleInputChange = (value: string) => {
    setSearch(value);

    // If cleared, immediately update URL
    if (!value?.trim()?.length) {
      handleSubmit(value || '');
    }
  };

  const fetchSuggestions = useCallback(async () => {
    setIsLoadingSuggestions(true);
    try {
      const results = await getSearchSuggestions(debouncedSearch);
      setSuggestions(results);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchSuggestions();
  }, [debouncedSearch, fetchSuggestions]);

  return {
    search,
    suggestions,
    isLoadingSuggestions,
    handleInputChange,
    handleSubmit
  };
}
