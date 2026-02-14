"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BarChart3, Heart, ShoppingBag, Trophy, Store, ArrowRight, X } from "lucide-react"

import { RecentProductsTable } from "@/app/components/tables/recent-products-table"
import { getAllProducts } from "@/app/redux/features/productSlice"
import { loginUserAsSeller, getuserProfile } from "@/app/redux/features/authSlice"
import { getAllWonedProductsOfUser } from "@/app/redux/features/productSlice"

export default function BuyerDashboard() {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state: any) => state.auth)
  const { wonedproduct } = useSelector((state: any) => state.product)
  const [showModal, setShowModal] = useState(false)
  const [isConverting, setIsConverting] = useState(false)

  // Check if user is a buyer (only buyers can see the "Become a Seller" option)
  const isBuyer = user?.role?.toLowerCase() === 'buyer'

  useEffect(() => {
    // @ts-ignore
    dispatch(getAllProducts())
    // @ts-ignore
    dispatch(getAllWonedProductsOfUser())
  }, [dispatch])

  // Calculate real statistics
  const wonAuctions = wonedproduct?.length || 0
  const activeBids = wonedproduct?.filter((p: any) => !p.isSoldout).length || 0

  const handleBecomeSeller = async () => {
    setIsConverting(true)
    try {
      // @ts-ignore
      await dispatch(loginUserAsSeller({})).unwrap()
      // Refresh user profile to get updated role
      // @ts-ignore
      await dispatch(getuserProfile()).unwrap()
      setShowModal(false)
    } catch (error) {
      console.error('Failed to become seller:', error)
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
        <p className="text-gray-600">Manage all products in the auction system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Account Balance Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">Account Balance</p>
            <p className="text-2xl font-bold text-gray-900">${(user?.balance || 0).toLocaleString()}</p>
            <p className="text-xs text-gray-500">Available for bidding</p>
          </div>
        </div>

        {/* Active Bids Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-emerald-700">Active Bids</p>
            <p className="text-2xl font-bold text-emerald-900">{activeBids}</p>
            <p className="text-xs text-emerald-600">Currently bidding</p>
          </div>
        </div>

        {/* Won Auctions Card */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-orange-700">Won Auctions</p>
            <p className="text-2xl font-bold text-orange-900">{wonAuctions}</p>
            <p className="text-xs text-orange-600">Total wins</p>
          </div>
        </div>

        {/* Favorites Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-700">Favorites</p>
            <p className="text-2xl font-bold text-blue-900">0</p>
            <p className="text-xs text-blue-600">Saved items</p>
          </div>
        </div>
      </div>

      {/* Become a Seller CTA - Only visible to buyers */}
      {isBuyer && (
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Store className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Start Selling on Our Platform</h3>
                <p className="text-emerald-50 text-sm">
                  Become a seller and start listing your products in auctions today!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-md"
            >
              Become a Seller
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Become a Seller</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isConverting}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Are you sure you want to convert your account to a seller account?
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-800">
                  <strong>Benefits:</strong>
                </p>
                <ul className="text-sm text-emerald-700 mt-2 space-y-1 list-disc list-inside">
                  <li>List your products for auction</li>
                  <li>Manage your inventory</li>
                  <li>Track your sales and earnings</li>
                  <li>Access seller dashboard</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isConverting}
              >
                Cancel
              </button>
              <button
                onClick={handleBecomeSeller}
                disabled={isConverting}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConverting ? 'Converting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Auctions Section */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recommended Auctions</h2>
        </div>
        <RecentProductsTable />
      </div>
    </div>
  )
}
