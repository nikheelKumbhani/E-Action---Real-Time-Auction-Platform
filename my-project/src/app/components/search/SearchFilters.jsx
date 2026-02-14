import { Filter, X } from "lucide-react";
import { useState } from "react";
import { PrimaryButton } from "../../router";

/**
 * SearchFilters component for filtering and sorting
 */
export const SearchFilters = ({
    filters,
    onFilterChange,
    onClearFilters,
    categories = [],
    hasActiveFilters = false
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white border rounded-lg p-4">
            {/* Mobile Toggle */}
            <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-green hover:text-green-600"
                >
                    {isOpen ? 'Hide' : 'Show'}
                </button>
            </div>

            {/* Filters */}
            <div className={`space-y-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green"
                    >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => onFilterChange('minPrice', e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green"
                            min="0"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green"
                            min="0"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="ending-soon">Ending Soon</option>
                        <option value="ended">Ended</option>
                    </select>
                </div>

                {/* Sort By */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sort By
                    </label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => onFilterChange('sortBy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/20 focus:border-green"
                    >
                        <option value="newest">Newest First</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="ending-soon">Ending Soon</option>
                    </select>
                </div>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    );
};
