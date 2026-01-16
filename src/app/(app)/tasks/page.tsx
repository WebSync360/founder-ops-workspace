"use client"

import { motion } from "framer-motion";
import { 
  Circle, Clock, MoreHorizontal, 
  Plus, LayoutGrid, ListTodo, Target 
} from "lucide-react"; // Removed CheckCircle2
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader/Title
import { Badge } from "@/components/ui/badge";
import db from "@/data/mockup-db.json";

export default function TasksPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Operations</h1>
          <p className="text-zinc-500 text-sm">Orchestrate projects and immediate actions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/5 bg-white/5 text-zinc-300 hover:text-white">
            <LayoutGrid className="mr-2 h-4 w-4" /> Board
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT: Project Progress (4 Cols) */}
        <div className="xl:col-span-4 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <Target className="h-4 w-4" /> Active Projects
          </h2>
          {db.projects.map((project) => (
            <Card key={project.id} className="bg-zinc-900/40 border-white/5 overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-zinc-200">{project.name}</span>
                  <span className="text-xs font-medium text-zinc-500">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className={`h-full ${project.color}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="ghost" className="w-full border-dashed border-2 border-white/5 h-20 text-zinc-500 hover:text-zinc-300 hover:bg-white/5">
            + Create New Project
          </Button>
        </div>

        {/* RIGHT: Task List (8 Cols) */}
        <div className="xl:col-span-8 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
            <ListTodo className="h-4 w-4" /> Immediate Queue
          </h2>
          
          <div className="space-y-3">
            {db.tasks.map((task) => (
              <motion.div 
                key={task.id}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/20 border border-white/5 hover:bg-white/3 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="text-zinc-600 group-hover:text-indigo-500 transition-colors">
                  {task.status === "In Progress" ? <Clock size={20} /> : <Circle size={20} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate">{task.title}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">{task.project}</p>
                </div>

                <div className="flex items-center gap-6">
                  <Badge variant="outline" className={
                    task.priority === "Urgent" ? "border-rose-500/50 text-rose-500 bg-rose-500/5" :
                    task.priority === "High" ? "border-amber-500/50 text-amber-500" :
                    "border-zinc-700 text-zinc-500"
                  }>
                    {task.priority}
                  </Badge>
                  <Button variant="ghost" size="icon" className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}