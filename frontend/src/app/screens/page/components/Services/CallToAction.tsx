import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Experience seamless auctions with our trusted services
        </h2>
        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
          Join thousands of satisfied users who have transformed their buying and selling experience
        </p>
        <button className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-lg">
          Get Started Today
          <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default CallToAction;