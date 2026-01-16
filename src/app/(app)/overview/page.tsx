"use client"

import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";
import { OverviewChart } from "@/components/dashboard/overview-chart";

// ... rest of the file stays the same
export default function OverviewPage() {
  const { data, isLoading } = useDashboardData();

  const statConfig = [
    { label: "Total Revenue", value: `$${data.stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500" },
    { label: "Active Users", value: data.stats.activeUsers, icon: Users, color: "text-blue-500" },
    { label: "System Health", value: `${data.stats.systemHealth}%`, icon: Zap, color: "text-yellow-500" },
    { label: "Active Tasks", value: data.stats.activeTasks, icon: CheckCircle2, color: "text-indigo-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
        <p className="text-zinc-500">Real-time overview of your ecosystem operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statConfig.map((stat, i) => (
          <Card key={i} className="bg-zinc-900/50 border-white/5 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-7 w-20 bg-zinc-800" />
              ) : (
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900/50 border-white/5 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Revenue Growth <Badge className="bg-emerald-500/10 text-emerald-500 border-none">+12.5%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 px-2"> {/* Adjusted height for better visibility */}
            <OverviewChart />
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-zinc-900/50 border-white/5">
          <CardHeader><CardTitle className="text-white">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  <div className="flex-1">
                    <p className="text-zinc-300 font-medium">{activity.action}</p>
                    <p className="text-zinc-500 text-xs">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}