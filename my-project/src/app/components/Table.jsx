import React from 'react';
import Image from 'next/image';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

export const Table = ({ products, delProduct, handleSellProduct, isWon, startIndex }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  // Get status badge for product status with emerald-600 theme
  const getStatusBadge = (product) => {
    if (product.isSoldout) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-700">
          Sold Out
        </span>
      );
    }
    if (product.isPublished) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
          Verified
        </span>
      );
    }
    if (product.verifyRequest) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700">
          Pending Verification
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
        Pending
      </span>
    );
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.N</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Base Price</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Bid</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Bids</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Added On</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product, index) => (
            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700">
                {(startIndex || 0) + index + 1}
              </td>
              <td className="px-6 py-4">
                {(product.image || (product.images && product.images.length > 0 && product.images[0].filePath)) ? (
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={product.image || product.images[0].filePath}
                      alt={product.title}
                      fill
                      className="rounded-lg object-cover border border-gray-200"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-xs text-gray-400">No Image</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {product.title}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${product.basePrice}
              </td>
              <td className="px-6 py-4 text-sm">
                {product.currentHighestBid ? (
                  <span className="font-semibold text-emerald-600">${product.currentHighestBid}</span>
                ) : (
                  <span className="text-gray-400">No bids yet</span>
                )}
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(product)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                <span className="font-medium">{product.totalBids}</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {formatDate(product.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <NavLink to={`/details/${product._id}`}>
                    <button className="p-2 rounded-lg hover:bg-blue-50 transition-colors" title="View">
                      <AiOutlineEye className="text-blue-600" size={20} />
                    </button>
                  </NavLink>
                  {!product.isSoldout && !isWon && (
                    <>
                      <NavLink to={`/product/update/${product._id}`}>
                        <button className="p-2 rounded-lg hover:bg-emerald-50 transition-colors" title="Edit">
                          <AiOutlineEdit className="text-emerald-600" size={20} />
                        </button>
                      </NavLink>
                      <button
                        onClick={() => delProduct(product._id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <AiOutlineDelete className="text-red-600" size={20} />
                      </button>
                      {product.isPublished && (
                        <button
                          onClick={() => handleSellProduct(product._id)}
                          className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Sell
                        </button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

