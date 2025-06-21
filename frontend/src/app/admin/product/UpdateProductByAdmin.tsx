"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { format, isValid } from "date-fns"
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/app/redux/store"
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from '@reduxjs/toolkit'
import {
  ArrowLeft,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Package,
  Star,
  User,
  X,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Badge } from "@/app/components/ui/badge"
import { Separator } from "@/app/components/ui/separator"
import { Switch } from "@/app/components/ui/switch"
import { Textarea } from "@/app/components/ui/textarea"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { getProduct, updateProductByAdmin } from "@/app/redux/features/productSlice"
import { getUserById } from "@/app/redux/features/authSlice"

// Helper function to safely format dates
const safeFormatDate = (dateString: string, formatString: string = "MMMM d, yyyy") => {
  const date = new Date(dateString)
  return isValid(date) ? format(date, formatString) : 'Invalid Date'
}

export default function ProductVerificationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>()
  const { id } = useParams<{ id: string }>()
  const { product, isLoading } = useSelector((state: RootState) => state.product)
  const { selectedUser } = useSelector((state: RootState) => state.auth)

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPublished, setIsPublished] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [verifyRequest, setVerifyRequest] = useState(false)
  const [commissionRate, setCommissionRate] = useState(10)
  const [adminNotes, setAdminNotes] = useState("")
  const [bidEndDate, setBidEndDate] = useState("")
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  useEffect(() => {
    if (id) {
      console.log('Fetching product with ID:', id)
      // @ts-ignore
      dispatch(getProduct(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (product?.user) {
      // If product.user is a string (ID), fetch user details
      if (typeof product.user === 'string') {
        // @ts-ignore
        dispatch(getUserById(product.user))
      }
      setIsPublished(product.isPublished || false)
      setIsFeatured(product.isFeatured || false)
      setVerifyRequest(product.verifyRequest || false)
      setCommissionRate(product.commission || 10)
      setBidEndDate(product.bidEndDate ? format(new Date(product.bidEndDate), "yyyy-MM-dd") : "")
    }
  }, [product, dispatch])

  // Update verifyRequest when isPublished changes
  useEffect(() => {
    if (isPublished) {
      setVerifyRequest(true)
    }
  }, [isPublished])

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1))
    }
  }

  const handleApprove = async () => {
    const formData = {
      isPublished: true,
      isFeatured,
      commission: commissionRate,
      bidEndDate: new Date(bidEndDate),
      adminNotes,
      verifyRequest: true
    }
    
    try {
      // @ts-ignore
      await dispatch(updateProductByAdmin({ id, formData }))
      setShowApproveDialog(false)
      navigate('/admin/dashboard/products')
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }
  console.log(product)
  const handleReject = () => {
    // Handle rejection logic here
    setShowRejectDialog(false)
  }

  if (isLoading || !product) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verify Product for Auction</h1>
        </div>
        <Button variant="outline" className="mt-4 md:mt-0" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <Badge variant="outline" className={`${product.isPublished ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"} px-3 py-1 text-sm`}>
          {product.isPublished ? "Published" : "Pending Approval"}
        </Badge>
      </div>

      <Tabs defaultValue="product" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="product">Product Details</TabsTrigger>
          <TabsTrigger value="actions">Admin Actions</TabsTrigger>
        </TabsList>

        {/* Product Details Tab */}
        <TabsContent value="product">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Images Card */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Review product images for quality and appropriateness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                  {product.images && product.images.length > 0 && (
                    <Image
                      src={product.images[currentImageIndex].filePath}
                      alt={`Product image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                  {product.images && product.images.map((image: any, index: number) => (
                    <div
                      key={index}
                      className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                        index === currentImageIndex ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image.filePath}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Basic details about the product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Seller Information */}
                <div className="p-4 bg-muted rounded-lg mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Seller Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Seller Name</h3>
                      <p className="text-base font-medium">{selectedUser?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Seller Email</h3>
                      <p className="text-base font-medium">{selectedUser?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Seller Role</h3>
                      <p className="text-base font-medium capitalize">{selectedUser?.role || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Account Created</h3>
                      <p className="text-base font-medium">
                        {selectedUser?.createdAt ? safeFormatDate(selectedUser.createdAt) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Product Title</h3>
                    <p className="text-base font-medium">{product.title}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Slug (URL)</h3>
                    <p className="text-base font-medium">{product.slug}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{product.categoryName}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Physical Product</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{product.isPhysical ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Base Price</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">${product.basePrice}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Starting Bid</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">${product.bidStartPrice}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">{product.quantity}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Bids</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">
                        {!product.isPublished 
                          ? "Pending Verification" 
                          : product.totalBids === 0 
                            ? "No bids placed yet" 
                            : product.totalBids}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Auction End Date</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">
                        {product.bidEndDate ? safeFormatDate(product.bidEndDate) : 'No end date set'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created On</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium">
                        {product.createdAt ? safeFormatDate(product.createdAt) : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm">{product.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Admin Actions Tab */}
        <TabsContent value="actions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
                <CardDescription>Current status of the product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${verifyRequest ? "bg-green-500" : "bg-red-500"} flex items-center justify-center`}>
                      {verifyRequest ? <Check className="h-3 w-3 text-white" /> : <X className="h-3 w-3 text-white" />}
                    </div>
                    <Label htmlFor="verify-request">Verify Request</Label>
                  </div>
                  <span className="text-sm">{verifyRequest ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${isPublished ? "bg-green-500" : "bg-red-500"} flex items-center justify-center`}>
                      {isPublished ? <Check className="h-3 w-3 text-white" /> : <X className="h-3 w-3 text-white" />}
                    </div>
                    <Label htmlFor="is-published">Is Published</Label>
                  </div>
                  <Switch id="is-published" checked={isPublished} onCheckedChange={setIsPublished} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${isFeatured ? "bg-green-500" : "bg-red-500"} flex items-center justify-center`}>
                      {isFeatured ? <Check className="h-3 w-3 text-white" /> : <X className="h-3 w-3 text-white" />}
                    </div>
                    <Label htmlFor="is-featured">Is Featured</Label>
                  </div>
                  <Switch id="is-featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${product.isSoldout ? "bg-green-500" : "bg-red-500"} flex items-center justify-center`}>
                      {product.isSoldout ? <Check className="h-3 w-3 text-white" /> : <X className="h-3 w-3 text-white" />}
                    </div>
                    <Label htmlFor="is-sold-out">Is Sold Out</Label>
                  </div>
                  <span className="text-sm">{product.isSoldout ? "Yes" : "No"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Admin Actions</CardTitle>
                <CardDescription>Take action on this product submission</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-notes">Admin Notes (Optional)</Label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Add any notes about this product..."
                    className="min-h-[100px]"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input
                    id="commission-rate"
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    min={0}
                    max={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bid-end-date">Change Bid End Date (Optional)</Label>
                  <Input 
                    id="bid-end-date" 
                    type="date" 
                    value={bidEndDate}
                    onChange={(e) => setBidEndDate(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Check className="mr-2 h-4 w-4" />
                      Approve & Publish
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Approval</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to approve and publish this product? It will be visible to all users.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleApprove}>Confirm Approval</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="w-full sm:w-auto">
                      <X className="mr-2 h-4 w-4" />
                      Reject Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Rejection</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to reject this product? The seller will be notified.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleReject}>
                        Confirm Rejection
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setIsFeatured(!isFeatured)
                    const formData = {
                      isFeatured: !isFeatured
                    }
                    // @ts-ignore
                    dispatch(updateProductByAdmin({ id, formData }))
                  }}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
