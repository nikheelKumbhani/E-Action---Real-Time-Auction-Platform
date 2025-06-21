import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function FeaturedArticle() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/6775264/pexels-photo-6775264.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Featured article"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
              FEATURED
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
              The Ultimate Guide to Winning Your First Auction
            </h2>
            
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>March 15, 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Sarah Johnson</span>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Discover insider secrets and proven strategies that successful bidders use to win auctions consistently. From timing your bids to understanding market psychology, this comprehensive guide covers everything you need to know.
            </p>
            
            <button className="group flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:translate-x-1">
              <span className="font-medium">Read Full Article</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}