"use client"

import { motion } from "framer-motion";
import { Package, MoreVertical, Plus, AlertCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dashboardData from "@/data/mockup-db.json";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function ProductPage() {
  const products = dashboardData.products;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Product Nexus</h1>
          <p className="text-zinc-500">Manage your inventory and global pricing.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Product Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {products.map((product) => (
          <motion.div variants={item} key={product.id}>
            <Card className="bg-zinc-900/40 border-white/5 hover:border-indigo-500/50 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Package size={24} />
                    </div>
                    <Badge className={cn(
                      "font-semibold",
                      product.status === "In Stock" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      product.status === "Low Stock" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    )}>
                      {product.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{product.category} • {product.id}</p>
                  </div>

                  <div className="flex items-end justify-between pt-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Price</p>
                      <p className="text-2xl font-black text-white">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Stock</p>
                      <p className={cn(
                        "text-lg font-bold",
                        product.stock < 10 ? "text-rose-400" : "text-zinc-300"
                      )}>{product.stock} units</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="bg-white/2 border-t border-white/5 px-6 py-3 flex justify-between items-center group-hover:bg-indigo-500/5 transition-colors">
                  <button className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                    View Analytics <ArrowUpRight size={12} />
                  </button>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Inventory Alert Footer */}
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
          <AlertCircle size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-amber-200">Inventory Alert</p>
          <p className="text-xs text-amber-500/80">You have 2 products with critical stock levels. We recommend restocking soon to avoid service disruption.</p>
        </div>
        <Button variant="outline" size="sm" className="border-amber-500/20 text-amber-500 hover:bg-amber-500/10">
          Handle Restock
        </Button>
      </div>
    </div>
  );
}

// Utility function (can be moved to lib/utils.ts)
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}