import React from 'react';
import { CheckCircle, CreditCard, Users, Headphones, Globe } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Verified Sellers',
      description: 'All sellers undergo rigorous verification for your peace of mind',
      icon: CheckCircle
    },
    {
      title: 'Secure Payments',
      description: 'Bank-level encryption and secure payment processing',
      icon: CreditCard
    },
    {
      title: 'Transparent Bidding',
      description: 'Fair and open bidding process with real-time updates',
      icon: Users
    },
    {
      title: 'Excellent Support',
      description: '24/7 customer support to assist with any questions',
      icon: Headphones
    },
    {
      title: 'Global Reach',
      description: 'Trusted by thousands of users worldwide',
      icon: Globe
    }
  ];

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-16">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors duration-300">
                  <IconComponent className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;