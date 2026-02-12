"use client"

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ImagePlus, Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import { getAllCategories } from "@/app/redux/features/categorySlice"
import { createProduct } from "@/app/redux/features/productSlice"
import { toast } from "react-toastify"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"

// Simple utility function to replace cn
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Update Category interface
interface Category {
  _id: string;
  title: string;  // Changed from 'name' to 'title'
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

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
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
  const handleSelectChange = (name: string, value: string) => {
    const selectedCategory = categorys.find(cat => cat._id === value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      categoryName: selectedCategory?.title || "",
    }));
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

      const response = await dispatch(createProduct(formDataToSend))
      if ('error' in response) {
        // Handle error case
        toast.error(response.error?.message || "Failed to create product")
      } else {
        // Handle success case
        toast.success("Product created successfully")
        
      }
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast.error(error?.message || "Failed to create product")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date for display (simple version without date-fns)
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Product Details</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Product Title
            </label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Vintage Leather Jacket"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"} />
              </SelectTrigger>
              <SelectContent>
                {categorys.map((category: Category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title} {/* Changed from category.name to category.title */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your product..."
              className={classNames("min-h-24", errors.description ? "border-red-500" : "")}
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="basePrice" className="block text-sm font-medium mb-1">
                Base Price (USD)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                <Input
                  id="basePrice"
                  name="basePrice"
                  type="number"
                  placeholder="100"
                  className={classNames("pl-7", errors.basePrice ? "border-red-500" : "")}
                  value={formData.basePrice}
                  onChange={handleInputChange}
                />
              </div>
              {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
            </div>

            <div>
              <label htmlFor="bidEndDate" className="block text-sm font-medium mb-1">
                Bid End Date
              </label>
              <Input
                id="bidEndDate"
                name="bidEndDate"
                type="date"
                className={errors.bidEndDate ? "border-red-500" : ""}
                value={formData.bidEndDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]} // Today's date as minimum
              />
              {errors.bidEndDate && <p className="text-red-500 text-sm mt-1">{errors.bidEndDate}</p>}
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Product Images</h2>

          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm">Click to upload images</p>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preview Card */}
        {(formData.title || previewUrls.length > 0) && (
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Preview</h3>
              <div className="flex items-start gap-3">
                {previewUrls.length > 0 ? (
                  <img
                    src={previewUrls[0] || "/placeholder.svg"}
                    alt="Product preview"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{formData.title || "Product Title"}</p>
                  <p className="text-sm text-muted-foreground">${Number.parseFloat(formData.basePrice) || 0}</p>
                  {formData.bidEndDate && (
                    <p className="text-xs text-muted-foreground">Ends: {formatDate(formData.bidEndDate)}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Form Buttons */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
