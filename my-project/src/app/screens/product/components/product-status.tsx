import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
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
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Yes</span>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-2 text-red-500">
        <XCircle className="h-5 w-5" />
        <span>No</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="text-sm font-medium text-gray-600">Verification Status</h3>
            <Badge variant={product.isPublished ? "default" : "secondary"} className={product.isPublished ? "bg-green-500" : ""}>
              {product.isPublished ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="text-sm font-medium text-gray-600">Published</h3>
            <StatusIndicator value={product.isPublished || false} />
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="text-sm font-medium text-gray-600">Featured</h3>
            <StatusIndicator value={product.isFeatured || false} />
          </div>

          <div className="flex justify-between items-center py-2 border-b">
            <h3 className="text-sm font-medium text-gray-600">Sold Out</h3>
            <StatusIndicator value={product.isSoldout || false} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductStatus
