"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { depositMoney, withdrawMoney } from "../redux/features/authSlice"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { AlertCircle, ArrowDownCircle, ArrowUpCircle, DollarSign } from "lucide-react"

class TransactionError extends Error {
  constructor(message) {
    super(message)
    this.name = "TransactionError"
  }
}

const WalletSection = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)
  const [amount, setAmount] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const MIN_TRANSACTION_AMOUNT = 1000

  const handleAmountChange = (e) => {
    setAmount(e.target.value)
    setError(null)
    setSuccess(null)
  }

  const validateTransaction = (transactionAmount) => {
    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      throw new TransactionError("Please enter a valid amount")
    }
    if (transactionAmount < MIN_TRANSACTION_AMOUNT) {
      throw new TransactionError(`Transaction amount must be at least $${MIN_TRANSACTION_AMOUNT}`)
    }
  }

  const handleDeposit = async () => {
    try {
      const depositAmount = Number.parseFloat(amount)
      validateTransaction(depositAmount)
      await dispatch(depositMoney(depositAmount)).unwrap()
      setAmount("")
    } catch (err) {
      setError(err.message || "An unexpected error occurred")
    }
  }

  const handleWithdrawal = async () => {
    try {
      const withdrawalAmount = Number.parseFloat(amount)
      validateTransaction(withdrawalAmount)
      if (withdrawalAmount > user.balance) {
        throw new Error("Insufficient funds")
      }
      await dispatch(withdrawMoney(withdrawalAmount)).unwrap()
      setAmount("")
    } catch (err) {
      setError(err.message || "An unexpected error occurred")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          {user?.name}'s Wallet
        </CardTitle>
        <CardDescription>Manage your funds with ease</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-primary/10 p-6 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-4xl font-bold">${(user?.balance || 0).toLocaleString()}</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Transaction Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount (min $1000)"
                value={amount}
                onChange={handleAmountChange}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">Minimum transaction amount: ${MIN_TRANSACTION_AMOUNT}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleDeposit} className="w-full" variant="outline">
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button onClick={handleWithdrawal} className="w-full" variant="outline">
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Transactions</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {user?.transactions
              .slice()
              .reverse()
              .map((transaction, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                  <div className="flex items-center">
                    {transaction.type === "deposit" ? (
                      <ArrowDownCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : transaction.type === "withdrawal" ? (
                      <ArrowUpCircle className="h-4 w-4 text-red-500 mr-2" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-blue-500 mr-2" />
                    )}
                    <span className="capitalize">{transaction.type}</span>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.type === "deposit"
                          ? "text-green-600"
                          : transaction.type === "withdrawal"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {transaction.type === "deposit" ? "+" : transaction.type === "withdrawal" ? "-" : ""}$
                      {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <p>Minimum transaction: ${MIN_TRANSACTION_AMOUNT}</p>
      </CardFooter>
    </Card>
  )
}

export default WalletSection
