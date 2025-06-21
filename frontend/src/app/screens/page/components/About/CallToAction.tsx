import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-black mb-8">
          Join Our Growing Community
        </h2>
        <p className="text-xl text-gray-700 mb-12 leading-relaxed">
          Become part of a passionate community of buyers and sellers. 
          Discover unique items, find great deals, and experience the thrill of winning auctions.
        </p>
        <button className="bg-black text-white px-12 py-4 text-xl font-bold rounded-lg hover:bg-gray-800 transition-colors duration-300 inline-flex items-center gap-3 group">
          Start Bidding Today
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-black mb-2">50K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">1M+</div>
            <div className="text-gray-600">Items Sold</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">99.8%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;