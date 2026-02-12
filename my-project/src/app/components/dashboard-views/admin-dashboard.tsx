"use client"

import { useSelector } from "react-redux"
import { BarChart3, DollarSign, Package, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { RecentProductsTable } from "@/app/components/tables/recent-products-table"
import { RecentUsersTable } from "@/app/components/tables/recent-users-table"

interface Product {
  _id: string;
  isverify: boolean;
  isSoldout: boolean;
}

interface User {
  balance: number;
  commissionBalance: number;
}

interface RootState {
  auth: {
    user: User;
    users: User[];
  };
  product: {
    products: Product[];
  };
}

export default function AdminDashboard() {
  const { user, users } = useSelector((state: RootState) => state.auth);
  const { products } = useSelector((state: RootState) => state.product);

  const totalUsers = users?.length || 0
  const activeAuctions = products?.filter(product => product.isverify && !product.isSoldout).length || 0
  const completedAuctions = 0 // TODO: Get from auction/product state
  const totalBalance = (user?.balance || 0) + (user?.commissionBalance || 0)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalBalance || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Balance + Commission</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAuctions}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commission Balance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(user?.commissionBalance || 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Platform earnings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Recent Products</TabsTrigger>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <RecentProductsTable />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <RecentUsersTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
