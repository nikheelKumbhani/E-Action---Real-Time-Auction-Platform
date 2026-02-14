import { Container, SearchBar, SearchFilters, SearchResults, useSearch } from "../../router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

/**
 * Search page for finding products
 */
export const Search = () => {
    const { products, isLoading } = useSelector((state) => state.product);
    const [categories, setCategories] = useState([]);

    // Extract unique categories from products
    useEffect(() => {
        if (products && products.length > 0) {
            const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
            setCategories(uniqueCategories);
        }
    }, [products]);

    // Use search hook
    const {
        filters,
        updateFilter,
        clearFilters,
        filteredProducts,
        hasActiveFilters,
        resultCount
    } = useSearch(products || []);

    return (
        <Container>
            <div className="py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Products</h1>
                    <p className="text-gray-600">Find the perfect item from our auction listings</p>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <SearchBar
                        value={filters.searchText}
                        onChange={(value) => updateFilter('searchText', value)}
                        onClear={() => updateFilter('searchText', '')}
                        placeholder="Search by product name or description..."
                        className="w-full"
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <SearchFilters
                            filters={filters}
                            onFilterChange={updateFilter}
                            onClearFilters={clearFilters}
                            categories={categories}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-3">
                        <SearchResults
                            products={filteredProducts}
                            isLoading={isLoading}
                            resultCount={resultCount}
                            searchQuery={filters.searchText}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
