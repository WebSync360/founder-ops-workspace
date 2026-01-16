"use client"

import { Shield, Key, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const settingsSections = [
  {
    title: "System Infrastructure",
    description: "Manage global environment variables and performance scaling.",
    icon: Cpu,
    items: [
      { name: "API Endpoint", value: "https://api.founder-ops.v1", status: "Live" },
      { name: "Database Cluster", value: "us-east-1-primary", status: "Healthy" },
    ]
  },
  {
    title: "Security & Keys",
    description: "Rotate credentials and manage administrative access.",
    icon: Key,
    items: [
      { name: "Public Key", value: "pk_live_******************ae3", status: "Active" },
    ]
  }
];

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">System Configuration</h1>
        <p className="text-zinc-500">Global controls for your SaaS ecosystem.</p>
      </div>

      <div className="grid gap-6">
        {settingsSections.map((section) => (
          <Card key={section.title} className="bg-zinc-900/40 border-white/5 overflow-hidden">
            <CardHeader className="`bg-white/1` border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <section.icon size={20} />
                </div>
                <div>
                  <CardTitle className="text-zinc-200 text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-zinc-500">{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {section.items.map((item) => (
                <div key={item.name} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-zinc-400">{item.name}</p>
                    <code className="text-xs bg-black px-2 py-1 rounded text-indigo-400 border border-white/5">
                      {item.value}
                    </code>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      {item.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
                      Rotate
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* Danger Zone */}
        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader>
            <div className="flex items-center gap-3 text-rose-500">
              <Shield size={20} />
              <CardTitle className="text-lg">Critical Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-200">Maintenance Mode</p>
                <p className="text-xs text-zinc-500">Redirect all traffic to a fallback page.</p>
              </div>
              <Button variant="outline" className="border-rose-500/20 text-rose-500 hover:bg-rose-500/10">
                Enable
              </Button>
            </div>
            <Separator className="bg-rose-500/10" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-200">Purge System Logs</p>
                <p className="text-xs text-zinc-500">This action is permanent and cannot be undone.</p>
              </div>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                Purge All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}