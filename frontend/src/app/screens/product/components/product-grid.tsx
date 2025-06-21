"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { NavLink } from "react-router-dom"
import { Heart, Clock, Award, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product: Product) => (
            <div key={product._id} className="transition-transform hover:scale-[1.02]">
              <Card className="overflow-hidden h-full">
                <NavLink to={`/details/${product._id}`}>
                  <CardHeader className="p-0">
                    <div className="relative">
                      <Image
                        src={product.images[0]?.filePath || "/placeholder.svg"}
                        alt={product.title}
                        width={400}
                        height={300}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute right-2 top-2" onClick={(e) => e.preventDefault()}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-background/80 backdrop-blur-sm"
                                onClick={() => handleWatchlist(product._id)}
                              >
                                <Heart className="h-5 w-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to watchlist</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        {product.isFeatured && (
                          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                            <Award className="mr-1 h-3 w-3" /> Featured
                          </Badge>
                        )}
                        {product.isSoldout && (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" /> Sold Out
                          </Badge>
                        )}
                        {product.verifyRequest && (
                          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                            <CheckCircle className="mr-1 h-3 w-3 text-green-500" /> Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline">{product.categoryName}</Badge>
                      <span className="text-sm text-muted-foreground">{product.totalBids} Bids</span>
                    </div>
                    <h3 className="mb-1 text-lg font-semibold">{product.title}</h3>
                    <p className="mb-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-lg font-bold">{formatPrice(product.basePrice)}</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span className={cn(isAuctionLive(product.bidEndDate) ? "" : "text-destructive")}>
                          {getTimeRemaining(product.bidEndDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={product.user?.photo || "/placeholder.svg"} alt={product.user?.name} />
                        <AvatarFallback>{product.user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{product.user?.name}</span>
                    </div>
                  </CardContent>
                </NavLink>
                <CardFooter className="p-4 pt-0">
                  <NavLink 
                    to={`/details/${product._id}`}
                    className={cn(
                      "w-full",
                      (product.isSoldout || !isAuctionLive(product.bidEndDate)) && "pointer-events-none"
                    )}
                  >
                    <Button
                      className="w-full"
                      disabled={product.isSoldout || !isAuctionLive(product.bidEndDate)}
                    >
                      {product.isSoldout ? "Sold Out" : !isAuctionLive(product.bidEndDate) ? "Auction Ended" : "Place Bid"}
                    </Button>
                  </NavLink>
                </CardFooter>
              </Card>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <AlertCircle className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No products found</h3>
            <p className="text-center text-muted-foreground">
              No products match your filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {page > 2 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage(1)}
                >
                  1
                </Button>
                {page > 3 && <span className="text-muted-foreground">...</span>}
              </>
            )}

            {page > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(page - 1)}
              >
                {page - 1}
              </Button>
            )}

            <Button
              variant="default"
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              {page}
            </Button>

            {page < totalPages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage(page + 1)}
              >
                {page + 1}
              </Button>
            )}

            {page < totalPages - 1 && (
              <>
                {page < totalPages - 2 && <span className="text-muted-foreground">...</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
