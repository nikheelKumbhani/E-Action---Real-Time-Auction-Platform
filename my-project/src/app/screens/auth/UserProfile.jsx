"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getuserProfile } from "@/app/redux/features/authSlice"
import { useRedirectLoggedOutUser } from "../../hooks/userRedirectLoggedOutUser"
import { Camera, Package, Gavel, DollarSign } from "lucide-react"

export const UserProfile = () => {
  useRedirectLoggedOutUser("/login")

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getuserProfile())
  }, [dispatch])

  // Get role badge color
  const getRoleBadgeClass = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-emerald-100 text-emerald-700'
      case 'seller':
        return 'bg-orange-100 text-orange-700'
      case 'buyer':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View your account information and statistics</p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={user?.photo || '/default-avatar.png'}
              alt={user?.name || 'User'}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100"
            />
            <div className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full shadow-lg">
              <Camera className="h-4 w-4" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 capitalize mb-1">
              {user?.name || 'Loading...'}
            </h2>
            <p className="text-gray-600 mb-3">{user?.email}</p>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user?.role)}`}>
              {user?.role || 'User'}
            </span>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Products</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center">
                <Gavel className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-700">Active Bids</p>
                <p className="text-2xl font-bold text-emerald-600">0</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-2xl font-bold text-gray-900">${user?.balance || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>

        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 capitalize">
              {user?.name || 'Not set'}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>
            <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
              {user?.email || 'Not set'}
            </div>
          </div>

          {/* Phone Number and Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Contact Number
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                {user?.phone || 'Not set'}
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Account Role
              </label>
              <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 capitalize">
                {user?.role || 'User'}
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Member Since
            </label>
            <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Not available'}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-emerald-700">
            <strong>Note:</strong> To update your profile information, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}
