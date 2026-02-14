"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BarChart3, DollarSign, Package, ShoppingBag } from "lucide-react"

import { RecentProductsTable } from "@/app/components/tables/recent-products-table"
import { getAllProductsOfUser } from "@/app/redux/features/productSlice"

export default function SellerDashboard() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state.auth)
  const { userproducts } = useSelector((state: any) => state.product)

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllProductsOfUser())
  }, [dispatch])

  // Calculate real statistics
  const activeListings = userproducts?.filter((p: any) => p.isverify && !p.isSoldout).length || 0
  const completedSales = userproducts?.filter((p: any) => p.isSoldout).length || 0
  const totalBids = userproducts?.reduce((sum: number, p: any) => sum + (p.bids?.length || 0), 0) || 0

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
        <p className="text-gray-600">Manage your products and track your sales performance</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Account Balance Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Account Balance</p>
            <p className="text-2xl font-bold text-gray-900">${(user?.balance || 0).toLocaleString()}</p>
            <p className="text-xs text-gray-500">Available balance</p>
          </div>
        </div>

        {/* Active Listings Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-emerald-700">Active Listings</p>
            <p className="text-2xl font-bold text-emerald-900">{activeListings}</p>
            <p className="text-xs text-emerald-600">Currently active</p>
          </div>
        </div>

        {/* Completed Sales Card */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-orange-700">Completed Sales</p>
            <p className="text-2xl font-bold text-orange-900">{completedSales}</p>
            <p className="text-xs text-orange-600">Total sold</p>
          </div>
        </div>

        {/* Total Bids Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-purple-700">Total Bids</p>
            <p className="text-2xl font-bold text-purple-900">{totalBids}</p>
            <p className="text-xs text-purple-600">On all products</p>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Recent Products</h2>
        </div>
        <RecentProductsTable />
      </div>
    </div>
  )
}
