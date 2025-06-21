import React from 'react';
import { 
  Hammer, 
  HeadphonesIcon, 
  Shield, 
  CreditCard, 
  MessageCircle, 
  Star 
} from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Hammer className="w-8 h-8" />,
    title: "Online Auctions",
    description: "Real-time bidding system across various product categories with instant notifications and seamless user experience for maximum engagement."
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8" />,
    title: "Seller Support",
    description: "Comprehensive assistance with listing optimization, pricing strategies, and promotional tools to maximize your items' visibility and value."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Buyer Protection",
    description: "Advanced security measures including verified sellers, item authenticity guarantees, and comprehensive dispute resolution processes."
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Escrow & Secure Payments",
    description: "Protected payment handling for high-value transactions with multiple payment options and fraud prevention systems in place."
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Customer Support",
    description: "24/7 professional support team available via chat, email, and phone to assist with questions, technical issues, and transaction guidance."
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Premium Listings",
    description: "Featured placement options for sellers including homepage highlights, category promotions, and enhanced listing visibility tools."
  }
];

const ServicesGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-black mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;