import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Badge } from "@/app/components/ui/badge"

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

  // Get status badge for product status
const getStatusBadge = (product) => {
  if (product.isPublished) {
    return <Badge className="bg-lime-500 hover:bg-green-600">Verified</Badge>
  }
  if (product.isSoldout) {
    return <Badge className="bg-red-500 hover:bg-red-600">Sold Out</Badge>
  }
  if (product.verifyRequest) {
    return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending Verification</Badge>
  }
  return (
    <Badge variant="outline" className="text-yellow-600 border-yellow-400">
      Pending
    </Badge>
  )
}

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Bid</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bids</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <tr key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {startIndex + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {product.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${product.basePrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.biddingPrice ? (
                  <span className="text-green-600 font-semibold">${product.biddingPrice}</span>
                ) : (
                  <span className="text-gray-400">No bids yet</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}>                
                  {getStatusBadge(product)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.totalBids}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(product.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-3">
                  <NavLink to={`/details/${product._id}`}>
                    <AiOutlineEye className="text-blue-600 hover:text-blue-900" size={20} />
                  </NavLink>
                  {!product.isSoldout && !isWon && (
                    <>
                      <NavLink to={`/product/update/${product._id}`}>
                        <AiOutlineEdit className="text-green-600 hover:text-green-900" size={20} />
                      </NavLink>
                      <button onClick={() => delProduct(product._id)}>
                        <AiOutlineDelete className="text-red-600 hover:text-red-900" size={20} />
                      </button>
                      {product.isPublished && (
                        <button
                          onClick={() => handleSellProduct(product._id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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

