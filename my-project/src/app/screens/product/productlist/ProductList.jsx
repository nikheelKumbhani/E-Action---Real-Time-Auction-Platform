import { React, useEffect, useState } from "react"
import { PrimaryButton, Title } from "../../../router"
import { NavLink } from "react-router-dom"
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai"
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, getAllProductsOfUser } from "@/app/redux/features/productSlice"
import { Table } from "@/app/components/Table"
import { sellProduct } from "@/app/redux/features/productSlice"
import { Trash2, DollarSign, X, Loader2 } from "lucide-react"

// Delete Confirmation Modal
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600" />
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
            Are you sure you want to delete this product? This will permanently remove it from your listings.
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

// Sell Confirmation Modal
const SellConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Sell Product</h3>
                <p className="text-sm text-gray-600">Confirm sale to highest bidder</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to sell this product to the highest bidder? This action will finalize the sale.
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
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4" />
                Confirm Sale
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export const ProductList = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const { userproducts } = useSelector((state) => state.product)

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState("all")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [sellModalOpen, setSellModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [isActionLoading, setIsActionLoading] = useState(false)
  const itemsPerPage = 5

  useEffect(() => {
    dispatch(getAllProductsOfUser()).then((action) => {
      if (action.payload) {
        console.log("Products with bid counts:", action.payload)
      }
    })
  }, [dispatch])

  const handleDeleteProduct = async (id) => {
    setSelectedProductId(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    setIsActionLoading(true)
    await dispatch(deleteProduct(selectedProductId))
    await dispatch(getAllProductsOfUser())
    setIsActionLoading(false)
    setDeleteModalOpen(false)
    setSelectedProductId(null)
  }

  const handleSellProduct = async (id) => {
    setSelectedProductId(id)
    setSellModalOpen(true)
  }

  const confirmSell = async () => {
    setIsActionLoading(true)
    await dispatch(sellProduct(selectedProductId))
    await dispatch(getAllProductsOfUser())
    setIsActionLoading(false)
    setSellModalOpen(false)
    setSelectedProductId(null)
  }

  const getProductStatus = (product) => {
    if (product.isSoldout) return "Sold"
    if (!product.verifyRequest) return "Pending Verification"
    if (!product.isPublished) return "Draft"
    return "Active"
  }

  // Filter products based on search and filter type
  const filteredProducts = userproducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterType === "all") return matchesSearch
    if (filterType === "verified") return matchesSearch && product.verifyRequest
    if (filterType === "unverified") return matchesSearch && !product.verifyRequest
    if (filterType === "sold") return matchesSearch && product.isSoldout
    if (filterType === "unsold") return matchesSearch && !product.isSoldout

    return matchesSearch
  })

  // Get formatted product data with all necessary details
  const getFormattedProducts = (products) => {
    return products.map(product => ({
      _id: product._id,
      title: product.title,
      description: product.description,
      basePrice: product.basePrice,
      bidStartPrice: product.bidStartPrice,
      bidEndDate: product.bidEndDate,
      verifyRequest: product.verifyRequest,
      isPublished: product.isPublished,
      isSoldout: product.isSoldout,
      totalBids: product.totalBids || 0,
      commission: product.commission,
      image: product.images && product.images.length > 0 ? product.images[0].filePath : '',
      category: product.category,
      createdAt: product.createdAt,
      status: getProductStatus(product)
    }))
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = getFormattedProducts(filteredProducts.slice(startIndex, startIndex + itemsPerPage))

  return (
    <>
      {/* Modals */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isActionLoading}
      />

      <SellConfirmModal
        isOpen={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onConfirm={confirmSell}
        isLoading={isActionLoading}
      />

      <section className="p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
          <NavLink to="/dashboard/create-product">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </button>
          </NavLink>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
          >
            <option value="all">All Products</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="sold">Sold</option>
            <option value="unsold">Unsold</option>
          </select>
        </div>

        <Table
          products={paginatedProducts}
          delProduct={handleDeleteProduct}
          handleSellProduct={handleSellProduct}
          startIndex={startIndex}
          getStatus={getProductStatus}
        />

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${currentPage === page
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
