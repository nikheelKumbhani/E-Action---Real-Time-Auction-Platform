"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories } from "@/app/redux/features/categorySlice"

interface FilterBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export default function FilterBar({ onSearch, onCategoryChange, onSortChange, onReset }: FilterBarProps) {
  const dispatch = useDispatch()
  const { categorys, isLoading } = useSelector((state: any) => state.category)

  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    dispatch(getAllCategories() as any)
  }, [dispatch])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    onCategoryChange(value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onSortChange(value)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setCategory("")
    setSortBy("")
    onReset()
  }

  return (
    <div className="sticky top-0 z-10 bg-white py-4 mb-6 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
          <input
            type="text"
            placeholder="Search by product name or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-gray-50 text-gray-900"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 min-w-[180px]"
          >
            <option value="">All Categories</option>
            {isLoading ? (
              <option value="">Loading...</option>
            ) : (
              categorys?.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 min-w-[180px]"
          >
            <option value="">Sort By</option>
            <option value="ending-soon">Ending Soon</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="most-bids">Most Bids</option>
          </select>

          <button
            onClick={resetFilters}
            className="flex items-center px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
