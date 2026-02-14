import Image from "next/image"
import { Calendar, Mail } from "lucide-react"

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
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Seller Information</h2>
        <p className="text-gray-500">Seller information not available</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Seller Information</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="h-24 w-24 rounded-full overflow-hidden ring-4 ring-emerald-600">
          <Image
            src={seller.photo || "/placeholder.svg"}
            alt={seller.name || "Seller"}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{seller.name || "Unknown Seller"}</h3>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <Mail className="h-5 w-5 text-emerald-600" />
              <span>{seller.email || "No email provided"}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="text-gray-500">Member Since</p>
              <p className="font-medium text-gray-900">
                {seller.createdAt ? new Date(seller.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) : "Not available"}
              </p>
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-emerald-100 text-emerald-700">
              {seller.role || "User"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
