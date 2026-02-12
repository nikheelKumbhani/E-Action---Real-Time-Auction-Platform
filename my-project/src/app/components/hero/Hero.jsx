"use client"
import React from 'react'
import "./Hero.css"

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="background-blur"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Discover Rare Treasures at Your Fingertips</h1>
        <p>Bid, win, and collect unique items from around the world</p>

        <div className="search-container">
          <input type="text" placeholder="Search for auctions..." />
          <button className="search-button">Search</button>
        </div>

        <div className="cta-buttons">
          <button className="cta-primary">Browse Auctions</button>
          <button className="cta-secondary">Sell an Item</button>
        </div>

        <div className="auction-stats">
          <div className="stat-item">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Active Auctions</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Happy Bidders</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">$2M+</span>
            <span className="stat-label">Items Sold</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

