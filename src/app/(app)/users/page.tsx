"use client"

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const users = [
  { id: "1", name: "DevBlaze", email: "admin@devblaze.com", role: "Owner", status: "Active" },
  { id: "2", name: "Sarah Connor", email: "sarah@sky.net", role: "Editor", status: "Inactive" },
  { id: "3", name: "James Holden", email: "holden@rocinante.io", role: "Viewer", status: "Active" },
];

function UsersTable() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || "";

  // Logic: Filter based on Name or Email
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query)
  );

  return (
    <Card className="bg-zinc-900/50 border-white/5">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="hover:bg-transparent">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-zinc-400">User</TableHead>
              <TableHead className="text-zinc-400">Role</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">{user.name}</span>
                      <span className="text-xs text-zinc-500">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">{user.role}</TableCell>
                  <TableCell>
                    <Badge className={user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-zinc-800 text-zinc-500'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <button className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4">Edit</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                  No users found matching `{query}`
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-zinc-500">Manage access and roles for your ecosystem.</p>
        </div>
      </div>

      {/* useSearchParams must be wrapped in Suspense for Next.js 15+ Client Components */}
      <Suspense fallback={<div className="h-64 w-full bg-zinc-900/20 animate-pulse rounded-xl" />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}