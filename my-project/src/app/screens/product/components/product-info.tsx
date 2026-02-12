import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

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
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Sold Out
        </Badge>
      )
    }
    if (product.isPublished) {
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <CheckCircle className="h-4 w-4" />
          Verified & Published
        </Badge>
      )
    }
    if (product.verifyRequest) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-500">
          <Clock className="h-4 w-4" />
          Pending Verification
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        Draft
      </Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          {getStatusBadge()}
          {product.isFeatured && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Category</p>
          <p className="font-medium">{product.categoryDetails?.title || product.categoryName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Product Type</p>
          <p className="font-medium">{product.isPhysical ? "Physical" : "Digital"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Quantity Available</p>
          <p className="font-medium">{product.quantity}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Stock Status</p>
          <Badge variant="outline" className="mt-1">
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
