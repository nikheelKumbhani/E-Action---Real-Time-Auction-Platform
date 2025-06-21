  import React from 'react';

  export default function HeroBanner() {
    return (
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-24">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Auction Insights,
            <span className="block">Tips & News</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about bidding, selling, and succeeding on our platform
          </p>
          <div className="mt-8 w-24 h-1 bg-white mx-auto"></div>
        </div>
      </section>
    );
  }