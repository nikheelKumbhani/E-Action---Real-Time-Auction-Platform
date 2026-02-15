"use client"

import Image from "next/image"
import { useSelector } from "react-redux";

interface Product {
  _id: string;
  title: string;
  images?: { filePath: string }[];
  user?: { name: string };
  basePrice: number;
  bidStartPrice: number;
  totalBids: number;
  categoryName: string;
  bidEndDate: string;
  isPublished: boolean;
  isSoldout: boolean;
  verifyRequest: boolean;
  createdAt: string;
}

const truncateText = (text: string, maxLength: number = 25): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export function RecentProductsTable() {
  const { products } = useSelector((state: any) => state.product);

  // Get last 7 products, sorted by creation date
  const recentProducts = [...products]
    .filter(product => product !== null) // Filter out null products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 7);

  // Get status badge for product status
  const getStatusBadge = (product: Product) => {
    if (product.isPublished) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
          Verified
        </span>
      )
    }
    if (product.isSoldout) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          Sold Out
        </span>
      )
    }
    if (product.verifyRequest) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
          Pending
        </span>
      )
    }
    return (
      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
        Draft
      </span>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Product Details
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Base Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Current Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Bids
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                End Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {recentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-gray-500 text-sm">No products available at the moment</p>
                    <p className="text-gray-400 text-xs">Check back later for new auctions</p>
                  </div>
                </td>
              </tr>
            ) : (
              recentProducts.map((product) => (
                <tr key={product?._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-gray-200">
                        <Image
                          src={product?.images?.[0]?.filePath || '/placeholder.svg'}
                          alt={product?.title || 'Product'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col max-w-xs">
                        <span className="font-medium text-gray-900 truncate" title={product?.title}>
                          {truncateText(product?.title || 'Untitled Product', 30)}
                        </span>
                        <span className="text-xs text-gray-500 truncate">
                          by {product?.user?.name || 'Unknown Seller'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    ${product?.basePrice?.toLocaleString() || 0}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {product.currentHighestBid ? (
                      <span className="font-semibold text-emerald-600">${product.currentHighestBid}</span>
                    ) : (
                      <span className="text-gray-400">No bids yet</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap text-center">
                    {product.totalBids || 0}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {product?.categoryName || 'Uncategorized'}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                    {product?.bidEndDate ? new Date(product.bidEndDate).toLocaleDateString() : 'Not set'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(product)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
