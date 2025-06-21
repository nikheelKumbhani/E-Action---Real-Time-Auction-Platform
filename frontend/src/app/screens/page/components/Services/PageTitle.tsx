import React from 'react';
import { Gavel } from 'lucide-react';

const PageTitle: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-black rounded-full">
            <Gavel className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 tracking-tight">
          Our Services
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Everything You Need to Buy, Sell, and Succeed
        </p>
        <div className="mt-12 w-24 h-1 bg-black mx-auto"></div>
      </div>
    </section>
  );
};

export default PageTitle;