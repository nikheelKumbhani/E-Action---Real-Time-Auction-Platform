"use client"

import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser"
import { getAllUser, deleteUser } from "@/app/redux/features/authSlice"
import { Search, Eye, Trash2, Users, UserCheck, ShoppingCart, X, AlertTriangle } from "lucide-react"

// Custom Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  if (!isOpen) return null

  const buttonColors = type === "danger"
    ? "bg-red-600 hover:bg-red-700 text-white"
    : "bg-emerald-600 hover:bg-emerald-700 text-white"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === "danger" ? "bg-red-100" : "bg-emerald-100"
                }`}>
                <AlertTriangle className={`h-5 w-5 ${type === "danger" ? "text-red-600" : "text-emerald-600"
                  }`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${buttonColors}`}
          >
            {type === "danger" ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}

// User Details Modal Component
const UserDetailsModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null

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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">User Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-6 mb-6">
            <img
              src={user?.photo || '/default-avatar.png'}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100"
              onError={(e) => {
                e.target.src = '/default-avatar.png'
              }}
            />
            <div>
              <h4 className="text-2xl font-bold text-gray-900 capitalize mb-2">{user?.name}</h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadgeClass(user?.role)}`}>
                {user?.role || 'user'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                <p className="text-gray-700">{user?.email || 'Not set'}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Phone</label>
                <p className="text-gray-700">{user?.phone || 'Not set'}</p>
              </div>

              {/* Balance */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Balance</label>
                <p className="text-gray-700 font-medium">${user?.balance || 0}</p>
              </div>

              {/* Joined Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Member Since</label>
                <p className="text-gray-700">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export const UserList = () => {
  useRedirectLoggedOutUser("/login")

  const { users } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null })
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, user: null })

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  // Calculate role counts
  const stats = useMemo(() => {
    const adminCount = users?.filter(u => u.role?.toLowerCase() === 'admin').length || 0
    const sellerCount = users?.filter(u => u.role?.toLowerCase() === 'seller').length || 0
    const buyerCount = users?.filter(u => u.role?.toLowerCase() === 'buyer').length || 0

    return {
      total: users?.length || 0,
      admin: adminCount,
      seller: sellerCount,
      buyer: buyerCount
    }
  }, [users])

  // Filter users
  const filteredUsers = useMemo(() => {
    if (!users) return []

    return users.filter(user => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole =
        roleFilter === "all" ||
        user.role?.toLowerCase() === roleFilter.toLowerCase()

      return matchesSearch && matchesRole
    })
  }, [users, searchTerm, roleFilter])

  const handleDeleteClick = (user) => {
    setDeleteModal({ isOpen: true, user })
  }

  const handleDeleteConfirm = () => {
    if (deleteModal.user) {
      dispatch(deleteUser(deleteModal.user._id))
    }
  }

  const handleViewClick = (user) => {
    setDetailsModal({ isOpen: true, user })
  }

  // Get role badge styling
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
    <div className="max-w-7xl mx-auto p-8">
      {/* Modals */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteModal.user?.name}"? This action cannot be undone.`}
        type="danger"
      />

      <UserDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, user: null })}
        user={detailsModal.user}
      />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage and monitor all registered users</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Users */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        {/* Admins */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-200 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-emerald-700">Admins</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.admin}</p>
            </div>
          </div>
        </div>

        {/* Sellers */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-orange-700">Sellers</p>
              <p className="text-2xl font-bold text-orange-600">{stats.seller}</p>
            </div>
          </div>
        </div>

        {/* Buyers */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-700">Buyers</p>
              <p className="text-2xl font-bold text-blue-600">{stats.buyer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Users className="h-12 w-12 mb-3 text-gray-400" />
                      <p className="text-lg font-medium text-gray-900">No users found</p>
                      <p className="text-sm">
                        {searchTerm || roleFilter !== "all"
                          ? "Try adjusting your search or filter"
                          : "No users have been registered yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photo || '/default-avatar.png'}
                          alt={user?.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                          onError={(e) => {
                            e.target.src = '/default-avatar.png'
                          }}
                        />
                        <span className="font-medium text-gray-900 capitalize">
                          {user?.name || 'Unknown'}
                        </span>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 text-gray-700">
                      {user?.email || 'No email'}
                    </td>

                    {/* Role Badge Column */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeClass(user?.role)}`}>
                        {user?.role || 'user'}
                      </span>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 text-gray-700">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                        : 'Unknown'}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleViewClick(user)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View user details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Results Count */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of{" "}
              <span className="font-medium text-gray-900">{stats.total}</span> users
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
