"use client"

import { Suspense, useState } from "react"
import ProductGrid from "@/app/screens/product/components/product-grid"
import FilterBar from "@/app/screens/product/components/filter-bar"
import { Skeleton } from "@/app/components/ui/skeleton"

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Auction Products</h1>
        <p className="mt-2 text-muted-foreground">Place your bid before time runs out!</p>
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
          <div key={i} className="rounded-lg border bg-card shadow-sm">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
