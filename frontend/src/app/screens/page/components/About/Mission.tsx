import React from 'react';
import { Target } from 'lucide-react';

const Mission = () => {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-white rounded-full">
            <Target className="w-12 h-12 text-black" />
          </div>
        </div>
        <h2 className="text-5xl font-bold text-white mb-8">Our Mission</h2>
        <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          To revolutionize the auction experience by making it accessible, secure, and 
          enjoyable for everyone. We believe that every item has a story, and every 
          bidder deserves a fair chance to discover something extraordinary.
        </p>
      </div>
    </section>
  );
};

export default Mission;