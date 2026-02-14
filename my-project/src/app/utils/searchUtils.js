/**
 * Search utility functions
 */

/**
 * Filter products by text search
 */
export const filterByText = (products, searchText) => {
    if (!searchText || searchText.trim() === '') {
        return products;
    }

    const lowerSearch = searchText.toLowerCase().trim();

    return products.filter(product => {
        const nameMatch = product.title?.toLowerCase().includes(lowerSearch);
        const descMatch = product.description?.toLowerCase().includes(lowerSearch);
        return nameMatch || descMatch;
    });
};

/**
 * Filter products by category
 */
export const filterByCategory = (products, category) => {
    if (!category || category === 'all') {
        return products;
    }

    return products.filter(product =>
        product.category?.toLowerCase() === category.toLowerCase()
    );
};

/**
 * Filter products by price range
 */
export const filterByPriceRange = (products, minPrice, maxPrice) => {
    return products.filter(product => {
        const price = product.price || product.currentBid || 0;
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;

        return price >= min && price <= max;
    });
};

/**
 * Filter products by status
 */
export const filterByStatus = (products, status) => {
    if (!status || status === 'all') {
        return products;
    }

    const now = new Date();

    return products.filter(product => {
        const endDate = product.endDate ? new Date(product.endDate) : null;

        switch (status) {
            case 'active':
                return endDate && endDate > now;
            case 'ending-soon':
                if (!endDate) return false;
                const hoursRemaining = (endDate - now) / (1000 * 60 * 60);
                return hoursRemaining > 0 && hoursRemaining <= 24;
            case 'ended':
                return endDate && endDate <= now;
            default:
                return true;
        }
    });
};

/**
 * Sort products
 */
export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => {
                const priceA = a.price || a.currentBid || 0;
                const priceB = b.price || b.currentBid || 0;
                return priceA - priceB;
            });

        case 'price-desc':
            return sorted.sort((a, b) => {
                const priceA = a.price || a.currentBid || 0;
                const priceB = b.price || b.currentBid || 0;
                return priceB - priceA;
            });

        case 'ending-soon':
            return sorted.sort((a, b) => {
                const dateA = a.endDate ? new Date(a.endDate) : new Date(8640000000000000);
                const dateB = b.endDate ? new Date(b.endDate) : new Date(8640000000000000);
                return dateA - dateB;
            });

        case 'newest':
        default:
            return sorted.sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
                const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
                return dateB - dateA;
            });
    }
};

/**
 * Apply all filters and sorting
 */
export const applyFilters = (products, filters) => {
    let filtered = products;

    // Apply text search
    if (filters.searchText) {
        filtered = filterByText(filtered, filters.searchText);
    }

    // Apply category filter
    if (filters.category) {
        filtered = filterByCategory(filtered, filters.category);
    }

    // Apply price range filter
    if (filters.minPrice !== '' || filters.maxPrice !== '') {
        filtered = filterByPriceRange(filtered, filters.minPrice, filters.maxPrice);
    }

    // Apply status filter
    if (filters.status) {
        filtered = filterByStatus(filtered, filters.status);
    }

    // Apply sorting
    if (filters.sortBy) {
        filtered = sortProducts(filtered, filters.sortBy);
    }

    return filtered;
};

/**
 * Build URL search params from filters
 */
export const buildSearchParams = (filters) => {
    const params = new URLSearchParams();

    if (filters.searchText) params.set('q', filters.searchText);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.minPrice !== '') params.set('minPrice', filters.minPrice);
    if (filters.maxPrice !== '') params.set('maxPrice', filters.maxPrice);
    if (filters.status && filters.status !== 'all') params.set('status', filters.status);
    if (filters.sortBy && filters.sortBy !== 'newest') params.set('sort', filters.sortBy);

    return params.toString();
};

/**
 * Parse URL search params to filters
 */
export const parseSearchParams = (searchParams) => {
    return {
        searchText: searchParams.get('q') || '',
        category: searchParams.get('category') || 'all',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        status: searchParams.get('status') || 'all',
        sortBy: searchParams.get('sort') || 'newest'
    };
};
