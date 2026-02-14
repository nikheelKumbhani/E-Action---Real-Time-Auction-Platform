"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { NavLink } from "react-router-dom"
import { Heart, Clock, Award, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/app/hooks/use-toast"
import { cn } from "@/app/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "@/app/redux/features/productSlice"

interface Product {
  _id: string;
  title: string;
  description: string;
  images: Array<{
    fileName: string;
    filePath: string;
    fileType: string;
    public_id: string;
  }>;
  category: string;
  categoryName: string;
  basePrice: number;
  bidStartPrice: number;
  bidEndDate: string;
  verifyRequest: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  isSoldout: boolean;
  totalBids: number;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProductGridProps {
  filters: {
    search: string;
    category: string;
    sortBy: string;
  }
}

const PRODUCTS_PER_PAGE = 20;

export default function ProductGrid({ filters }: ProductGridProps) {
  const dispatch = useDispatch()
  const { products, isLoading } = useSelector((state: any) => state.product)
  const [page, setPage] = useState(1)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([])
  const { toast } = useToast()

  useEffect(() => {
    dispatch(getAllProducts() as any)
  }, [dispatch])

  useEffect(() => {
    if (!products) return

    let result = [...products]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        product =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      )
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category)
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'ending-soon':
          result.sort((a, b) => new Date(a.bidEndDate).getTime() - new Date(b.bidEndDate).getTime())
          break
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case 'price-low':
          result.sort((a, b) => a.basePrice - b.basePrice)
          break
        case 'price-high':
          result.sort((a, b) => b.basePrice - a.basePrice)
          break
        case 'most-bids':
          result.sort((a, b) => b.totalBids - a.totalBids)
          break
      }
    }

    setFilteredProducts(result)
    setPage(1) // Reset to first page when filters change
  }, [filters, products])

  // Handle pagination
  useEffect(() => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex))
  }, [page, filteredProducts])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)

  const handlePreviousPage = () => {
    setPage(prev => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setPage(prev => Math.min(totalPages, prev + 1))
  }

  const handleWatchlist = (productId: string) => {
    toast({
      title: "Added to watchlist",
      description: "This product has been added to your watchlist",
    })
  }

  // Function to calculate time remaining
  const getTimeRemaining = (endTime: string) => {
    const total = new Date(endTime).getTime() - Date.now()

    if (total <= 0) {
      return "Auction ended"
    }

    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))

    return `${days}d ${hours}h ${minutes}m remaining`
  }

  // Check if auction is live
  const isAuctionLive = (endTime: string) => {
    return new Date(endTime).getTime() > Date.now()
  }

  // Format price with commas
  const formatPrice = (price: number) => {
    return "$" + price.toLocaleString("en-US")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col space-y-8">
      <div className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <div key={product._id} className="transition-transform hover:scale-[1.02]">
              <div className="bg-white rounded-xl border border-gray-200 hover:border-emerald-600 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                <NavLink to={`/details/${product._id}`}>
                  <div className="p-0">
                    <div className="relative">
                      <Image
                        src={product.images[0]?.filePath || "/placeholder.svg"}
                        alt={product.title}
                        width={400}
                        height={300}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute right-2 top-2" onClick={(e) => e.preventDefault()}>
                        <button
                          className="rounded-full bg-white/90 backdrop-blur-sm p-2 hover:bg-white transition-colors shadow-md"
                          onClick={() => handleWatchlist(product._id)}
                        >
                          <Heart className="h-5 w-5 text-gray-700 hover:text-emerald-600" />
                        </button>
                      </div>
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        {product.isFeatured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-600 text-white">
                            <Award className="mr-1 h-3 w-3" /> Featured
                          </span>
                        )}
                        {product.isSoldout && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-500 text-white">
                            <AlertCircle className="mr-1 h-3 w-3" /> Sold Out
                          </span>
                        )}
                        {product.verifyRequest && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white/90 backdrop-blur-sm border border-emerald-600 text-emerald-700">
                            <CheckCircle className="mr-1 h-3 w-3" /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="inline-block px-2 py-1 rounded-md text-xs font-medium border border-gray-300 text-gray-700">{product.categoryName}</span>
                      <span className="text-sm text-gray-600">{product.totalBids} Bids</span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold text-gray-900">{product.title}</h3>
                    <p className="mb-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{formatPrice(product.basePrice)}</span>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="mr-1 h-3 w-3 text-emerald-600" />
                        <span className={cn(isAuctionLive(product.bidEndDate) ? "text-emerald-600" : "text-red-500")}>
                          {getTimeRemaining(product.bidEndDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-emerald-600 mr-2">
                        <Image
                          src={product.user?.photo || "/placeholder.svg"}
                          alt={product.user?.name}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-600">{product.user?.name}</span>
                    </div>
                  </div>
                </NavLink>
                <div className="p-4 pt-0">
                  <NavLink
                    to={`/details/${product._id}`}
                    className={cn(
                      "block",
                      (product.isSoldout || !isAuctionLive(product.bidEndDate)) && "pointer-events-none"
                    )}
                  >
                    <button
                      className={cn(
                        "w-full px-4 py-2 rounded-lg font-medium transition-colors",
                        product.isSoldout || !isAuctionLive(product.bidEndDate)
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      )}
                      disabled={product.isSoldout || !isAuctionLive(product.bidEndDate)}
                    >
                      {product.isSoldout ? "Sold Out" : !isAuctionLive(product.bidEndDate) ? "Auction Ended" : "Place Bid"}
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <AlertCircle className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900">No products found</h3>
            <p className="text-center text-gray-600">
              No products match your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <button
            className={cn(
              "px-4 py-2 rounded-lg border font-medium transition-colors",
              page === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:border-emerald-600 hover:text-emerald-600"
            )}
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {page > 2 && (
              <>
                <button
                  className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setPage(1)}
                >
                  1
                </button>
                {page > 3 && <span className="text-gray-400">...</span>}
              </>
            )}

            {page > 1 && (
              <button
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setPage(page - 1)}
              >
                {page - 1}
              </button>
            )}

            <button className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-medium">
              {page}
            </button>

            {page < totalPages && (
              <button
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setPage(page + 1)}
              >
                {page + 1}
              </button>
            )}

            {page < totalPages - 1 && (
              <>
                {page < totalPages - 2 && <span className="text-gray-400">...</span>}
                <button
                  className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            className={cn(
              "px-4 py-2 rounded-lg border font-medium transition-colors",
              page === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:border-emerald-600 hover:text-emerald-600"
            )}
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
