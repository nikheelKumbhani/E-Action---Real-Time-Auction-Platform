"use client"

import { Suspense, useState } from "react"
import { Gavel } from "lucide-react"
import ProductGrid from "@/app/screens/product/components/product-grid"
import FilterBar from "@/app/screens/product/components/filter-bar"

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortBy: ""
  })

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }))
  }

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category }))
  }

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sortBy: sort }))
  }

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      sortBy: ""
    })
  }

  return (
    <div className="container w-full mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gavel className="w-10 h-10 text-emerald-600" />
          <h1 className="text-4xl font-bold text-gray-900">All Auction Products</h1>
        </div>
        <p className="mt-2 text-gray-600">Place your bid before time runs out!</p>
      </div>

      <FilterBar
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
      />

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid filters={filters} />
      </Suspense>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="h-48 w-full rounded-t-xl bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              <div className="flex justify-between">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
