import React from 'react';
import { ArrowRight, Gavel } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Gavel className="h-16 w-16 mx-auto mb-6 text-white" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to find your next great deal?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of bidders today and discover unique items, rare collectibles, and amazing deals in our trusted auction community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-md hover:bg-gray-100 transition-all duration-300 font-bold">
            <span>Start Bidding</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-black transition-all duration-300 font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}