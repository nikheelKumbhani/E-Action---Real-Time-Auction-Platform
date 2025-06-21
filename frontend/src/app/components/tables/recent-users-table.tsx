"use client"

import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { useSelector } from "react-redux";

import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  balance: number;
  photo: string;
  createdAt: string;
}

interface RootState {
  auth: {
    users: User[];
  };
}

export function RecentUsersTable() {
  const { users } = useSelector((state: RootState) => state.auth);

  // Get last 7 users, sorted by creation date
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 7);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <img 
                src={user.photo} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="capitalize">{user.role}</TableCell>
            <TableCell>${(user.balance || 0).toLocaleString()}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
