"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  X,
  AlertTriangle,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/app/redux/store"
import type { Product } from "@/types/product"
import { getAllProducts, deleteProduct } from "@/app/redux/features/productSlice"
import { getAllCategories } from "@/app/redux/features/categorySlice"
import { toast } from "react-toastify"

// Add type for Category
interface Category {
  _id: string
  title: string
  name: string
}

const formatDate = (date: Date) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = date.getDate().toString().padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading, productTitle }: any) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Delete Product</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-semibold">"{productTitle}"</span>? This will permanently remove it and all associated data.
          </p>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Product
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Image Preview Modal
const ImagePreviewModal = ({ isOpen, onClose, imageUrl, productTitle }: any) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">{productTitle}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative h-[500px] w-full bg-gray-100">
          <Image
            src={imageUrl}
            alt={productTitle}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>
    </div>
  )
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" })
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 })

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllProducts())
    // @ts-ignore
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    filterProducts()
  }, [products, searchQuery, selectedCategory, selectedStatus, itemsPerPage])

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
    setTotalPages(Math.ceil(filtered.length / parseInt(itemsPerPage)))
    setCurrentPage(1)
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

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product)
    setDeleteModalOpen(true)
    setOpenDropdownId(null)
  }

  const confirmDelete = async () => {
    if (!selectedProduct) return

    setIsDeleting(true)
    try {
      // @ts-ignore
      await dispatch(deleteProduct(selectedProduct._id))
      toast.success("Product deleted successfully")
      // @ts-ignore
      dispatch(getAllProducts())
      setDeleteModalOpen(false)
    } catch (error) {
      toast.error("Failed to delete product")
      console.error('Failed to delete product:', error)
    } finally {
      setIsDeleting(false)
      setSelectedProduct(null)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleImageClick = (imageUrl: string, productTitle: string) => {
    setSelectedImage({ url: imageUrl, title: productTitle })
    setImageModalOpen(true)
  }

  const getStatusBadge = (product: Product) => {
    if (product.isPublished) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
          Verified
        </span>
      )
    }
    if (product.isSoldout) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
          Sold Out
        </span>
      )
    }
    if (product.verifyRequest) {
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
          Pending
        </span>
      )
    }
    return (
      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
        Draft
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[80vh]">
      {/* Modals */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
        productTitle={selectedProduct?.title}
      />

      <ImagePreviewModal
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={selectedImage.url}
        productTitle={selectedImage.title}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Auction Products</h1>
          <p className="text-gray-600">Manage all products in the auction system</p>
        </div>
        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by title, user email, slug..."
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 w-full md:w-[350px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
            >
              <option value="all">All Categories</option>
              {categorys.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
            >
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="soldout">Sold Out</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Reset
          </button>
          <button
            onClick={filterProducts}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Image</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Bids</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">End Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginateProducts(filteredProducts).map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div
                      className="h-12 w-12 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-200 flex-shrink-0"
                      onClick={() => handleImageClick(product.images[0]?.filePath || "/placeholder.svg", product.title)}
                    >
                      <Image
                        src={product.images[0]?.filePath || "/placeholder.svg"}
                        alt={product.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 max-w-xs">
                    <div className="font-medium text-gray-900 truncate">{product.title}</div>
                    <div className="text-xs text-gray-500 truncate">{product.slug}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{product.categoryName}</td>
                  <td className="px-4 py-4 text-sm font-medium text-emerald-600 whitespace-nowrap">${product.basePrice}</td>
                  <td className="px-4 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate">{product.user?.name}</div>
                    <div className="text-xs text-gray-500 truncate">{product.user?.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(product)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap text-center">{product.totalBids || 0}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">{formatDate(new Date(product.bidEndDate))}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setDropdownPosition({
                            top: rect.bottom + window.scrollY,
                            right: window.innerWidth - rect.right
                          })
                          setOpenDropdownId(openDropdownId === product._id ? null : product._id)
                        }}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>

                      {openDropdownId === product._id && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div
                            className="fixed z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                            style={{
                              top: `${dropdownPosition.top}px`,
                              right: `${dropdownPosition.right}px`
                            }}
                          >
                            <NavLink
                              to={`/details/${product._id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setOpenDropdownId(null)}
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </NavLink>
                            <NavLink
                              to={`/product/admin/update/${product._id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={() => setOpenDropdownId(null)}
                            >
                              <Edit2 className="h-4 w-4" />
                              Edit
                            </NavLink>
                            <div className="border-t border-gray-200" />
                            <button
                              onClick={() => handleDeleteClick(product)}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * parseInt(itemsPerPage)) + 1}-
          {Math.min(currentPage * parseInt(itemsPerPage), filteredProducts.length)} of {filteredProducts.length} products
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value)
              setCurrentPage(1)
              setTotalPages(Math.ceil(filteredProducts.length / parseInt(e.target.value)))
            }}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white text-gray-900"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-700">per page</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = i + 1
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${currentPage === pageNumber
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {pageNumber}
              </button>
            )
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
