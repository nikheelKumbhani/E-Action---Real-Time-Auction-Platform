import { AlertCircle, CheckCircle, Clock, Award } from "lucide-react"

interface ProductInfoProps {
  product: {
    title: string
    description: string
    category: string
    categoryName: string
    categoryDetails?: {
      title: string
      _id: string
    }
    isPhysical: boolean
    quantity: number
    verifyRequest: boolean
    isPublished: boolean
    isFeatured: boolean
    isSoldout: boolean
  }
}

export function ProductInfo({ product }: ProductInfoProps) {
  const getStatusBadge = () => {
    if (product.isSoldout) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-red-500 text-white">
          <AlertCircle className="mr-1 h-4 w-4" />
          Sold Out
        </span>
      )
    }
    if (product.isPublished) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-600 text-white">
          <CheckCircle className="mr-1 h-4 w-4" />
          Verified & Published
        </span>
      )
    }
    if (product.verifyRequest) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-100 text-emerald-700">
          <Clock className="mr-1 h-4 w-4" />
          Pending Verification
        </span>
      )
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700">
        <Clock className="mr-1 h-4 w-4" />
        Draft
      </span>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          {getStatusBadge()}
          {product.isFeatured && (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium border-2 border-emerald-600 text-emerald-700 bg-white">
              <Award className="mr-1 h-4 w-4" />
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="font-medium text-gray-900">{product.categoryDetails?.title || product.categoryName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Product Type</p>
          <p className="font-medium text-gray-900">{product.isPhysical ? "Physical" : "Digital"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Quantity Available</p>
          <p className="font-medium text-gray-900">{product.quantity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Stock Status</p>
          <span className={`inline-block px-2 py-1 rounded-md text-sm font-medium mt-1 ${product.quantity > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  )
}
