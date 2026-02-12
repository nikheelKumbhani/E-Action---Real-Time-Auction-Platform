"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { SellerInfo } from "./seller-info"
import ProductStatus from "./product-status"

interface ProductTabsProps {
  seller?: {
    _id?: string
    name?: string
    email?: string
    photo?: string
    role?: string
    createdAt?: string
  }
  product?: {
    _id?: string
    verifyRequest?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    isSoldout?: boolean
    createdAt?: string
    updatedAt?: string
    slug?: string
    totalBids?: number
  }
  bids?: Array<{
    bidderName: string
    amount: number
    timestamp: string
  }>
}

export function ProductTabs({ seller = {}, product = {}, bids = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("seller")

  return (
    <Tabs defaultValue="seller" className="w-full mt-8" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-none p-0 h-auto">
        <TabsTrigger
          value="seller"
          className={`py-3 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none ${activeTab === "seller" ? "border border-b-0" : "border-b"}`}
        >
          Seller Information
        </TabsTrigger>
        <TabsTrigger
          value="bidding"
          className={`py-3 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none ${activeTab === "bidding" ? "border border-b-0" : "border-b"}`}
        >
          Bidding History ({product.totalBids || 0})
        </TabsTrigger>
        <TabsTrigger
          value="status"
          className={`py-3 rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none ${activeTab === "status" ? "border border-b-0" : "border-b"}`}
        >
          Product Status
        </TabsTrigger>
      </TabsList>

      <div className="border border-t-0">
        <TabsContent value="seller" className="m-0">
          <SellerInfo seller={seller} />
        </TabsContent>

        <TabsContent value="bidding" className="m-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Bidding History</h2>
            {bids.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 border-b">Bidder</th>
                      <th className="text-left p-3 border-b">Amount</th>
                      <th className="text-left p-3 border-b">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bids.map((bid, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{bid.bidderName}</td>
                        <td className="p-3">${bid.amount.toLocaleString()}</td>
                        <td className="p-3">
                          {new Date(bid.timestamp).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No bids have been placed yet.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="status" className="m-0">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <ProductStatus product={product} />
          </div>
        </TabsContent>
      </div>
    </Tabs>
  )
}
