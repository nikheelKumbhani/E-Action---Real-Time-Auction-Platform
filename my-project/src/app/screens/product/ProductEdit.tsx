"use client"

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { ImagePlus, Trash2, Loader2, ChevronDown } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import { getAllCategories } from "@/app/redux/features/categorySlice"
import { getProduct, updateProduct } from "@/app/redux/features/productSlice"
import { toast } from "react-toastify"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

interface Category {
    _id: string
    title: string
    user: string | null
    createdAt: string
    updatedAt: string
    __v: number
}

interface RootState {
    category: {
        categorys: Category[]
        isLoading: boolean
    }
    product: {
        product: any
        isLoading: boolean
    }
}

type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export default function EditProductForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch<AppThunkDispatch>()
    const { categorys } = useSelector((state: RootState) => state.category)
    const { product: existingProduct, isLoading } = useSelector((state: RootState) => state.product)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        categoryName: "",
        description: "",
        basePrice: "",
        bidEndDate: "",
    })

    const [errors, setErrors] = useState({
        title: "",
        category: "",
        description: "",
        basePrice: "",
        bidEndDate: "",
    })

    const [images, setImages] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [existingImages, setExistingImages] = useState<any[]>([])
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await dispatch(getProduct(id))
                dispatch(getAllCategories())
            } else {
                toast.error("Product ID not found")
            }
        }

        fetchData()
    }, [dispatch, id, navigate])

    useEffect(() => {
        if (existingProduct && Object.keys(existingProduct).length > 0) {
            setFormData({
                title: existingProduct.title || "",
                category: existingProduct.category || "",
                categoryName: existingProduct.categoryName || "",
                description: existingProduct.description || "",
                basePrice: existingProduct.basePrice?.toString() || "",
                bidEndDate: existingProduct.bidEndDate ? new Date(existingProduct.bidEndDate).toISOString().split('T')[0] : "",
            })
            if (existingProduct.images && existingProduct.images.length > 0) {
                setExistingImages(existingProduct.images)
                setPreviewUrls(existingProduct.images.map((img: any) => img.filePath))
            }
        }
    }, [existingProduct])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const handleSelectChange = (categoryId: string) => {
        const selectedCategory = categorys.find(cat => cat._id === categoryId)
        setFormData(prev => ({
            ...prev,
            category: categoryId,
            categoryName: selectedCategory?.title || "",
        }))
        setCategoryDropdownOpen(false)
        if (errors.category) {
            setErrors(prev => ({
                ...prev,
                category: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {
            title: !formData.title ? "Title is required" : "",
            category: !formData.category ? "Category is required" : "",
            description: !formData.description ? "Description is required" : "",
            basePrice: !formData.basePrice ? "Base price is required" : "",
            bidEndDate: !formData.bidEndDate ? "Bid end date is required" : "",
        }
        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error)
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)

            if (images.length + newFiles.length > 5) {
                toast.error("Maximum 5 images allowed")
                return
            }

            setImages(prev => [...prev, ...newFiles])
            const newUrls = newFiles.map(file => URL.createObjectURL(file))
            setPreviewUrls(prev => [...prev, ...newUrls])
        }
    }

    const removeImage = (index: number) => {
        if (existingImages[index]) {
            setExistingImages(prev => prev.filter((_, i) => i !== index))
        }
        if (images[index]) {
            URL.revokeObjectURL(previewUrls[index])
            setImages(prev => prev.filter((_, i) => i !== index))
        }
        setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        const formDataToSend = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            if (value) formDataToSend.append(key, value)
        })

        formDataToSend.append('existingImages', JSON.stringify(existingImages))

        images.forEach(image => {
            formDataToSend.append('images', image)
        })

        try {
            await dispatch(updateProduct({ id, formData: formDataToSend }))
            toast.success("Product updated successfully")
            navigate("/products")
        } catch (error: any) {
            toast.error(error.message || "Failed to update product")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isLoading || !existingProduct) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading product...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Product Details</h2>
                    <p className="text-gray-600">Update your product information</p>
                </div>

                {/* Product Details Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                    {/* Product Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                            Product Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            placeholder="e.g., Vintage Leather Jacket"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={classNames(
                                "w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500",
                                errors.title ? "border-red-500" : "border-gray-300"
                            )}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                            Category
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                                className={classNames(
                                    "w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 text-left flex items-center justify-between",
                                    errors.category ? "border-red-500" : "border-gray-300"
                                )}
                            >
                                <span className={formData.categoryName ? "text-gray-900" : "text-gray-500"}>
                                    {formData.categoryName || "Select a category"}
                                </span>
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                            </button>

                            {categoryDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    {categorys.map((category: Category) => (
                                        <button
                                            key={category._id}
                                            type="button"
                                            onClick={() => handleSelectChange(category._id)}
                                            className={classNames(
                                                "w-full px-4 py-2.5 text-left hover:bg-emerald-50 transition-colors",
                                                formData.category === category._id ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-900"
                                            )}
                                        >
                                            {category.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe your product..."
                            className={classNames(
                                "w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 min-h-[120px]",
                                errors.description ? "border-red-500" : "border-gray-300"
                            )}
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Base Price & Bid End Date */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Base Price */}
                        <div>
                            <label htmlFor="basePrice" className="block text-sm font-medium text-gray-900 mb-2">
                                Base Price (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                <input
                                    id="basePrice"
                                    name="basePrice"
                                    type="number"
                                    placeholder="100"
                                    className={classNames(
                                        "w-full pl-7 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500",
                                        errors.basePrice ? "border-red-500" : "border-gray-300"
                                    )}
                                    value={formData.basePrice}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
                        </div>

                        {/* Bid End Date */}
                        <div>
                            <label htmlFor="bidEndDate" className="block text-sm font-medium text-gray-900 mb-2">
                                Bid End Date
                            </label>
                            <input
                                id="bidEndDate"
                                name="bidEndDate"
                                type="date"
                                className={classNames(
                                    "w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900",
                                    errors.bidEndDate ? "border-red-500" : "border-gray-300"
                                )}
                                value={formData.bidEndDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split("T")[0]}
                            />
                            {errors.bidEndDate && <p className="text-red-500 text-sm mt-1">{errors.bidEndDate}</p>}
                        </div>
                    </div>
                </div>

                {/* Product Images Card */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
                    <h3 className="text-lg font-bold text-gray-900">Product Images</h3>

                    {/* Upload Area */}
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
                        onClick={() => document.getElementById("image-upload")?.click()}
                    >
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload new images</p>
                        <p className="text-xs text-gray-500 mt-1">Maximum 5 images</p>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {/* Preview Images */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={url}
                                        alt={`Preview ${index + 1}`}
                                        className="h-32 w-full object-cover rounded-lg border-2 border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
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
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Preview</h3>
                            <div className="flex items-start gap-4">
                                {previewUrls.length > 0 ? (
                                    <img
                                        src={previewUrls[0]}
                                        alt="Product preview"
                                        className="h-20 w-20 object-cover rounded-lg border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <ImagePlus className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-bold text-lg text-gray-900">{formData.title || "Product Title"}</p>
                                    <p className="text-emerald-600 font-medium text-lg">${formData.basePrice || 0}</p>
                                    {formData.bidEndDate && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Ends: {new Date(formData.bidEndDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Product"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
