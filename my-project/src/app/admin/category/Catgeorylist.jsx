"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCategories, deleteCategory, createCategory } from "@/app/redux/features/categorySlice"
import { useRedirectLoggedOutUser } from "@/app/hooks/userRedirectLoggedOutUser"
import { Plus, Trash2, Folder, X, AlertTriangle, Loader2 } from "lucide-react"
import { toast } from "react-toastify"

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, category }) => {
  if (!isOpen || !category) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Category</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>"{category?.title}"</strong>? This action cannot be undone.
          </p>
        </div>
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
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

// Add Category Modal
const AddCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim()) {
      toast.error("Category title is required")
      return
    }

    setIsSubmitting(true)
    await onSubmit({ title: title.trim() })
    setIsSubmitting(false)
    setTitle("")
  }

  const handleClose = () => {
    setTitle("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Add New Category</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Category Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter category name..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              autoFocus
            />
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const Catgeorylist = () => {
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()
  const { categorys, isLoading } = useSelector((state) => state.category)

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, category: null })
  const [addModal, setAddModal] = useState(false)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const handleDelete = async () => {
    if (deleteModal.category) {
      await dispatch(deleteCategory(deleteModal.category._id))
      dispatch(getAllCategories())
    }
  }

  const handleAddCategory = async (data) => {
    try {
      await dispatch(createCategory(data)).unwrap();
      dispatch(getAllCategories());
      setAddModal(false);
    } catch (error) {
      // Error toast is already shown by Redux slice
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Modals */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, category: null })}
        onConfirm={handleDelete}
        category={deleteModal.category}
      />

      <AddCategoryModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSubmit={handleAddCategory}
      />

      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>

        <button
          onClick={() => setAddModal(true)}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="h-5 w-5" />
          Add Category
        </button>
      </div>

      {/* Statistics */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 shadow-sm mb-6 inline-flex items-center gap-3">
        <div className="w-12 h-12 bg-emerald-200 rounded-lg flex items-center justify-center">
          <Folder className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm text-emerald-700">Total Categories</p>
          <p className="text-2xl font-bold text-emerald-600">{categorys?.length || 0}</p>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                      <span>Loading categories...</span>
                    </div>
                  </td>
                </tr>
              ) : categorys?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Folder className="h-12 w-12 mb-3 text-gray-400" />
                      <p className="text-lg font-medium text-gray-900">No categories yet</p>
                      <p className="text-sm">Click "Add Category" to create your first category</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categorys?.map((category, index) => (
                  <tr key={category._id || index} className="hover:bg-gray-50 transition-colors">
                    {/* Index */}
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      {index + 1}
                    </td>

                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={category?.user?.photo || '/default-avatar.png'}
                          alt={category?.user?.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                          onError={(e) => e.target.src = '/default-avatar.png'}
                        />
                        <div>
                          <div className="font-medium text-gray-900 capitalize">
                            {category?.user?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category?.user?.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category Title */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium capitalize">
                        {category?.title || 'Untitled'}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-700">
                      {category?.updatedAt
                        ? new Date(category.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                        : 'Unknown'}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, category })}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete category"
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
        {!isLoading && categorys?.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total: <span className="font-medium text-gray-900">{categorys.length}</span> {categorys.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
