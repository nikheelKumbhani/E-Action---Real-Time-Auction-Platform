"use client"

import Image from "next/image"
import { useSelector } from "react-redux";

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

  // Get role badge styling
  const getRoleBadge = (role: string) => {
    const roleStyles = {
      admin: "bg-emerald-100 text-emerald-700",
      seller: "bg-orange-100 text-orange-700",
      buyer: "bg-blue-100 text-blue-700"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${roleStyles[role.toLowerCase() as keyof typeof roleStyles] || roleStyles.buyer}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Photo
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Balance
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Joined
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {recentUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={user.photo}
                    alt={user.name}
                    fill
                    className="rounded-full object-cover ring-2 ring-gray-200"
                  />
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {user.email}
              </td>
              <td className="px-6 py-4">
                {getRoleBadge(user.role)}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${(user.balance || 0).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
