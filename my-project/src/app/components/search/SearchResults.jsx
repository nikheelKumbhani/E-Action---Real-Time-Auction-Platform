import { Search } from "lucide-react";
import ProductCard from "../cards/ProductCard";
import { Loader } from "../../router";

/**
 * SearchResults component to display filtered products
 */
export const SearchResults = ({
    products = [],
    isLoading = false,
    resultCount = 0,
    searchQuery = ''
}) => {
    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader />
            </div>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                </h3>
                <p className="text-gray-500 max-w-md">
                    {searchQuery
                        ? `We couldn't find any products matching "${searchQuery}". Try adjusting your filters or search terms.`
                        : "Try adjusting your filters to see more results."
                    }
                </p>
            </div>
        );
    }

    // Results
    return (
        <div>
            {/* Result Count */}
            <div className="mb-4">
                <p className="text-gray-600">
                    Found <span className="font-semibold text-gray-900">{resultCount}</span> {resultCount === 1 ? 'product' : 'products'}
                </p>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
