import React from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Reserve Prices: A Seller's Guide",
    summary: "Learn when and how to set reserve prices to maximize your auction success while protecting your investment.",
    author: "Mike Chen",
    date: "March 12, 2024",
    category: "Selling Guides",
    image: "https://images.pexels.com/photos/6347707/pexels-photo-6347707.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "Platform Security Update: New Authentication Features",
    summary: "We've enhanced our security measures with two-factor authentication and advanced fraud detection.",
    author: "Security Team",
    date: "March 10, 2024",
    category: "Platform Updates",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Success Story: From Garage Sale to $50K Profit",
    summary: "How one seller transformed their collecting hobby into a thriving auction business on our platform.",
    author: "Jennifer Rodriguez",
    date: "March 8, 2024",
    category: "Success Stories",
    image: "https://images.pexels.com/photos/6446707/pexels-photo-6446707.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    title: "Bidding Psychology: Reading the Room",
    summary: "Master the mental game of auctions and learn to recognize bidding patterns and competitor behavior.",
    author: "Dr. Amanda Foster",
    date: "March 5, 2024",
    category: "Bidding Tips",
    image: "https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 5,
    title: "Avoiding Common Auction Scams",
    summary: "Stay safe while bidding with our comprehensive guide to identifying and avoiding fraudulent listings.",
    author: "Safety Team",
    date: "March 3, 2024",
    category: "Security & Safety",
    image: "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    title: "New Terms of Service: What's Changed",
    summary: "Important updates to our terms of service and how they affect your buying and selling experience.",
    author: "Legal Team",
    date: "March 1, 2024",
    category: "Policies & Rules",
    image: "https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export default function BlogGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <h2 className="text-3xl font-bold text-black mb-8">Latest Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <button className="group/btn flex items-center space-x-1 text-black hover:text-gray-600 transition-colors">
                        <span className="text-sm font-medium">Read More</span>
                        <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-black text-black px-8 py-3 rounded-md hover:bg-black hover:text-white transition-all duration-300 font-medium">
                Load More Articles
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-6">Categories</h3>
              <nav className="space-y-3">
                {[
                  { name: 'Bidding Tips', count: 12 },
                  { name: 'Selling Guides', count: 8 },
                  { name: 'Platform Updates', count: 5 },
                  { name: 'Success Stories', count: 15 },
                  { name: 'Security & Safety', count: 7 },
                  { name: 'Policies & Rules', count: 4 }
                ].map((category) => (
                  <a
                    key={category.name}
                    href="#"
                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-black font-medium">
                      {category.name}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {category.count}
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}