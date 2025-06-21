import React from 'react';
import { Gavel } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-black rounded-full">
            <Gavel className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
          About Us
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
          Who We Are and What We Do
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          We are a premier online auction platform dedicated to connecting passionate buyers 
          and sellers worldwide. Our mission is to create a transparent, secure, and 
          accessible marketplace where extraordinary items find their perfect homes.
        </p>
      </div>
    </section>
  );
};

export default Hero;