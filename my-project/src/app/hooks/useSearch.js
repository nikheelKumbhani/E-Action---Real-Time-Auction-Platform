/**
 * Custom hook for search functionality
 */
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDebounce } from './useDebounce';
import { applyFilters, buildSearchParams, parseSearchParams } from '../utils/searchUtils';

export const useSearch = (products = []) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Initialize filters from URL
    const [filters, setFilters] = useState(() => parseSearchParams(searchParams));

    // Debounce search text
    const debouncedSearchText = useDebounce(filters.searchText, 300);

    // Update URL when filters change
    useEffect(() => {
        const params = buildSearchParams({
            ...filters,
            searchText: debouncedSearchText
        });

        const newUrl = params ? `${location.pathname}?${params}` : location.pathname;

        // Only update if URL actually changed
        if (newUrl !== `${location.pathname}${location.search}`) {
            navigate(newUrl, { replace: true });
        }
    }, [debouncedSearchText, filters.category, filters.minPrice, filters.maxPrice, filters.status, filters.sortBy]);

    // Apply filters to products
    const filteredProducts = useMemo(() => {
        return applyFilters(products, {
            ...filters,
            searchText: debouncedSearchText
        });
    }, [products, debouncedSearchText, filters.category, filters.minPrice, filters.maxPrice, filters.status, filters.sortBy]);

    // Update individual filter
    const updateFilter = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            searchText: '',
            category: 'all',
            minPrice: '',
            maxPrice: '',
            status: 'all',
            sortBy: 'newest'
        });
    };

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return filters.searchText !== '' ||
            filters.category !== 'all' ||
            filters.minPrice !== '' ||
            filters.maxPrice !== '' ||
            filters.status !== 'all' ||
            filters.sortBy !== 'newest';
    }, [filters]);

    return {
        filters,
        updateFilter,
        clearFilters,
        filteredProducts,
        hasActiveFilters,
        resultCount: filteredProducts.length
    };
};
