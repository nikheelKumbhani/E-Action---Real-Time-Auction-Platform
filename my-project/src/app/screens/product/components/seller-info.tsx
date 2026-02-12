import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"
import { Calendar } from "lucide-react"

interface SellerInfoProps {
  seller?: {
    _id?: string
    name?: string
    email?: string
    photo?: string
    role?: string
    createdAt?: string
  }
}

export function SellerInfo({ seller }: SellerInfoProps) {
  if (!seller) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Seller Information</h2>
        <p className="text-gray-500">Seller information not available</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Information</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={seller.photo || "/placeholder.svg"} alt={seller.name || "Seller"} />
          <AvatarFallback>{(seller.name || "?").charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{seller.name || "Unknown Seller"}</h3>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <span className="inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span>{seller.email || "No email provided"}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-gray-500">Member Since</p>
              <p className="font-medium">
                {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) : "Not available"}
              </p>
            </div>
          </div>

          <div>
            <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              {seller.role || "User"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
