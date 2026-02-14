"use client"

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, Trash2, AlertCircle, Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import { getAllCategories } from "@/app/redux/features/categorySlice"
import { createProduct } from "@/app/redux/features/productSlice"
import { toast } from "react-toastify"

// Update Category interface
interface Category {
  _id: string;
  title: string;
  user: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define RootState interface
interface RootState {
  category: {
    categorys: Category[];
    isLoading: boolean;
  }
}

type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default function AddProductForm() {
  const router = useRouter()
  const dispatch = useDispatch<AppThunkDispatch>()
  const { categorys, isLoading } = useSelector((state: RootState) => state.category)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    categoryName: "",
    description: "",
    basePrice: "",
    bidEndDate: "",
  })

  // Form errors
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    description: "",
    basePrice: "",
    bidEndDate: "",
  })

  // Image handling
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Handle select changes
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const selectedCategory = categorys.find(cat => cat._id === value);
    setFormData({
      ...formData,
      category: value,
      categoryName: selectedCategory?.title || "",
    });

    // Clear error
    if (errors.category) {
      setErrors({
        ...errors,
        category: "",
      })
    }
  }

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)

      // Check total images limit (existing + new)
      if (images.length + newFiles.length > 5) {
        toast.error("Maximum 5 images allowed")
        return
      }

      setImages((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newUrls])
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setImages((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {
      title: "",
      category: "",
      description: "",
      basePrice: "",
      bidEndDate: "",
    }

    let isValid = true

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
      isValid = false
    }

    if (!formData.category) {
      newErrors.category = "Please select a category"
      isValid = false
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
      isValid = false
    }

    if (!formData.basePrice || Number.parseFloat(formData.basePrice) <= 0) {
      newErrors.basePrice = "Price must be greater than 0"
      isValid = false
    }

    if (!formData.bidEndDate) {
      newErrors.bidEndDate = "Please select an end date"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (images.length === 0) {
      toast.error("Please add at least one image")
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("basePrice", formData.basePrice)
      formDataToSend.append("bidEndDate", formData.bidEndDate)

      images.forEach((image) => {
        formDataToSend.append("images", image)
      })

      // Use .unwrap() to convert rejected actions into thrown errors
      // @ts-ignore - unwrap() is available on the promise returned by createAsyncThunk
      await dispatch(createProduct(formDataToSend)).unwrap()

      // If we reach here, creation succeeded
      toast.success("Product created successfully")
      // Redirect to my products page
      setTimeout(() => {
        router.push('/dashboard/my-products')
      }, 1500)
    } catch (error: any) {
      // This properly catches rejected promises
      console.error("Error creating product:", error)
      toast.error(error?.message || "Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Product</h1>
        <p className="text-gray-600">Add your product details to start the auction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Details Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Product Details</h2>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Product Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., Vintage Leather Jacket"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-gray-900 placeholder-gray-500 ${errors.title
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-emerald-600 focus:border-transparent'
                }`}
            />
            {errors.title && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{errors.title}</p>
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleSelectChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-gray-900 ${errors.category
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-emerald-600 focus:border-transparent'
                }`}
            >
              <option value="">{isLoading ? "Loading categories..." : "Select a category"}</option>
              {categorys.map((category: Category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{errors.category}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your product in detail..."
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-gray-900 placeholder-gray-500 resize-none ${errors.description
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-emerald-600 focus:border-transparent'
                }`}
            />
            {errors.description && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{errors.description}</p>
              </div>
            )}
          </div>

          {/* Price and End Date */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Base Price */}
            <div>
              <label htmlFor="basePrice" className="block text-sm font-semibold text-gray-900 mb-2">
                Base Price (USD) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 font-medium">
                  $
                </span>
                <input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  step="0.01"
                  placeholder="100.00"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-gray-900 placeholder-gray-500 ${errors.basePrice
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-emerald-600 focus:border-transparent'
                    }`}
                />
              </div>
              {errors.basePrice && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{errors.basePrice}</p>
                </div>
              )}
            </div>

            {/* Bid End Date */}
            <div>
              <label htmlFor="bidEndDate" className="block text-sm font-semibold text-gray-900 mb-2">
                Bid End Date <span className="text-red-500">*</span>
              </label>
              <input
                id="bidEndDate"
                name="bidEndDate"
                type="date"
                value={formData.bidEndDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-white text-gray-900 ${errors.bidEndDate
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-emerald-600 focus:border-transparent'
                  }`}
              />
              {errors.bidEndDate && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p className="text-sm">{errors.bidEndDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Product Images</h2>
            <p className="text-sm text-gray-500">Upload up to 5 images (PNG, JPG - max 5MB each)</p>
          </div>

          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-600 hover:bg-emerald-50/50 transition-all cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <ImagePlus className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 5 images</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Image Previews */}
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-28 w-full object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Remove image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded">
                      Primary
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Preview */}
        {(formData.title || previewUrls.length > 0) && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              {previewUrls.length > 0 ? (
                <img
                  src={previewUrls[0]}
                  alt="Product preview"
                  className="h-24 w-24 object-cover rounded-lg border-2 border-gray-200 flex-shrink-0"
                />
              ) : (
                <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImagePlus className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-lg mb-1">
                  {formData.title || "Product Title"}
                </p>
                <p className="text-2xl font-bold text-emerald-600 mb-2">
                  ${Number.parseFloat(formData.basePrice || "0").toFixed(2)}
                </p>
                {formData.bidEndDate && (
                  <p className="text-sm text-gray-600">
                    Auction ends: {formatDate(formData.bidEndDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/my-products')}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
