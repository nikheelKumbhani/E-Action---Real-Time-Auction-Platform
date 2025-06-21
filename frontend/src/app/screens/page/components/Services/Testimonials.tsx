import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    quote: "Outstanding service! Sold my vintage collection with ease and got better prices than expected. The platform is incredibly user-friendly.",
    rating: 5
  },
  {
    name: "David Chen",
    quote: "As a buyer, I appreciate the security and transparency. Every transaction has been smooth, and customer support is always helpful.",
    rating: 5
  },
  {
    name: "Maria Rodriguez",
    quote: "Been using this platform for over two years. The escrow service gives me peace of mind for high-value purchases. Highly recommended!",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-5 h-5 ${index < rating ? 'fill-current text-black' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            What Our Users Say
          </h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed text-center">
                "{testimonial.quote}"
              </p>
              <div className="text-center">
                <h4 className="font-semibold text-black">
                  {testimonial.name}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;