"use client"

import { useState } from "react"
import { ChevronRight, Search } from "lucide-react"
import { NavLink } from "react-router-dom"

// Utility function for conditional class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Sample category data - removed gradient colors
const categories = [
  {
    id: 1,
    name: "Art & Collectibles",
    image: "../images/category/95f61a9397a3d3fc23c05164e09e68f9.jpg?height=200&width=300",
    itemCount: 1243,
    featured: true,
    subcategories: ["Paintings", "Sculptures", "Prints", "Photography"],
  },
  {
    id: 2,
    name: "Jewelry & Watches",
    image: "../images/category/361879aae0ebd7e22af746d931a94979.jpg?height=200&width=300",
    itemCount: 876,
    featured: true,
    subcategories: ["Necklaces", "Rings", "Watches", "Bracelets"],
  },
  {
    id: 3,
    name: "Antiques",
    image: "../images/category/e5bfa8da9cca7dfe02005def474850de.jpg?height=200&width=300",
    itemCount: 654,
    featured: false,
    subcategories: ["Furniture", "Decorative Arts", "Silver", "Porcelain"],
  },
  {
    id: 4,
    name: "Cars & Motorcycles",
    image: "../images/category/b9a67049bf4fd0db1afcb733c97c8492.jpg?height=200&width=300",
    itemCount: 321,
    featured: true,
    subcategories: ["Classic Cars", "Vintage Motorcycles", "Luxury Vehicles", "Parts"],
  },
  {
    id: 5,
    name: "Wine & Spirits",
    image: "../images/category/7fa4ae55abd34a01e3139d7306a0d723.jpg?height=200&width=300",
    itemCount: 432,
    featured: false,
    subcategories: ["Red Wine", "White Wine", "Whiskey", "Champagne"],
  },
  {
    id: 6,
    name: "Real Estate",
    image: "../images/category/1032addde63cb3191d4f2bba54572c11.jpg?height=200&width=300",
    itemCount: 187,
    featured: false,
    subcategories: ["Residential", "Commercial", "Land", "Luxury Properties"],
  },
]

export default function CategorySection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState(null)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const featuredCategories = filteredCategories.filter((category) => category.featured)
  const regularCategories = filteredCategories.filter((category) => !category.featured)

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <span className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Explore</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover unique items across our popular auction categories
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-lg transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
              Featured Categories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-emerald-500 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Card Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-2xl font-bold mb-1">{category.name}</h4>
                    <p className="text-sm opacity-90">{category.itemCount} items</p>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-emerald-600/95 backdrop-blur-sm flex flex-col justify-center items-center p-8 transition-all duration-500",
                      activeCategory === category.id ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                  >
                    <h4 className="text-2xl font-bold text-white mb-4">{category.name}</h4>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {category.subcategories.map((sub, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                          {sub}
                        </span>
                      ))}
                    </div>
                    <NavLink
                      to={`/category/${category.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                    >
                      Browse Now
                      <ChevronRight className="w-4 h-4" />
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Categories Grid */}
        {regularCategories.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-600 rounded-full"></span>
              All Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {regularCategories.map((category) => (
                <NavLink
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group relative flex flex-col items-center p-6 bg-white border-2 border-gray-200 hover:border-emerald-500 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-16 h-16 rounded-xl bg-emerald-600 mb-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 text-center mb-1">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.itemCount} items</p>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <NavLink
            to="/categories"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            View All Categories
            <ChevronRight className="ml-2 w-5 h-5" />
          </NavLink>
        </div>
      </div>
    </section>
  )
}
