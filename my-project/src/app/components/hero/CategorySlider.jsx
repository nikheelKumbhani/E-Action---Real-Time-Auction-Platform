"use client"

import { useState } from "react"
import { ChevronRight, Search } from "lucide-react"
import { NavLink } from "react-router-dom"

// Utility function for conditional class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Sample category data
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
    <section className="w-full py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
            <p className="text-gray-600 mt-2">Discover unique items across our popular auction categories</p>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {featuredCategories.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h4 className="text-xl font-bold">{category.name}</h4>
                    <p className="text-sm opacity-90">{category.itemCount} items</p>
                  </div>

                  <div
                    className={cn(
                      "absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 transition-opacity duration-300",
                      activeCategory === category.id ? "opacity-100" : "opacity-0 pointer-events-none",
                    )}
                  >
                    <h4 className="text-xl font-bold text-white mb-4">{category.name}</h4>
                    <ul className="space-y-2 w-full">
                      {category.subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className="flex items-center text-gray-200 hover:text-white transition-colors duration-200"
                          >
                            <ChevronRight className="h-4 w-4 mr-2" />
                            {subcategory}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="mt-6 px-4 py-2 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors duration-200"
                    >
                      View All
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {regularCategories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="h-12 w-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-500">{category.itemCount} items</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <NavLink
            to="/product"
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            View All Categories
            <ChevronRight className="ml-2 h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </section>
  )
}

