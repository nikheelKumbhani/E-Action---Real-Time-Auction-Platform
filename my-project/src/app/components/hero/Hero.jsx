"use client"
import React from 'react'
import { Search, Gavel, TrendingUp, Users, DollarSign } from 'lucide-react'

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating decorative shapes - subtle */}
      <div className="absolute w-full h-full overflow-hidden z-[1]">
        <div className="absolute w-[300px] h-[300px] top-[10%] left-[10%] rounded-full bg-emerald-500/5 backdrop-blur-[10px] animate-float"></div>
        <div className="absolute w-[200px] h-[200px] top-[60%] right-[15%] rounded-full bg-emerald-500/5 backdrop-blur-[10px] animate-float-reverse"></div>
        <div className="absolute w-[150px] h-[150px] bottom-[10%] left-1/2 rounded-full bg-emerald-500/5 backdrop-blur-[10px] animate-float-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Animated headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-gray-900">
          Discover Rare Treasures
          <br />
          <span className="text-emerald-600">at Your Fingertips</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.2s]">
          Bid, win, and collect unique items from around the world
        </p>

        {/* Search container */}
        <div className="mb-10 animate-fade-in-up [animation-delay:0.4s]">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-lg hover:border-emerald-500 transition-all duration-300 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Search className="ml-4 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for rare collectibles, art, antiques..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 py-3 px-2 text-base"
              />
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group">
                <span>Search</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3L13 8L8 13M13 8H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up [animation-delay:0.6s]">
          <button className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Gavel size={20} />
            <span>Browse Auctions</span>
          </button>
          <button className="flex items-center gap-3 bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 hover:text-white hover:-translate-y-1 transition-all duration-300">
            <TrendingUp size={20} />
            <span>Sell an Item</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up [animation-delay:0.8s]">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
                <Gavel className="text-white" size={24} />
              </div>
              <div className="text-left">
                <span className="block text-3xl font-bold text-gray-900">5,000+</span>
                <span className="block text-sm text-gray-600 mt-1">Active Auctions</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
                <Users className="text-white" size={24} />
              </div>
              <div className="text-left">
                <span className="block text-3xl font-bold text-gray-900">10K+</span>
                <span className="block text-sm text-gray-600 mt-1">Happy Bidders</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-500 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
                <DollarSign className="text-white" size={24} />
              </div>
              <div className="text-left">
                <span className="block text-3xl font-bold text-gray-900">$2M+</span>
                <span className="block text-sm text-gray-600 mt-1">Items Sold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
