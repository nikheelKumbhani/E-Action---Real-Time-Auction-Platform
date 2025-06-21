"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Clock, AlertCircle, DollarSign, Loader2 } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent } from "@/app/components/ui/card"
import { Alert, AlertDescription } from "@/app/components/ui/alert"
import { Separator } from "@/app/components/ui/separator"
import { Badge } from "@/app/components/ui/badge"
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
    currentBid?: number;
    totalBids?: number;
    bidEndDate?: string;
    verifyRequest?: boolean;
    isPublished?: boolean;
    isSoldout?: boolean;
  };
  userBalance?: number;
}

export function AuctionDetails({ product, userBalance = 0 }: AuctionDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.bidding as BiddingState);
  const { user } = useSelector((state: RootState) => state.auth);

  // Update the bidding form to show the current highest bid + minimum increment as the default bid amount
  const [bidAmount, setBidAmount] = useState<string>(() => {
    if (product.currentBid) {
      // If there's a current bid, set default to 2% higher
      return (product.currentBid * 1.02).toFixed(2);
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
      void dispatch(getBiddingHistory(product._id));
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
    if (!product.currentBid) {
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
      const minimumBid = product.currentBid * 1.02;
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
      })).unwrap();

      if (product._id) {
        void dispatch(getBiddingHistory(product._id));
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
  const minimumBidAmount = product.currentBid 
    ? product.currentBid * 1.02  // 2% higher than current bid
    : (product.basePrice || 0) * 1.1; // 10% higher than base price

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Auction Details</h2>
          {!product.isPublished && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              Pending Verification
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Base Price</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">${(product.basePrice || 0).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Starting Bid</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">${(product.bidStartPrice || 0).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Commission on Sale</p>
            <p className="font-medium">{product.commission || 0}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Highest Bid</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-lg text-primary">
                ${(product.currentBid || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Bids</p>
            <p className="font-medium">{product.totalBids || 0}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Your Balance</p>
            <p className="font-medium">${userBalance.toLocaleString()}</p>
          </div>
        </div>

        <Separator />

        {/* Countdown Timer */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <h3 className="font-medium">Time Left</h3>
          </div>

          {isAuctionEnded ? (
            <p className="text-red-500 font-semibold">Auction Ended</p>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white p-2 rounded shadow-sm">
                <p className="text-2xl font-bold">{timeLeft.days}</p>
                <p className="text-xs text-gray-500">Days</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <p className="text-2xl font-bold">{timeLeft.hours}</p>
                <p className="text-xs text-gray-500">Hours</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <p className="text-2xl font-bold">{timeLeft.minutes}</p>
                <p className="text-xs text-gray-500">Minutes</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <p className="text-2xl font-bold">{timeLeft.seconds}</p>
                <p className="text-xs text-gray-500">Seconds</p>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Bidding Form */}
        <form onSubmit={handleBidSubmit} className="space-y-4">
          <div>
            <label htmlFor="bidAmount" className="block text-sm font-medium mb-1">
              Your Bid (USD)
            </label>
            <div className="flex gap-2">
              <Input
                id="bidAmount"
                type="number"
                min={minimumBidAmount}
                step="0.01"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                disabled={isAuctionEnded || !user || !product.isPublished || product.isSoldout || isLoading}
                className="flex-1"
                placeholder="Enter amount in USD"
              />
              <Button 
                type="submit" 
                disabled={isAuctionEnded || !user || !product.isPublished || product.isSoldout || isLoading}
                className="w-1/3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Placing Bid...
                  </>
                ) : (
                  "Place Bid"
                )}
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Minimum bid required: ${minimumBidAmount.toFixed(2)}
            </p>

            {!user && <p className="text-sm text-gray-500 mt-1">Please log in to place a bid</p>}
            {!product.isPublished && <p className="text-sm text-yellow-600 mt-1">This product is pending verification</p>}
            {product.isSoldout && <p className="text-sm text-red-500 mt-1">This product has been sold</p>}
            {isAuctionEnded && <p className="text-sm text-red-500 mt-1">This auction has ended</p>}
          </div>

          {(bidStatus.message || error) && (
            <Alert variant={bidStatus.type === "error" || error ? "destructive" : "default"}>
              {(bidStatus.type === "error" || error) && <AlertCircle className="h-4 w-4" />}
              <AlertDescription>{error || bidStatus.message}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
