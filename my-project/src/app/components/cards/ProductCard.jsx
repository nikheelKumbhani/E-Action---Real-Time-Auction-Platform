"use client"
import { Tag, Heart } from "lucide-react"
import { NavLink } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div className="w-full max-w-[320px] bg-white rounded-lg shadow-[0_2px_5px_rgba(0,0,0,0.1)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image?.filePath || "/placeholder.svg?height=200&width=300"}
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {item.isverify ? (
            <span className="text-xs font-semibold px-2 py-1 rounded-full text-white bg-green-500">Verified</span>
          ) : (
            <span className="text-xs font-semibold px-2 py-1 rounded-full text-white bg-yellow-500">Pending</span>
          )}
          {item.isSoldout && <span className="text-xs font-semibold px-2 py-1 rounded-full text-white bg-red-500">Sold Out</span>}
        </div>

        {/* Category tag */}
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center bg-black/70 text-white text-xs px-2 py-1 rounded-full">
            <Tag size={12} className="mr-1" />
            {item.category}
          </div>
        </div>

        {/* Favorite button */}
        <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full border-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] cursor-pointer hover:bg-gray-100 transition-colors">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-[1.4]">{item.description}</p>

        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-xl font-bold text-gray-900">${(item.price || 0).toLocaleString()}</p>
            {item.biddingPrice > 0 && <p className="text-sm text-gray-600">Current Bid: ${(item.biddingPrice || 0).toLocaleString()}</p>}
          </div>

          <div className="text-right">
            <span className="bg-sky-100 text-[#204C41] text-xs font-medium px-2.5 py-1 rounded">
              {item.totalBids} {item.totalBids === 1 ? "Bid" : "Bids"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <NavLink to={`/details/${item?._id}`}>
            <button className="w-full bg-[#5BBB7B] text-white font-medium py-2 px-4 border-none rounded cursor-pointer transition-colors duration-300 hover:bg-[#204C41]">{item.isSoldout ? "Sold Out" : "Place Bid"}</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
