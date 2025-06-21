import React from 'react';
import { Shield, Eye, Lock, Lightbulb, Heart } from 'lucide-react';

const Values = () => {
  const values = [
    {
      title: 'Trust',
      description: 'Building lasting relationships through verified transactions',
      icon: Shield
    },
    {
      title: 'Transparency',
      description: 'Open and honest communication in every interaction',
      icon: Eye
    },
    {
      title: 'Security',
      description: 'Protecting your data and transactions with advanced technology',
      icon: Lock
    },
    {
      title: 'Innovation',
      description: 'Continuously improving the auction experience',
      icon: Lightbulb
    },
    {
      title: 'Customer Focus',
      description: 'Putting our users at the heart of everything we do',
      icon: Heart
    }
  ];

  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-black text-center mb-16">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-lg border-2 border-gray-200 hover:border-black transition-colors duration-300 group">
                <div className="bg-black group-hover:bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-6 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Values;