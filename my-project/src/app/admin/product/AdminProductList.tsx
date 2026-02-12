"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Check,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  Clock,
  Upload,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Checkbox } from "@/app/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Badge } from "@/app/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { DatePickerWithRange } from "./date-range-picker"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, Product } from "@/app/redux/store"
import { getAllProducts, deleteProduct } from "@/app/redux/features/productSlice"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/app/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog"
import { getAllCategories } from "@/app/redux/features/categorySlice"

// Add type for Category
interface Category {
  _id: string;
  title: string;
  name: string;
}

const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function ProductsPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { products, isLoading } = useSelector((state: RootState) => state.product)
  const { categorys } = useSelector((state: RootState) => state.category)
  const [searchQuery, setSearchQuery] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  // Fix the type of filteredProducts
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllProducts())
    // @ts-ignore
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    const filtered = [...products] as Product[]
    // ... existing filtering logic ...
    setFilteredProducts(filtered)
    setTotalPages(Math.ceil(filtered.length / parseInt(itemsPerPage)))
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchQuery, selectedCategory, selectedStatus])

  const filterProducts = () => {
    let filtered = [...products] as Product[]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Status filter
    if (selectedStatus !== "all") {
      switch (selectedStatus) {
        case "verified":
          filtered = filtered.filter(product => product.isPublished)
          break
        case "soldout":
          filtered = filtered.filter(product => product.isSoldout)
          break
        case "pending":
          filtered = filtered.filter(product => !product.isPublished && !product.isSoldout)
          break
      }
    }

    setFilteredProducts(filtered)
  }

  const paginateProducts = (products: Product[]) => {
    const startIndex = (currentPage - 1) * parseInt(itemsPerPage)
    const endIndex = startIndex + parseInt(itemsPerPage)
    return products.slice(startIndex, endIndex)
  }

  const handleReset = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedStatus("all")
  }

  const handleDelete = async (id: string) => {
    try {
      // @ts-ignore
      await dispatch(deleteProduct(id))
      // Refresh products list after successful deletion
      // @ts-ignore
      dispatch(getAllProducts())
    } catch (error) {
      console.error('Failed to delete product:', error)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value)
    setCurrentPage(1) // Reset to first page when items per page changes
    setTotalPages(Math.ceil(filteredProducts.length / parseInt(value)))
  }

  // Get status badge for product status
  const getStatusBadge = (product: Product) => {
    if (product.isPublished) {
      return <Badge className="bg-lime-500 hover:bg-green-600">Verified</Badge>
    }
    if (product.isSoldout) {
      return <Badge className="bg-red-500 hover:bg-red-600">Sold Out</Badge>
    }
    if (product.verifyRequest) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending Verification</Badge>
    }
    return (
      <Badge variant="outline" className="text-yellow-600 border-yellow-400">
        Pending
      </Badge>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Auction Products</h1>
        </div>
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, user email, slug..."
              className="pl-8 w-full md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categorys.map((category: Category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="soldout">Sold Out</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleReset}>Reset</Button>
              <Button onClick={filterProducts}>Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product List Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bids</TableHead>
              <TableHead>Auction End</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginateProducts(filteredProducts).map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="h-10 w-10 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <Image
                          src={product.images[0]?.filePath || "/placeholder.svg"}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogTitle className="sr-only">
                        {product.title} - Full Image View
                      </DialogTitle>
                      <div className="relative h-[400px] w-full">
                        <Image
                          src={product.images[0]?.filePath || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-xs text-muted-foreground">{product.slug}</div>
                </TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>${product.basePrice}</TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="cursor-pointer hover:underline">{product.user?.name}</div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">{product.user?.name}</h4>
                        <p className="text-sm text-muted-foreground">{product.user?.email}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>
                  {getStatusBadge(product)}
                </TableCell>
                <TableCell>{product.totalBids || 0}</TableCell>
                <TableCell>{formatDate(new Date(product.bidEndDate))}</TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <NavLink to={`/details/${product._id}`} className="flex items-center">
                            <Eye className="mr-2 h-4 w-4" /> View
                          </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <NavLink to={`/product/admin/update/${product._id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </NavLink>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the product
                                and remove all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(product._id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * parseInt(itemsPerPage)) + 1}-
          {Math.min(currentPage * parseInt(itemsPerPage), filteredProducts.length)} of {filteredProducts.length} products
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Show:</span>
          <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">per page</span>
        </div>

        <div className="flex items-center gap-1">
          <Button 
            variant="outline" 
            size="icon" 
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "outline" : "ghost"}
                size="sm"
                className={currentPage === pageNumber ? "font-medium" : ""}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            )
          })}

          {totalPages > 3 && currentPage < totalPages && (
            <>
              {currentPage < totalPages - 1 && <span>...</span>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}

          <Button 
            variant="outline" 
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
