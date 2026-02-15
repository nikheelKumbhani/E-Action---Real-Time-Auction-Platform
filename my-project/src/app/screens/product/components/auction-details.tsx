"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, AlertCircle, Loader2, DollarSign } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { placeBid, getBiddingHistory } from "@/app/redux/features/beddingSlice"
import { AppDispatch, RootState } from "@/app/redux/store"

interface BiddingState {
  history: any[];
  bidding: any;
  isError: boolean;
  isLoading: boolean;
  message: string;
  error: string | null;
}

interface AuctionDetailsProps {
  product: {
    _id?: string;
    basePrice?: number;
    bidStartPrice?: number;
    commission?: number;
    currentHighestBid?: number;
    totalBids?: number;
    bidEndDate?: string;
    verifyRequest?: boolean;
    isPublished?: boolean;
    isSoldout?: boolean;
  };
  userBalance?: number;
  onBidSuccess?: () => void;
}

export function AuctionDetails({ product, userBalance = 0, onBidSuccess }: AuctionDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.bidding);
  const { user } = useSelector((state: RootState) => state.auth);

  // Update the bidding form to show the current highest bid + minimum increment as the default bid amount
  const [bidAmount, setBidAmount] = useState<string>(() => {
    if (product.currentHighestBid) {
      // If there's a current bid, set default to 2% higher
      return (product.currentHighestBid * 1.02).toFixed(2);
    } else {
      // If it's first bid, set default to 10% higher than base price
      return (product.basePrice ? product.basePrice * 1.1 : 0).toFixed(2);
    }
  });

  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const [bidStatus, setBidStatus] = useState<{
    message: string
    type: "success" | "error" | null
  }>({ message: "", type: null })

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!product.bidEndDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const difference = new Date(product.bidEndDate).getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [product.bidEndDate])

  // Load bidding history when component mounts
  useEffect(() => {
    if (product._id) {
      void dispatch(getBiddingHistory(product._id) as any);
    }
  }, [dispatch, product._id]);

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const bidValue = Number.parseFloat(bidAmount)

    if (!user) {
      setBidStatus({
        message: "Please log in to place a bid",
        type: "error",
      })
      return
    }

    if (!product.isPublished) {
      setBidStatus({
        message: "This product is not yet verified for bidding",
        type: "error",
      })
      return
    }

    if (product.isSoldout) {
      setBidStatus({
        message: "This product has been sold",
        type: "error",
      })
      return
    }

    // Check user balance
    if (bidValue > userBalance) {
      setBidStatus({
        message: "Insufficient balance to place this bid",
        type: "error",
      })
      return
    }

    // Validate minimum bid amount
    if (!product.currentHighestBid) {
      // First bid - must be 10% higher than base price
      const minimumBid = (product.basePrice || 0) * 1.1;
      if (bidValue < minimumBid) {
        setBidStatus({
          message: `First bid must be at least 10% higher than product price. Minimum bid required: $${minimumBid.toFixed(2)}`,
          type: "error",
        })
        return
      }
    } else {
      // Subsequent bid - must be 2% higher than current highest bid
      const minimumBid = product.currentHighestBid * 1.02;
      if (bidValue <= minimumBid) {
        setBidStatus({
          message: `New bid must be at least 2% higher than current highest bid. Minimum bid required: $${minimumBid.toFixed(2)}`,
          type: "error",
        })
        return
      }
    }

    if (product.bidEndDate && new Date(product.bidEndDate) < new Date()) {
      setBidStatus({
        message: "This auction has ended",
        type: "error",
      })
      return
    }

    try {
      // Check if product._id exists
      if (!product._id) {
        setBidStatus({
          message: "Invalid product ID",
          type: "error",
        });
        return;
      }

      const result = await dispatch(placeBid({
        productId: product._id,
        price: bidValue,
      }) as any).unwrap();

      if (product._id) {
        void dispatch(getBiddingHistory(product._id) as any);
      }

      // Refetch product data to update currentBid and totalBids
      if (onBidSuccess) {
        onBidSuccess();
      }

      setBidStatus({
        message: "Bid placed successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error placing bid:", error);
      setBidStatus({
        message: "Failed to place bid",
        type: "error",
      });
    }
  }

  const isAuctionEnded = product.bidEndDate ? new Date(product.bidEndDate) < new Date() : false

  // Calculate minimum bid amount for display
  const minimumBidAmount = product.currentHighestBid
    ? product.currentHighestBid * 1.02  // 2% higher than current bid
    : (product.basePrice || 0) * 1.1; // 10% higher than base price

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Auction Details</h2>
          {!product.isPublished && (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-emerald-100 text-emerald-700">
              Pending Verification
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Base Price</p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">${(product.basePrice || 0).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Starting Bid</p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">${(product.bidStartPrice || 0).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission on Sale</p>
            <p className="font-medium text-gray-900">{product.commission || 0}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Highest Bid</p>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <p className="font-bold text-lg text-emerald-600">
                {(product.currentHighestBid || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Bids</p>
            <p className="font-medium text-gray-900">{product.totalBids || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Balance</p>
            <p className="font-medium text-gray-900">${userBalance.toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Countdown Timer */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-emerald-600" />
            <h3 className="font-medium text-gray-900">Time Left</h3>
          </div>

          {isAuctionEnded ? (
            <p className="text-red-500 font-semibold">Auction Ended</p>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">{timeLeft.days}</p>
                <p className="text-xs text-gray-500">Days</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">{timeLeft.hours}</p>
                <p className="text-xs text-gray-500">Hours</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">{timeLeft.minutes}</p>
                <p className="text-xs text-gray-500">Minutes</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <p className="text-2xl font-bold text-emerald-600">{timeLeft.seconds}</p>
                <p className="text-xs text-gray-500">Seconds</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        {/* Bidding Form */}
        <form onSubmit={handleBidSubmit} className="space-y-4">
          <div>
            <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-900 mb-1">
              Your Bid (USD)
            </label>
            <div className="flex gap-2">
              <input
                id="bidAmount"
                type="number"
                min={minimumBidAmount}
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                disabled={isAuctionEnded || !user || !product.isPublished || product.isSoldout || isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent bg-gray-50 text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter amount in USD"
              />
              <button
                type="submit"
                disabled={isAuctionEnded || !user || !product.isPublished || product.isSoldout || isLoading}
                className="w-1/3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
                    Placing Bid...
                  </>
                ) : (
                  "Place Bid"
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Minimum bid required: ${minimumBidAmount.toFixed(2)}
            </p>

            {!user && <p className="text-sm text-gray-500 mt-1">Please log in to place a bid</p>}
            {!product.isPublished && <p className="text-sm text-emerald-600 mt-1">This product is pending verification</p>}
            {product.isSoldout && <p className="text-sm text-red-500 mt-1">This product has been sold</p>}
            {isAuctionEnded && <p className="text-sm text-red-500 mt-1">This auction has ended</p>}
          </div>

          {(bidStatus.message || error) && (
            <div className={`flex items-start gap-2 p-4 rounded-lg ${bidStatus.type === "error" || error ? "bg-red-50 border border-red-200" : "bg-emerald-50 border border-emerald-200"}`}>
              {(bidStatus.type === "error" || error) && <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />}
              <p className={`text-sm ${bidStatus.type === "error" || error ? "text-red-700" : "text-emerald-700"}`}>{error || bidStatus.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
