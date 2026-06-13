import { useState, useMemo } from 'react';

/**
 * useDashboardTableFilters
 *
 * A reusable hook for filtering dashboard table datasets based on a search query.
 */
export function useDashboardTableFilters<T extends Record<string, unknown>>(
  initialData: T[],
  searchField: keyof T
) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return initialData;
    const query = searchQuery.toLowerCase();
    return initialData.filter((item) => {
      const val = item[searchField];
      if (typeof val === 'string') {
        return val.toLowerCase().includes(query);
      }
      return false;
    });
  }, [initialData, searchQuery, searchField]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}
