"use client"

import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { depositMoney, withdrawMoney, getuserProfile } from "../redux/features/authSlice"
import {
  Wallet as WalletIcon,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  X,
  AlertTriangle,
  Loader2,
  Eye,
  Download,
  Search,
  Filter
} from "lucide-react"
import { toast } from "react-toastify"

// Deposit Modal
const DepositModal = ({ isOpen, onClose, onDeposit, currentBalance }) => {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const quickAmounts = [100, 500, 1000, 5000]

  const handleSubmit = async (e) => {
    e.preventDefault()

    const depositAmount = parseFloat(amount)

    if (!amount || depositAmount <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (depositAmount < 10) {
      toast.error("Minimum deposit amount is $10")
      return
    }

    setIsSubmitting(true)
    await onDeposit(depositAmount)
    setIsSubmitting(false)
    setAmount("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header - Green Theme */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <ArrowDownCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Deposit Funds</h3>
                <p className="text-sm text-gray-600">Add money to your wallet</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Current Balance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">${currentBalance.toLocaleString()}</p>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="deposit-amount" className="block text-sm font-semibold text-gray-900 mb-2">
                Amount to Deposit
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="deposit-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum deposit: $10</p>
            </div>

            {/* Quick Amounts */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Select</p>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt.toString())}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-colors text-sm font-medium"
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
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
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownCircle className="h-4 w-4" />
                  Deposit Money
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Withdraw Modal
const WithdrawModal = ({ isOpen, onClose, onWithdraw, currentBalance }) => {
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const withdrawAmount = parseFloat(amount)

    if (!amount || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (withdrawAmount < 10) {
      toast.error("Minimum withdrawal amount is $10")
      return
    }

    if (withdrawAmount > currentBalance) {
      toast.error("Insufficient funds")
      return
    }

    setIsSubmitting(true)
    await onWithdraw(withdrawAmount)
    setIsSubmitting(false)
    setAmount("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header - Red Theme */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowUpCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Withdraw Funds</h3>
                <p className="text-sm text-gray-600">Transfer money from your wallet</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Available Balance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Available Balance</p>
              <p className="text-2xl font-bold text-gray-900">${currentBalance.toLocaleString()}</p>
            </div>

            {/* Amount Input */}
            <div>
              <label htmlFor="withdraw-amount" className="block text-sm font-semibold text-gray-900 mb-2">
                Amount to Withdraw
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="withdraw-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: $10</p>
            </div>

            {/* Warning */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">
                Make sure you have sufficient balance before withdrawing.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpCircle className="h-4 w-4" />
                  Withdraw Money
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Transaction Details Modal
const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
              <p className="font-medium text-gray-900">#{transaction.id || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Type</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${transaction.type === 'deposit'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
                }`}>
                {transaction.type}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Amount</p>
              <p className={`text-xl font-bold ${transaction.type === 'deposit' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Status</p>
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                Completed
              </span>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600 mb-1">Date & Time</p>
              <p className="font-medium text-gray-900">
                {transaction.date ? new Date(transaction.date).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// Main Wallet Component
const WalletSection = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)
  const [detailsModal, setDetailsModal] = useState({ isOpen: false, transaction: null })
  const [filterType, setFilterType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(getuserProfile())
  }, [dispatch])

  // Calculate statistics
  const stats = useMemo(() => {
    const transactions = user?.transactions || []
    const deposits = transactions.filter(t => t.type === 'deposit')
    const withdrawals = transactions.filter(t => t.type === 'withdrawal')

    const totalDeposits = deposits.reduce((sum, t) => sum + (t.amount || 0), 0)
    const totalWithdrawals = withdrawals.reduce((sum, t) => sum + (t.amount || 0), 0)

    return {
      totalDeposits,
      totalWithdrawals,
      depositCount: deposits.length,
      withdrawalCount: withdrawals.length,
      netChange: totalDeposits - totalWithdrawals
    }
  }, [user?.transactions])

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    const transactions = user?.transactions || []

    return transactions.filter(tx => {
      const matchesType = filterType === "all" || tx.type === filterType
      const matchesSearch = searchTerm === "" ||
        tx.amount?.toString().includes(searchTerm) ||
        tx.type?.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesType && matchesSearch
    }).reverse()
  }, [user?.transactions, filterType, searchTerm])

  const handleDeposit = async (amount) => {
    try {
      await dispatch(depositMoney(amount)).unwrap()
      toast.success(`Successfully deposited $${amount}`)
      dispatch(getuserProfile())
      setDepositModal(false)
    } catch (error) {
      toast.error(error.message || "Deposit failed")
    }
  }

  const handleWithdraw = async (amount) => {
    try {
      await dispatch(withdrawMoney(amount)).unwrap()
      toast.success(`Successfully withdrew $${amount}`)
      dispatch(getuserProfile())
      setWithdrawModal(false)
    } catch (error) {
      toast.error(error.message || "Withdrawal failed")
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Modals */}
      <DepositModal
        isOpen={depositModal}
        onClose={() => setDepositModal(false)}
        onDeposit={handleDeposit}
        currentBalance={user?.balance || 0}
      />

      <WithdrawModal
        isOpen={withdrawModal}
        onClose={() => setWithdrawModal(false)}
        onWithdraw={handleWithdraw}
        currentBalance={user?.balance || 0}
      />

      <TransactionDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, transaction: null })}
        transaction={detailsModal.transaction}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wallet</h1>
        <p className="text-gray-600">Manage your funds and view transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-8 text-white shadow-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-sm mb-2">Available Balance</p>
            <h2 className="text-5xl font-bold mb-2">${(user?.balance || 0).toLocaleString()}</h2>
            <p className="text-emerald-100 text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setDepositModal(true)}
              className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 font-medium transition-colors flex items-center gap-2 shadow"
            >
              <ArrowDownCircle className="h-5 w-5" />
              Deposit
            </button>
            <button
              onClick={() => setWithdrawModal(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow"
            >
              <ArrowUpCircle className="h-5 w-5" />
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Deposits */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Deposits</p>
              <p className="text-xl font-bold text-emerald-600">+${stats.totalDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Total Withdrawals */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Withdrawals</p>
              <p className="text-xl font-bold text-red-600">-${stats.totalWithdrawals.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Transactions This Month */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">{user?.transactions?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Net Change */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Change</p>
              <p className={`text-xl font-bold ${stats.netChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {stats.netChange >= 0 ? '+' : ''}${stats.netChange.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-white text-gray-900"
          >
            <option value="all">All Transactions</option>
            <option value="deposit">Deposits Only</option>
            <option value="withdrawal">Withdrawals Only</option>
          </select>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Transaction History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <WalletIcon className="h-12 w-12 mb-3 text-gray-400" />
                      <p className="text-lg font-medium text-gray-900">No transactions yet</p>
                      <p className="text-sm">Start by making a deposit or withdrawal</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {transaction.type === 'deposit' ? (
                          <ArrowDownCircle className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ArrowUpCircle className="h-5 w-5 text-red-600" />
                        )}
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${transaction.type === 'deposit'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-700'
                          }`}>
                          {transaction.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-lg font-bold ${transaction.type === 'deposit' ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount?.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {transaction.date ? new Date(transaction.date).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setDetailsModal({ isOpen: true, transaction: { ...transaction, id: index + 1 } })}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium text-gray-900">{filteredTransactions.length}</span> of{" "}
              <span className="font-medium text-gray-900">{user?.transactions?.length || 0}</span> transactions
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletSection
