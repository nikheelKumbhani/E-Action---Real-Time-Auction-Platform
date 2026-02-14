import { CheckCircle, XCircle } from "lucide-react"

interface ProductStatusProps {
  product: {
    _id?: string
    verifyRequest?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    isSoldout?: boolean
    createdAt?: string
    updatedAt?: string
    slug?: string
  }
}

const ProductStatus = ({ product }: ProductStatusProps) => {
  const StatusIndicator = ({ value }: { value: boolean }) => {
    if (value) {
      return (
        <div className="flex items-center gap-2 text-emerald-600">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Yes</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-2 text-red-500">
        <XCircle className="h-5 w-5" />
        <span className="font-medium">No</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Status</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Verification Status</h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${product.isPublished ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-700"}`}>
              {product.isPublished ? "Verified" : "Not Verified"}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Published</h3>
            <StatusIndicator value={product.isPublished || false} />
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-600">Featured</h3>
            <StatusIndicator value={product.isFeatured || false} />
          </div>

          <div className="flex justify-between items-center py-3">
            <h3 className="text-sm font-medium text-gray-600">Sold Out</h3>
            <StatusIndicator value={product.isSoldout || false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductStatus
