import { useState } from "react";
import { Container } from "../../router";
import { Gavel, Calendar, User, ArrowRight, Search, Tag } from "lucide-react";

// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "10 Tips for Winning Auctions",
        excerpt: "Learn the strategies that successful bidders use to win their desired items at the best prices.",
        author: "Sarah Johnson",
        date: "February 10, 2026",
        category: "Tips & Tricks",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "How to Become a Successful Seller",
        excerpt: "Start your selling journey with these essential tips for creating attractive auction listings.",
        author: "Michael Chen",
        date: "February 8, 2026",
        category: "Selling",
        image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=400&fit=crop",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "Understanding Auction Types",
        excerpt: "A comprehensive guide to different auction formats and which one is right for your items.",
        author: "Emily Rodriguez",
        date: "February 5, 2026",
        category: "Education",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Safe Payment Practices",
        excerpt: "Protect yourself with these essential security tips for auction transactions.",
        author: "David Park",
        date: "February 3, 2026",
        category: "Security",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
        readTime: "4 min read"
    },
    {
        id: 5,
        title: "Collectibles Market Trends 2026",
        excerpt: "Discover what's hot in the collectibles market and where to find the best deals.",
        author: "Lisa Anderson",
        date: "January 30, 2026",
        category: "Market Insights",
        image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&h=400&fit=crop",
        readTime: "8 min read"
    },
    {
        id: 6,
        title: "Building Your Seller Reputation",
        excerpt: "Expert advice on establishing trust and credibility on our platform.",
        author: "James Wilson",
        date: "January 28, 2026",
        category: "Selling",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
        readTime: "5 min read"
    }
];

const categories = ["All", "Tips & Tricks", "Selling", "Education", "Security", "Market Insights"];

export const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="min-h-screen bg-gray-50 py-12">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
                <Container>
                    <div className="py-16 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <Gavel className="w-8 h-8 text-emerald-600" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">AuctionHub Blog</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Expert insights, tips, and updates from the world of online auctions
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 max-w-xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="mt-12">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-12">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                        ? "bg-emerald-600 text-white"
                                        : "bg-white text-gray-700 border border-gray-200 hover:border-emerald-600 hover:text-emerald-600"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-gray-200">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                                            <Tag className="w-3 h-3" />
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>

                                    {/* Read More */}
                                    <button className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                                        Read Article
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
};
