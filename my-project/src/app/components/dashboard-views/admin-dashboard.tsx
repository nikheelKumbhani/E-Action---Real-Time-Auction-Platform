"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { BarChart3, DollarSign, Package, Users } from "lucide-react"
import { cn } from "@/app/lib/utils"
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
  const [activeTab, setActiveTab] = useState<"products" | "users">("products")

  const totalUsers = users?.length || 0
  const activeAuctions = products?.filter(product => product.isverify && !product.isSoldout).length || 0
  const totalBalance = (user?.balance || 0) + (user?.commissionBalance || 0)

  const stats = [
    {
      title: "Total Balance",
      value: `$${(totalBalance || 0).toLocaleString()}`,
      subtitle: "Balance + Commission",
      icon: DollarSign,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      title: "Total Users",
      value: totalUsers.toString(),
      subtitle: "Registered accounts",
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Active Auctions",
      value: activeAuctions.toString(),
      subtitle: "Currently running",
      icon: Package,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Commission Balance",
      value: `$${(user?.commissionBalance || 0).toLocaleString()}`,
      subtitle: "Platform earnings",
      icon: BarChart3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className={cn("p-2 rounded-lg", stat.iconBg)}>
                  <Icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Custom Tabs */}
      <div className="space-y-4">
        {/* Tab Headers */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("products")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === "products"
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            )}
          >
            Recent Products
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === "users"
                ? "border-emerald-600 text-emerald-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            )}
          >
            Recent Users
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {activeTab === "products" && <RecentProductsTable />}
          {activeTab === "users" && <RecentUsersTable />}
        </div>
      </div>
    </div>
  )
}
