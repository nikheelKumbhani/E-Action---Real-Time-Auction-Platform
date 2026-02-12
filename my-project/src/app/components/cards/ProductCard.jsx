"use client"
import { Tag, Heart } from "lucide-react"
import { NavLink } from "react-router-dom";

import "./ProductCard.css"
const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={item.image?.filePath || "/placeholder.svg?height=200&width=300"}
          alt={item.title}
          className="product-image"
        />

        {/* Status badges */}
        <div className="status-badges">
          {item.isverify ? (
            <span className="badge verified">Verified</span>
          ) : (
            <span className="badge pending">Pending</span>
          )}
          {item.isSoldout && <span className="badge sold-out">Sold Out</span>}
        </div>

        {/* Category tag */}
        <div className="category-tag">
          <div className="category-label">
            <Tag size={12} className="category-icon" />
            {item.category}
          </div>
        </div>

        {/* Favorite button */}
        <button className="favorite-button">
          <Heart size={18} className="heart-icon" />
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-title">{item.title}</h3>
        <p className="product-description">{item.description}</p>

        <div className="price-container">
          <div className="price-info">
            <p className="main-price">${(item.price || 0).toLocaleString()}</p>
            {item.biddingPrice > 0 && <p className="bid-price">Current Bid: ${(item.biddingPrice || 0).toLocaleString()}</p>}
          </div>

          <div className="bid-count">
            <span className="bid-badge">
              {item.totalBids} {item.totalBids === 1 ? "Bid" : "Bids"}
            </span>
          </div>
        </div>

        <div className="action-container">
        <NavLink to={`/details/${item?._id}`}>
          <button className="bid-button">{item.isSoldout ? "Sold Out" : "Place Bid"}</button>
        </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
