import React from 'react';
import { 
  Users, 
  DollarSign, 
  Smartphone, 
  Lock, 
  Globe 
} from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Trusted by thousands",
    description: "Join over 100,000 satisfied users worldwide"
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Transparent fees",
    description: "No hidden costs, clear pricing structure"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Easy-to-use platform",
    description: "Intuitive interface for seamless experience"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure transactions",
    description: "Bank-level security for all payments"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global reach",
    description: "Connect with buyers and sellers worldwide"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Why Choose Our Services
          </h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;