"use client"

import { Clock, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useSelector } from "react-redux";
import type { Product } from "@/app/redux/store"

import { Badge } from "@/app/components/ui/badge"
import { Button, type ButtonProps } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

const truncateText = (text: string, maxLength: number = 25): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export function RecentProductsTable() {
  const { products } = useSelector((state: any) => state.product);
  const { categorys } = useSelector((state: any) => state.category);

  // Get last 7 products, sorted by creation date
  const recentProducts = [...products]
    .filter(product => product !== null) // Filter out null products
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 7);



  // Get status badge for product status
  const getStatusBadge = (product: Product) => {
    if (product.isPublished) {
      return <Badge className="bg-lime-500 hover:bg-green-600">Verified</Badge>
    }
    if (product.isSoldout) {
      return <Badge className="bg-red-500 hover:bg-red-600">Sold Out</Badge>
    }
    if (product.verifyRequest) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending Verification</Badge>
    }
    return (
      <Badge variant="outline" className="text-yellow-600 border-yellow-400">
        Pending
      </Badge>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product Details</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead>Current Price</TableHead>
          <TableHead>Bids</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentProducts.map((product) => (
          <TableRow key={product?._id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <img
                  src={product?.images?.[0]?.filePath || '/placeholder-image.png'}
                  alt={product?.title || 'Product'}
                  className="w-12 h-12 rounded-md object-cover border"
                />
                <div className="flex flex-col">
                  <span className="font-semibold" title={product?.title}>
                    {truncateText(product?.title || 'Untitled Product', 30)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    by {product?.user?.name || 'Unknown Seller'}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>${product?.basePrice?.toLocaleString() || 0}</TableCell>
            <TableCell>${product?.bidStartPrice?.toLocaleString() || 0}</TableCell>
            <TableCell>{product.totalBids || 0}</TableCell>
            <TableCell>{product?.categoryName || 'Uncategorized'}</TableCell>
            <TableCell>
              {product?.bidEndDate ? new Date(product.bidEndDate).toLocaleDateString() : 'Not set'}
            </TableCell>
            <TableCell>
              {getStatusBadge(product)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
