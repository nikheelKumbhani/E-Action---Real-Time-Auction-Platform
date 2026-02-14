"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format, isValid } from "date-fns"
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/app/redux/store"
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Star,
  AlertTriangle,
  Loader2,
  User,
  Package,
  DollarSign,
  Calendar,
} from "lucide-react"

import { getProduct, updateProductByAdmin } from "@/app/redux/features/productSlice"
import { getUserById } from "@/app/redux/features/authSlice"
import { toast } from "react-toastify"

// Helper function to safely format dates
const safeFormatDate = (dateString: string, formatString: string = "MMMM d, yyyy") => {
  const date = new Date(dateString)
  return isValid(date) ? format(date, formatString) : 'Invalid Date'
}

// Approve Confirmation Modal
const ApproveModal = ({ isOpen, onClose, onConfirm, isSubmitting }: any) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Confirm Approval</h3>
                <p className="text-sm text-gray-600">Publish this product</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to approve and publish this product? It will be visible to all users and available for bidding.
          </p>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Confirm Approval
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Reject Confirmation Modal
const RejectModal = ({ isOpen, onClose, onConfirm, isSubmitting }: any) => {
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
                <h3 className="text-xl font-bold text-gray-900">Confirm Rejection</h3>
                <p className="text-sm text-gray-600">Reject this product</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to reject this product? The seller will be notified of the rejection.
          </p>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <X className="h-4 w-4" />
                Confirm Rejection
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProductVerificationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>()
  const { id } = useParams<{ id: string }>()
  const { product, isLoading } = useSelector((state: RootState) => state.product)
  const { selectedUser } = useSelector((state: RootState) => state.auth)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPublished, setIsPublished] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [verifyRequest, setVerifyRequest] = useState(false)
  const [commissionRate, setCommissionRate] = useState(10)
  const [adminNotes, setAdminNotes] = useState("")
  const [bidEndDate, setBidEndDate] = useState("")
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'product' | 'actions'>('product')

  useEffect(() => {
    if (id) {
      // @ts-ignore
      dispatch(getProduct(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (product?.user) {
      if (typeof product.user === 'string') {
        // @ts-ignore
        dispatch(getUserById(product.user))
      }
      setIsPublished(product.isPublished || false)
      setIsFeatured(product.isFeatured || false)
      setVerifyRequest(product.verifyRequest || false)
      setCommissionRate(product.commission || 10)
      setBidEndDate(product.bidEndDate ? format(new Date(product.bidEndDate), "yyyy-MM-dd") : "")
    }
  }, [product, dispatch])

  useEffect(() => {
    if (isPublished) {
      setVerifyRequest(true)
    }
  }, [isPublished])

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
    }
  }

  const handleApprove = async () => {
    const formData = {
      isPublished: true,
      isFeatured,
      commission: commissionRate,
      bidEndDate: new Date(bidEndDate),
      adminNotes,
      verifyRequest: true
    }

    try {
      setIsSubmitting(true)
      // @ts-ignore
      await dispatch(updateProductByAdmin({ id, formData })).unwrap()
      toast.success("Product approved and published successfully!")
      setShowApproveDialog(false)
      navigate('/admin/dashboard/products')
    } catch (error) {
      toast.error("Failed to approve product. Please try again.")
      console.error("Error updating product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    try {
      setIsSubmitting(true)
      // Add rejection logic here
      toast.success("Product rejected")
      setShowRejectDialog(false)
    } catch (error) {
      toast.error("Failed to reject product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleFeatured = async () => {
    const newFeaturedState = !isFeatured
    setIsFeatured(newFeaturedState)

    const formData = {
      isFeatured: newFeaturedState
    }

    try {
      // @ts-ignore
      await dispatch(updateProductByAdmin({ id, formData }))
      toast.success(newFeaturedState ? "Product marked as featured" : "Product removed from featured")
    } catch (error) {
      toast.error("Failed to update product")
      setIsFeatured(!newFeaturedState) // Revert on error
    }
  }

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Modals */}
      <ApproveModal
        isOpen={showApproveDialog}
        onClose={() => setShowApproveDialog(false)}
        onConfirm={handleApprove}
        isSubmitting={isSubmitting}
      />

      <RejectModal
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={handleReject}
        isSubmitting={isSubmitting}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Product for Auction</h1>
          <p className="text-gray-600">Review and approve product submissions</p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="mt-4 md:mt-0 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to List
        </button>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium ${product.isPublished
          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
          : "bg-yellow-100 text-yellow-700 border border-yellow-200"
          }`}>
          {product.isPublished ? "✓ Published" : "⏳ Pending Approval"}
        </span>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('product')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'product'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${activeTab === 'actions'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              Admin Actions
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tab */}
      {activeTab === 'product' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Product Images</h3>
              <p className="text-sm text-gray-600 mt-1">Review product images for quality and appropriateness</p>
            </div>
            <div className="p-6">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[currentImageIndex].filePath}
                    alt={`Product image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-lg shadow-md transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images && product.images.map((image: any, index: number) => (
                  <div
                    key={index}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${index === currentImageIndex ? "border-emerald-600" : "border-gray-200 hover:border-gray-300"
                      }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.filePath}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Product Information</h3>
              <p className="text-sm text-gray-600 mt-1">Basic details about the product</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Seller Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Seller Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-medium text-gray-900">{selectedUser?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Role</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedUser?.role || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Joined</p>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedUser?.createdAt ? safeFormatDate(selectedUser.createdAt) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Product Title</p>
                  <p className="text-sm font-medium text-gray-900">{product.title}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Category</p>
                  <p className="text-sm font-medium text-gray-900">{product.categoryName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Base Price</p>
                  <p className="text-sm font-medium text-emerald-600">${product.basePrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Starting Bid</p>
                  <p className="text-sm font-medium text-emerald-600">${product.bidStartPrice}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Quantity</p>
                  <p className="text-sm font-medium text-gray-900">{product.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Physical Product</p>
                  <p className="text-sm font-medium text-gray-900">{product.isPhysical ? "Yes" : "No"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Total Bids</p>
                  <p className="text-sm font-medium text-gray-900">
                    {!product.isPublished
                      ? "Pending Verification"
                      : product.totalBids === 0
                        ? "No bids yet"
                        : product.totalBids}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Auction End</p>
                  <p className="text-sm font-medium text-gray-900">
                    {product.bidEndDate ? safeFormatDate(product.bidEndDate) : 'Not set'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-600 mb-1">Created On</p>
                  <p className="text-sm font-medium text-gray-900">
                    {product.createdAt ? safeFormatDate(product.createdAt) : 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-600 mb-2">Description</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Actions Tab */}
      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Status Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Product Status</h3>
              <p className="text-sm text-gray-600 mt-1">Current status of the product</p>
            </div>
            <div className="p-6 space-y-4">
              {/* Verify Request */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${verifyRequest ? "bg-emerald-100" : "bg-red-100"
                    }`}>
                    {verifyRequest ? (
                      <Check className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Verify Request</p>
                    <p className="text-sm text-gray-600">Verification status</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${verifyRequest
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
                  }`}>
                  {verifyRequest ? "Yes" : "No"}
                </span>
              </div>

              {/* Is Published */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPublished ? "bg-emerald-100" : "bg-red-100"
                    }`}>
                    {isPublished ? (
                      <Check className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Published</p>
                    <p className="text-sm text-gray-600">Visible to users</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublished ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {/* Is Featured */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isFeatured ? "bg-emerald-100" : "bg-red-100"
                    }`}>
                    {isFeatured ? (
                      <Star className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Featured</p>
                    <p className="text-sm text-gray-600">Highlighted product</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isFeatured ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? "translate-x-6" : "translate-x-1"
                      }`}
                  />
                </button>
              </div>

              {/* Is Sold Out */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${product.isSoldout ? "bg-emerald-100" : "bg-red-100"
                    }`}>
                    {product.isSoldout ? (
                      <Check className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Sold Out</p>
                    <p className="text-sm text-gray-600">Inventory status</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.isSoldout
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
                  }`}>
                  {product.isSoldout ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Admin Actions Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Admin Actions</h3>
              <p className="text-sm text-gray-600 mt-1">Take action on this product submission</p>
            </div>
            <div className="p-6 space-y-4">
              {/* Admin Notes */}
              <div>
                <label htmlFor="admin-notes" className="block text-sm font-medium text-gray-900 mb-2">
                  Admin Notes (Optional)
                </label>
                <textarea
                  id="admin-notes"
                  placeholder="Add any notes about this product..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 min-h-[100px]"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>

              {/* Commission Rate */}
              <div>
                <label htmlFor="commission-rate" className="block text-sm font-medium text-gray-900 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  id="commission-rate"
                  type="number"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  min={0}
                  max={100}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              {/* Bid End Date */}
              <div>
                <label htmlFor="bid-end-date" className="block text-sm font-medium text-gray-900 mb-2">
                  Change Bid End Date (Optional)
                </label>
                <input
                  id="bid-end-date"
                  type="date"
                  value={bidEndDate}
                  onChange={(e) => setBidEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={() => setShowApproveDialog(true)}
                  className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="h-5 w-5" />
                  Approve & Publish
                </button>

                <button
                  onClick={() => setShowRejectDialog(true)}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <X className="h-5 w-5" />
                  Reject Product
                </button>

                <button
                  onClick={handleToggleFeatured}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Star className="h-5 w-5" />
                  {isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
