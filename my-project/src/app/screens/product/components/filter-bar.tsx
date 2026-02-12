"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
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
    <div className="sticky top-0 z-10 bg-background py-4 mb-6 border-b">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by product name or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isLoading ? (
                  <SelectItem value="loading">Loading...</SelectItem>
                ) : (
                  categorys?.map((cat: any) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ending-soon">Ending Soon</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="most-bids">Most Bids</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="sm" onClick={resetFilters} className="flex items-center">
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
